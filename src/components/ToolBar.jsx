import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./Tooltip";

export default function ToolBar({
  view,
  setView,
  setPromptVisiblility,
  blocksData,
  setPromptAction,
  handleCopy,
}) {
  const [copy, setCopy] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const themeModeToggle = useRef(null);

  useEffect(() => {
    if (themeModeToggle.current) {
      themeModeToggle.current.style.transform =
        view === "editor" ? "translateX(14px)" : "translateX(1px)";
    }
  }, [view]);

  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => setCopy(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copy]);

  // Style Objects
  const actionButtonStyle = (id) => ({
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    backgroundColor:
      hoveredBtn === id
        ? "var(--draftify-theme-color)"
        : "var(--hovered-draftify-theme-color)",
    color: "white",
    fontWeight: hoveredBtn === id ? "600" : "400",
    padding: "0.25rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  // Editor-preview toggle
  const editorPreviewToggle = {
    width: "30px",
    height: "16px",
    border: "1px solid #232323",
    borderRadius: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0",
    position: "relative",
  };

  // View indicator
  const viewIndicatorStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#232323",
    transition: "transform 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
  };

  return (
    <div
      style={{
        height: "auto",
        minHeight: "40px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        fontSize: "12px",
        fontStyle: "italic",
        gap: "10px",
      }}
    >
      {/* Logo Section */}
      <div className="logo-text">
        DRAFTIFY
        <div className="logo-description">
          Write. Create. Build your story block by block.
        </div>
      </div>

      {/* Actions Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginLeft: "auto",
        }}
      >
        <Tooltip text="e.g. for dev dummy data">
          <button
            style={actionButtonStyle("json")}
            onMouseEnter={() => setHoveredBtn("json")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => {
              setPromptAction("downloadJSON");
              setPromptVisiblility(true);
            }}
          >
            Download JSON <FontAwesomeIcon icon={["fas", "download"]} />
          </button>
        </Tooltip>

        <Tooltip text="Download as document">
          <button
            style={actionButtonStyle("docx")}
            onMouseEnter={() => setHoveredBtn("docx")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => {
              setPromptAction("exportDocx");
              setPromptVisiblility(true);
            }}
          >
            Export .docx <FontAwesomeIcon icon={["fas", "download"]} />
          </button>
        </Tooltip>

        <Tooltip text="copy to clipboard">
          <button
            style={{
              padding: "0.25rem",
              cursor: "pointer",
              border: "none",
              background: "none",
              color: copy ? "#4ade80" : "var(--hovered-draftify-theme-color)",
            }}
            onClick={() => handleCopy(blocksData, setCopy)}
          >
            <FontAwesomeIcon icon={["fas", copy ? "check" : "copy"]} />
          </button>
        </Tooltip>

        <Tooltip text="toggle btn editor & preview">
          <div
            style={editorPreviewToggle}
            onClick={() =>
              setView((prev) => (prev === "editor" ? "preview" : "editor"))
            }
          >
            <div ref={themeModeToggle} style={viewIndicatorStyle}>
              <div style={{ color: "white", transform: "translateY(-1px)" }}>
                {view === "editor" ? "e" : "p"}
              </div>
            </div>
          </div>
        </Tooltip>

        <div style={{ width: "100px" }}>viewing {view}</div>
      </div>
    </div>
  );
}
