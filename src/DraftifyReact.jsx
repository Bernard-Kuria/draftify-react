// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Editor from "./components/Editor";
import Options from "./components/Options";
import Reader from "./components/Reader";
import ToolBar from "./components/ToolBar";
import Grabber from "./components/Grabber";
import BackGround from "./components/Background";
import DocMetadataPrompt from "./components/DocMetadataPrompt";

import { useDraftifyReact } from "./hooks/useDraftifyReact";
import { useGenerateGrid } from "./hooks/backgroundHooks/backGroundEffects";

import "./utils/icons";

import "./draftify.css";

export default function DraftifyReact({ blocksData, modifyBlocks }) {
  const {
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
  } = useDraftifyReact({
    blocksData,
    modifyBlocks,
  });

  useGenerateGrid(setGridDots);

  return (
    <>
      <BackGround gridDots={gridDots} />

      <div className="draftify-container">
        <ToolBar
          view={view}
          setView={setView}
          blocksData={blocksData}
          setPromptAction={setPromptAction}
          setPromptVisiblility={setPromptVisiblility}
          handleCopy={handleCopy}
        />

        {promptVisibility && (
          <DocMetadataPrompt
            docTitle={docTitle}
            setDocTitle={setDocTitle}
            description={description}
            setDescription={setDescription}
            author={author}
            setAuthor={setAuthor}
            promptAction={promptAction}
            handlePromptAction={handlePromptAction}
            setPromptVisiblility={setPromptVisiblility}
          />
        )}

        {view === "editor" && (
          <>
            <Options handleClick={handleClick} />
            <div className="editor-area" onSubmit={(e) => e.preventDefault()}>
              <motion.div
                className="grid gap-2.5"
                variants={containerVariants}
                animate="show"
                exit="hidden"
              >
                <AnimatePresence>
                  {blocksData.map((b, index) => (
                    <motion.div
                      key={b.id}
                      layout
                      variants={itemVariants}
                      transition={transitions}
                      whileHover={whileHover}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => onDragEnter(e)}
                      onDragLeave={(e) => onDragLeave(e)}
                      onDrop={(e) => onDropHandler(e, index)}
                      className="block-container"
                    >
                      <Grabber />

                      <Editor
                        block={b}
                        modifyHeading={modifyHeading}
                        modifySubheading={modifySubheading}
                        modifyParagraph={modifyParagraph}
                        modifyQuote={modifyQuote}
                        modifyList={modifyList}
                        modifyTable={modifyTable}
                        modifyImage={modifyImage}
                        modifyVideo={modifyVideo}
                        modifyLink={modifyLink}
                        modifyCode={modifyCode}
                      />

                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(b.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}

        {view === "preview" && (
          <div className="output-area" onSubmit={(e) => e.preventDefault()}>
            <Reader blocksData={blocksData} />
          </div>
        )}
      </div>
    </>
  );
}
