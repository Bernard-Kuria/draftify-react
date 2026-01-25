const subheadingStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "20px",
  fontWeight: "600",
  background: "transparent",
};

export default function SubheadingEditor({
  fontFamily,
  subheadingBlock,
  modifySubheading,
}) {
  return (
    <input
      style={{
        ...subheadingStyles,
        borderBottom: "1px solid #232323",
        fontFamily: fontFamily || subheadingStyles.fontFamily,
      }}
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

export function SubheadingOutput({ subheadingBlock, fontFamily }) {
  return (
    <h2
      key={subheadingBlock.id}
      style={{
        ...subheadingStyles,
        fontFamily: fontFamily || subheadingStyles.fontFamily,
      }}
    >
      {subheadingBlock.data.text}
    </h2>
  );
}
