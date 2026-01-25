const quoteStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  borderLeft: "4px solid #3b82f6",
  width: "100%",
  fontSize: "18px",
  fontStyle: "italic",
  paddingLeft: "8px",
  fontWeight: "400",
  background: "transparent",
};

export default function QuoteEditor({ quoteBlock, modifyQuote, fontFamily }) {
  return (
    <input
      style={{
        ...quoteStyles,
        borderBottom: "1px solid #232323",
        fontFamily: fontFamily || quoteStyles.fontFamily,
      }}
      type="text"
      placeholder="Quote..."
      autoFocus
      value={quoteBlock.data.text}
      onChange={(e) =>
        modifyQuote({
          quoteBlockId: quoteBlock.id,
          newContent: e.target.value,
          author: quoteBlock.data.author,
        })
      }
    />
  );
}

export function QuoteOutput({ quoteBlock, fontFamily }) {
  return (
    <blockquote
      key={quoteBlock.id}
      style={{
        ...quoteStyles,
        fontFamily: fontFamily || quoteStyles.fontFamily,
      }}
    >
      {quoteBlock.data.text}
    </blockquote>
  );
}
