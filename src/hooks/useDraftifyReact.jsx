import { useState, useEffect } from "react";

import {
  // creators
  createHeadingBlock,
  createSubheadingBlock,
  createParagraphBlock,
  createQuoteBlock,
  createListBlock,
  createTableBlock,
  createImageBlock,
  createVideoBlock,
  createLinkBlock,
  createCodeBlock,

  // modifiers
  modifyHeadingBlock,
  modifySubheadingBlock,
  modifyParagraphBlock,
  modifyQuoteBlock,
  modifyListBlock,
  modifyTableBlock,
  modifyImageBlock,
  modifyVideoBlock,
  modifyLinkBlock,
  modifyCodeBlock,

  // utilities
  imageToBase64,
  handleCopy,
  exportBlocksToDocx,
  normalizeDocument,
  normalizeBlock,
  handleDownloadJSON,
} from "draftify";

export function useDraftifyReact({ blocksData, modifyBlocks }) {
  // Document state
  const [doc, setDoc] = useState({
    metadata: {},
    version: "1.0.0",
    blocks: blocksData,
  });

  // Document metadata states
  const [docTitle, setDocTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  // Background grid state
  const [gridDots, setGridDots] = useState([]);

  //  View state
  const [view, setView] = useState("editor");

  // Prompt visibility and action state
  const [promptVisibility, setPromptVisiblility] = useState(false);
  const [promptAction, setPromptAction] = useState("");

  // Load from localStorage on initial render
  useEffect(() => {
    if (!Array.isArray(blocksData)) {
      throw new Error(
        "DraftifyReact: blocksData must be an array of DraftifyBlock[]"
      );
    }

    if (typeof window !== "undefined" && localStorage.getItem("draftifyDoc")) {
      const saved = localStorage.getItem("draftifyDoc");
      const parsedDoc = JSON.parse(saved);
      setDoc(parsedDoc);
      setDocTitle(parsedDoc.metadata?.docTitle || "");
      setDescription(parsedDoc.metadata?.description || "");
      setAuthor(parsedDoc.metadata?.author || "");
      modifyBlocks(
        normalizeDocument(parsedDoc).blocks || normalizeBlock(blocksData)
      );
    } else {
      modifyBlocks(normalizeBlock(blocksData));
    }
  }, []);

  // Save to localStorage whenever blocksData changes
  useEffect(() => {
    const saveBlockData = async (blocks) => {
      const blocksCopy = await Promise.all(
        blocks.map(async (b) => {
          if (b.type === "image" && b.file) {
            const base64 = await imageToBase64(b);
            return { ...b, content: base64, file: undefined };
          }
          return b;
        })
      );

      localStorage.setItem(
        "draftifyDoc",
        JSON.stringify({
          ...doc,
          blocks: blocksCopy,
        })
      );
    };

    saveBlockData(blocksData);
  }, [blocksData, doc]);

  // Update document metadata whenever related states change
  useEffect(() => {
    const defaultMetadata = {
      docTitle: docTitle || "Untitled",
      description: description || "",
      author: author || "Unknown",
      createdAt: new Date().toISOString(),
    };

    setDoc((prevDoc) => ({
      ...prevDoc,
      metadata: defaultMetadata,
    }));
  }, [docTitle, description, author]);

  // Handle metadata actions from prompt
  const handlePromptAction = (action, option) => {
    const defaultMetadata = {
      docTitle: "Untitled Document",
      description: "",
      author: "Unknown Author",
      createdAt: new Date().toISOString(),
    };

    if (action === "downloadJSON") {
      handleDownloadJSON(
        option === "add" ? doc : { ...doc, metadata: defaultMetadata }
      );
    } else if (action === "exportDocx") {
      exportBlocksToDocx(
        option === "add" ? doc : { ...doc, metadata: defaultMetadata }
      );
    }

    setPromptVisiblility(false);
  };

  // Creating a block
  const handleClick = (type, cells) => {
    switch (type) {
      case "heading":
        modifyBlocks((prev) => [...prev, createHeadingBlock()]);
        break;
      case "subheading":
        modifyBlocks((prev) => [...prev, createSubheadingBlock()]);
        break;
      case "paragraph":
        modifyBlocks((prev) => [...prev, createParagraphBlock()]);
        break;
      case "quote":
        modifyBlocks((prev) => [...prev, createQuoteBlock()]);
        break;
      case "list":
        modifyBlocks((prev) => [...prev, createListBlock()]);
        break;
      case "table":
        modifyBlocks((prev) => [...prev, createTableBlock(cells)]);
        break;
      case "image":
        modifyBlocks((prev) => [...prev, createImageBlock()]);
        break;
      case "video":
        modifyBlocks((prev) => [...prev, createVideoBlock()]);
        break;
      case "link":
        modifyBlocks((prev) => [...prev, createLinkBlock()]);
        break;
      case "code":
        modifyBlocks((prev) => [...prev, createCodeBlock()]);
        break;

      default:
        break;
    }
  };

  // Modifying a block

  const modifyHeading = ({ headingBlockId, newContent, level }) => {
    modifyBlocks((prev) =>
      modifyHeadingBlock(prev, headingBlockId, newContent, level)
    );
  };

  const modifySubheading = ({ subheadingBlockId, newContent }) => {
    modifyBlocks((prev) =>
      modifySubheadingBlock(prev, subheadingBlockId, newContent)
    );
  };

  const modifyParagraph = ({ paragraphBlockId, newContent }) => {
    modifyBlocks((prev) =>
      modifyParagraphBlock(prev, paragraphBlockId, newContent)
    );
  };

  const modifyQuote = ({ quoteBlockId, newContent, author }) => {
    modifyBlocks((prev) =>
      modifyQuoteBlock(prev, quoteBlockId, newContent, author)
    );
  };

  const modifyList = ({ listBlockId, listStyle, items }) => {
    modifyBlocks((prev) =>
      modifyListBlock(prev, listBlockId, listStyle, items)
    );
  };

  const modifyTable = ({ tableBlockId, tableContent }) => {
    modifyBlocks((prev) => modifyTableBlock(prev, tableBlockId, tableContent));
  };

  const modifyImage = ({ imageBlockId, src, alt, caption }) => {
    modifyBlocks((prev) =>
      modifyImageBlock(prev, imageBlockId, src, alt, caption)
    );
  };

  const modifyVideo = ({ videoBlockId, src, provider }) => {
    modifyBlocks((prev) => modifyVideoBlock(prev, videoBlockId, src, provider));
  };

  const modifyLink = ({ linkBlockId, linkText, url }) => {
    modifyBlocks((prev) => modifyLinkBlock(prev, linkBlockId, linkText, url));
  };

  const modifyCode = ({ codeBlockId, language, code }) => {
    modifyBlocks((prev) => modifyCodeBlock(prev, codeBlockId, language, code));
  };

  // Deleting a block
  const handleDelete = (id) => {
    const block = blocksData.find((block) => block.id === id);

    // ensure media block is deleted only if no media is uploaded
    if (
      (block.type === "image" || block.type === "video") &&
      block.data.src !== ""
    )
      return;

    modifyBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // Blocks reordering and UI improvement functions
  const handleReorder = (dragIndex, hoverIndex) => {
    modifyBlocks((prev) => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragged);
      return updated;
    });
  };

  const onDropHandler = (e, index) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100");
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const hoverIndex = index;
    if (dragIndex !== hoverIndex) handleReorder(dragIndex, hoverIndex);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    e.currentTarget.style.opacity = "0.5";
  };

  const onDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  const onDragEnter = (e) => {
    e.currentTarget.classList.add("bg-gray-100");
  };

  const onDragLeave = (e) => {
    e.currentTarget.classList.remove("bg-gray-100");
  };

  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const transitions = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  const whileHover = {
    scale: 1.02,
    backgroundColor: "rgba(243, 244, 246, 0.8)",
  };

  return {
    // current view
    view,
    setView,

    // background grid
    gridDots,
    setGridDots,

    // document metadata
    docTitle,
    setDocTitle,
    description,
    setDescription,
    author,
    setAuthor,

    // copy blocks
    handleCopy,

    // prompt handlers
    handlePromptAction,
    promptAction,
    setPromptAction,
    promptVisibility,
    setPromptVisiblility,

    // blocks data
    blocksData,

    // block creator
    handleClick,

    // block modifiers
    modifyHeading,
    modifySubheading,
    modifyParagraph,
    modifyQuote,
    modifyList,
    modifyTable,
    modifyImage,
    modifyVideo,
    modifyLink,
    modifyCode,

    // drag and drop handlers
    onDropHandler,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    containerVariants,
    itemVariants,
    transitions,
    whileHover,

    // block delete
    handleDelete,
  };
}
