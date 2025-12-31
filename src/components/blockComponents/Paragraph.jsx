export default function ParagraphEditor({ paragraphBlock, modifyParagraph }) {
  return (
    <textarea
      className="border-b paragraph"
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
    <p key={paragraphBlock.id} className="paragraph">
      {paragraphBlock.data.text}
    </p>
  );
}
