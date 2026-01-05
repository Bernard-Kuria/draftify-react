import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const tooltipStyle = {
    /* Position Logic */
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: isHovered
      ? "translateX(-50%) translateY(-5px)"
      : "translateX(-50%) translateY(0)",

    /* Spacing & Layout */
    marginBottom: "8px",
    padding: "4px 8px",
    whiteSpace: "nowrap",
    zIndex: 10,

    /* Visuals */
    backgroundColor: "#1f2937",
    color: "#ffffff",
    fontSize: "0.75rem",
    borderRadius: "0.25rem",

    /* Animation */
    opacity: isHovered ? 1 : 0,
    transition: "all 300ms ease",
    pointerEvents: "none",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span style={tooltipStyle}>{text}</span>
    </div>
  );
}
