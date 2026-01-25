import { useState, useEffect } from "react";

const linkStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "14px",
  background: "transparent",
};

export default function LinkEditor({ linkBlock, modifyLink, fontFamily }) {
  const [linkText, setLinkText] = useState(linkBlock.data.linkText);
  const [url, setUrl] = useState(linkBlock.data.url);

  useEffect(() => {
    modifyLink({ linkBlockId: linkBlock.id, linkText: linkText, url: url });
  }, [linkText, url, linkBlock.id]);

  return (
    <div style={{ display: "flex" }}>
      <input
        style={{
          ...linkStyles,
          color: "#232323",
          borderBottom: "1px solid #232323",
          fontFamily: fontFamily || linkStyles.fontFamily,
        }}
        type="text"
        placeholder="Enter link text..."
        autoFocus
        value={linkBlock.data.linkText}
        onChange={(e) => setLinkText(e.target.value)}
      />
      <span>[</span>
      <input
        style={{
          ...linkStyles,
          color: "var(--hovered-draftify-theme-color)",
          borderBottom: "1px solid #232323",
          fontFamily: fontFamily || linkStyles.fontFamily,
        }}
        type="url"
        placeholder="url"
        autoFocus
        value={linkBlock.data.url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <span>]</span>
    </div>
  );
}

export function LinkOutput({ linkBlock, fontFamily }) {
  return (
    <a
      style={{
        ...linkStyles,
        color: "#3b82f6",
        fontFamily: fontFamily || linkStyles.fontFamily,
      }}
      key={linkBlock.id}
      href={linkBlock.data.url}
    >
      {linkBlock.data.linkText}
    </a>
  );
}
