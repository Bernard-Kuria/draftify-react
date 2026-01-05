const codeStyles = {
  fontFamily: "monospace",
  backgroundColor: "black",
  color: "white",
  padding: "8px",
  whiteSpace: "pre-wrap",
  borderRadius: "6px",
  width: "100%",
};

export default function CodeEditor({ codeBlock, modifyCode }) {
  return (
    <textarea
      style={codeStyles}
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
    <pre key={codeBlock.id} style={codeStyles}>
      <code>{codeBlock.data.code}</code>
    </pre>
  );
}
