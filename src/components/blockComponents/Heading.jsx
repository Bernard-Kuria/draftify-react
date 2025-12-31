export default function HeadingEditor({ headingBlock, modifyHeading }) {
  return (
    <input
      type="text"
      className="border-b heading"
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

export function HeadingOutput({ headingBlock }) {
  return (
    <h2 key={headingBlock.id} className="heading">
      {headingBlock.data.text}
    </h2>
  );
}
