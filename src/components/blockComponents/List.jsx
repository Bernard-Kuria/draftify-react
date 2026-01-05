const listStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "14px",
  listStyleType: "disc",
};

export default function ListEditor({ listBlock, modifyList }) {
  return (
    <input
      style={{ ...listStyles, borderBottom: "1px solid #232323" }}
      type="text"
      placeholder="separate items using comma"
      autoFocus
      value={listBlock.data.items.join(",")}
      onChange={(e) =>
        modifyList({
          listBlockId: listBlock.id,
          listStyle: listBlock.data.listStyle,
          items: e.target.value.split(",").map((item) => item.trim()),
        })
      }
    />
  );
}

export function ListOutput({ listBlock }) {
  return (
    <ul key={listBlock.id} style={listStyles}>
      {listBlock.data.items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
