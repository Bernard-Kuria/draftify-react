import HeadingEditor from "./blockComponents/Heading.jsx";
import SubheadingEditor from "./blockComponents/Subheading.jsx";
import ParagraphEditor from "./blockComponents/Paragraph.jsx";
import ListEditor from "./blockComponents/List.jsx";
import QuoteEditor from "./blockComponents/Quote.jsx";
import TableEditor from "./blockComponents/Table.jsx";
import MediaEditor from "./blockComponents/Media.jsx";
import LinkEditor from "./blockComponents/Link.jsx";
import CodeEditor from "./blockComponents/Code.jsx";

export default function Editor({
  block,
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
  modifyCustom,

  CustomEditor1,
  CustomEditor2,
  CustomEditor3,
}) {
  switch (block.type) {
    case "heading":
      return (
        <HeadingEditor headingBlock={block} modifyHeading={modifyHeading} />
      );
    case "subheading":
      return (
        <SubheadingEditor
          subheadingBlock={block}
          modifySubheading={modifySubheading}
        />
      );
    case "paragraph":
      return (
        <ParagraphEditor
          paragraphBlock={block}
          modifyParagraph={modifyParagraph}
        />
      );
    case "quote":
      return <QuoteEditor quoteBlock={block} modifyQuote={modifyQuote} />;
    case "list":
      return <ListEditor listBlock={block} modifyList={modifyList} />;
    case "table":
      return <TableEditor tableBlock={block} modifyTable={modifyTable} />;
    case "image":
      return <MediaEditor mediaBlock={block} modifyMedia={modifyImage} />;
    case "video":
      return <MediaEditor mediaBlock={block} modifyMedia={modifyVideo} />;
    case "link":
      return <LinkEditor linkBlock={block} modifyLink={modifyLink} />;
    case "code":
      return <CodeEditor codeBlock={block} modifyCode={modifyCode} />;
    case "custom-1":
      return CustomEditor1 ? (
        <CustomEditor1 customBlock={block} modifyCustom={modifyCustom} />
      ) : null;
    case "custom-2":
      return CustomEditor2 ? (
        <CustomEditor2 customBlock={block} modifyCustom={modifyCustom} />
      ) : null;
    case "custom-3":
      return CustomEditor3 ? (
        <CustomEditor3 customBlock={block} modifyCustom={modifyCustom} />
      ) : null;
    default:
      return null;
  }
}
