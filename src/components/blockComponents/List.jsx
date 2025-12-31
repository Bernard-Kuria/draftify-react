export default function ListEditor({ listBlock, modifyList }) {
  return (
    <input
      type="text"
      className="border-b w-full list"
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
    <ul key={listBlock.id} className="list-disc pl-5 list">
      {listBlock.data.items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
