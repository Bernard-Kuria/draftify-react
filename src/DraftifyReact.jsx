// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Editor from "./components/Editor";
import Options from "./components/Options";
import DraftifyBlocksReader from "./components/DraftifyBlocksReader";
import ToolBar from "./components/ToolBar";
import Grabber from "./components/Grabber";
import BackGround from "./components/Background";
import DocMetadataPrompt from "./components/DocMetadataPrompt";

import { useDraftifyReact } from "./hooks/useDraftifyReact";
import { useGenerateGrid } from "./hooks/backgroundHooks/backGroundEffects";

import "./utils/icons";

import "./draftify.css";

export default function DraftifyReact({
  // blocks data & modifier
  draftifyDoc,
  setDoc,

  // options
  options,

  // custom editors
  CustomEditor1,
  CustomEditor2,
  CustomEditor3,

  // custom output
  CustomOutput1,
  CustomOutput2,
  CustomOutput3,

  // default custom data
  defaultCustomData1,
  defaultCustomData2,
  defaultCustomData3,

  // enable localStorage
  localStorageEnable,

  // enable Draftify background
  backgroundEnable,

  // draftify container background set
  DraftifyBackground,
}) {
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
    modifyCustom,

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
    draftifyDoc,
    setDoc,
    defaultCustomData1,
    defaultCustomData2,
    defaultCustomData3,
    localStorageEnable,
  });

  useGenerateGrid(setGridDots);

  return (
    <div className="draftify-root">
      {backgroundEnable && <BackGround gridDots={gridDots} />}

      <div
        style={{ backgroundColor: DraftifyBackground }}
        className="draftify-container"
      >
        <ToolBar
          view={view}
          setView={setView}
          blocksData={draftifyDoc.blocks}
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
            <Options handleClick={handleClick} options={options} />
            <div className="editor-area" onSubmit={(e) => e.preventDefault()}>
              <motion.div
                style={{ display: "grid", gap: "10px" }}
                variants={containerVariants}
                animate="show"
                exit="hidden"
              >
                <AnimatePresence>
                  {draftifyDoc.blocks.map((b, index) => (
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
                        modifyCustom={modifyCustom}
                        CustomEditor1={CustomEditor1}
                        CustomEditor2={CustomEditor2}
                        CustomEditor3={CustomEditor3}
                      />

                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="delete-icon"
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
            <DraftifyBlocksReader
              blocksData={draftifyDoc.blocks}
              CustomOutput1={CustomOutput1}
              CustomOutput2={CustomOutput2}
              CustomOutput3={CustomOutput3}
            />
          </div>
        )}
      </div>
    </div>
  );
}
