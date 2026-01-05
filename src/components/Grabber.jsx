import { useState } from "react";

export default function Grabber() {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "3px",
    width: "15px",
    height: "100%",
    border: `1px solid ${isHovered ? "black" : "var(--draftify-theme-color)"}`,
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    cursor: "move",
    transition: "border-color 0.2s ease",
  };

  const dotStyle = {
    width: "4px",
    height: "4px",
    borderRadius: "10px",
    backgroundColor: isHovered ? "black" : "var(--draftify-theme-color)",
    alignSelf: "center",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {[1, 2, 3].map((dot) => (
        <div key={dot} style={dotStyle} />
      ))}
    </div>
  );
}
