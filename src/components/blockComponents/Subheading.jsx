const subheadingStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "20px",
  fontWeight: "600",
};

export default function SubheadingEditor({
  subheadingBlock,
  modifySubheading,
}) {
  return (
    <input
      style={{ ...subheadingStyles, borderBottom: "1px solid #232323" }}
      type="text"
      placeholder="sub heading ..."
      autoFocus
      value={subheadingBlock.data.text}
      onChange={(e) =>
        modifySubheading({
          subheadingBlockId: subheadingBlock.id,
          newContent: e.target.value,
        })
      }
    />
  );
}

export function SubheadingOutput({ subheadingBlock }) {
  return (
    <h2 key={subheadingBlock.id} style={subheadingStyles}>
      {subheadingBlock.data.text}
    </h2>
  );
}
