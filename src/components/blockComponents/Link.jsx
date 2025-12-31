import { useState, useEffect } from "react";

export default function LinkEditor({ linkBlock, modifyLink }) {
  const [linkText, setLinkText] = useState(linkBlock.data.linkText);
  const [url, setUrl] = useState(linkBlock.data.url);

  useEffect(() => {
    modifyLink({ linkBlockId: linkBlock.id, linkText: linkText, url: url });
  }, [linkText, url, linkBlock.id]);

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Enter link text..."
        className="flex-1 border-b link"
        autoFocus
        value={linkBlock.data.linkText}
        onChange={(e) => setLinkText(e.target.value)}
      />
      <span>[</span>
      <input
        type="url"
        placeholder="url"
        className="flex-1 border-b link"
        autoFocus
        value={linkBlock.data.url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <span>]</span>
    </div>
  );
}

export function LinkOutput({ linkBlock }) {
  return (
    <a key={linkBlock.id} href={linkBlock.data.url} className="link">
      {linkBlock.data.linkText}
    </a>
  );
}
