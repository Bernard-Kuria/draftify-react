const paragraphStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  height: "fit-content",
  background: "transparent",
};

export default function ParagraphEditor({
  paragraphBlock,
  modifyParagraph,
  fontFamily,
}) {
  return (
    <textarea
      style={{
        ...paragraphStyles,
        borderBottom: "1px solid #232323",
        fontFamily: fontFamily || paragraphStyles.fontFamily,
      }}
      placeholder="Write something..."
      autoFocus
      value={paragraphBlock.data.text}
      onChange={(e) =>
        modifyParagraph({
          paragraphBlockId: paragraphBlock.id,
          newContent: e.target.value,
        })
      }
    />
  );
}

export function ParagraphOutput({ paragraphBlock, fontFamily }) {
  return (
    <p
      key={paragraphBlock.id}
      style={{
        ...paragraphStyles,
        fontFamily: fontFamily || paragraphStyles.fontFamily,
      }}
    >
      {paragraphBlock.data.text}
    </p>
  );
}
