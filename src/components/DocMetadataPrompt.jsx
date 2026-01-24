import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DocMetadataPrompt({
  docTitle,
  setDocTitle,
  description,
  setDescription,
  author,
  setAuthor,
  promptAction,
  handlePromptAction,
  setPromptVisiblility,
}) {
  const [hoverBtn, setHoverBtn] = useState(null);

  // Common styles
  const inputStyle = {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    padding: "0.25rem",
    marginTop: "0.25rem",
    marginBottom: "0.75rem",
  };

  return (
    <div
      style={{
        width: "300px",
        padding: "1rem",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        border: "1px solid #d1d5db",
        borderRadius: "0.375rem",
        zIndex: "2",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginBottom: "0.625rem" }}>
          Would you like to add metadata before downloading?
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setPromptVisiblility(false)}
        >
          <FontAwesomeIcon icon={["fas", "xmark"]} />
        </div>
      </div>

      <div style={{ fontWeight: 600 }}>
        <div>
          <div> document title: (optional)</div>
          <input
            type="text"
            style={inputStyle}
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
          />
        </div>
        <div>
          <div>description: (optional)</div>
          <textarea
            name="description"
            style={{ ...inputStyle, minHeight: "60px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <div>author: (optional)</div>
          <input
            type="text"
            style={inputStyle}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>

      <button
        style={{
          width: "100%",
          flex: 1,
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          cursor: "pointer",
          border: "none",
          transition: "background-color 0.2s",
          backgroundColor: hoverBtn === "add" ? "#2563eb" : "#3b82f6",
          color: "white",
        }}
        onMouseEnter={() => setHoverBtn("add")}
        onMouseLeave={() => setHoverBtn(null)}
        onClick={() => handlePromptAction(promptAction)}
      >
        Download
      </button>
    </div>
  );
}
