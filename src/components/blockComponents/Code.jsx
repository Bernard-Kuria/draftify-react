export default function CodeEditor({ codeBlock, modifyCode }) {
  return (
    <textarea
      className="code"
      placeholder="Code block..."
      autoFocus
      value={codeBlock.data.code}
      onChange={(e) =>
        modifyCode({
          codeBlockId: codeBlock.id,
          language: codeBlock.data.language,
          code: e.target.value,
        })
      }
    />
  );
}

export function CodeOutput({ codeBlock }) {
  return (
    <pre key={codeBlock.id} className="code">
      <code>{codeBlock.data.code}</code>
    </pre>
  );
}
