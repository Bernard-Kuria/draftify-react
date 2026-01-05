const paragraphStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  height: "fit-content",
};

export default function ParagraphEditor({ paragraphBlock, modifyParagraph }) {
  return (
    <textarea
      style={{ ...paragraphStyles, borderBottom: "1px solid #232323" }}
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

export function ParagraphOutput({ paragraphBlock }) {
  return (
    <p key={paragraphBlock.id} style={paragraphStyles}>
      {paragraphBlock.data.text}
    </p>
  );
}
