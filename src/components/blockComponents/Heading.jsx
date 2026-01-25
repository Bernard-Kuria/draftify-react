const headingStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "24px",
  fontWeight: "630",
  background: "transparent",
};

export default function HeadingEditor({
  headingBlock,
  modifyHeading,
  fontFamily,
}) {
  return (
    <input
      style={{
        ...headingStyles,
        fontFamily: fontFamily || headingStyles.fontFamily,
        borderBottom: "1px solid #232323",
      }}
      type="text"
      placeholder="Heading..."
      autoFocus
      value={headingBlock.data.text}
      onChange={(e) =>
        modifyHeading({
          headingBlockId: headingBlock.id,
          newContent: e.target.value,
          level: 1,
        })
      }
    />
  );
}

export function HeadingOutput({ headingBlock, fontFamily }) {
  return (
    <h2
      style={{
        ...headingStyles,
        fontFamily: fontFamily || headingStyles.fontFamily,
      }}
      key={headingBlock.id}
    >
      {headingBlock.data.text}
    </h2>
  );
}
