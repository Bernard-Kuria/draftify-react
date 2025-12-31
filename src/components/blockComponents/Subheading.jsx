export default function SubheadingEditor({
  subheadingBlock,
  modifySubheading,
}) {
  return (
    <input
      type="text"
      className="border-b subheading"
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
    <h2 key={subheadingBlock.id} className="subheading">
      {subheadingBlock.data.text}
    </h2>
  );
}
