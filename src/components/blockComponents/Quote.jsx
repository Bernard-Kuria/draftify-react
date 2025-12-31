export default function QuoteEditor({ quoteBlock, modifyQuote }) {
  return (
    <input
      type="text"
      className="border-b quote"
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

export function QuoteOutput({ quoteBlock }) {
  return (
    <blockquote key={quoteBlock.id} className="quote">
      {quoteBlock.data.text}
    </blockquote>
  );
}
