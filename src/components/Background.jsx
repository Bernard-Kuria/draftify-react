export default function BackGround({ gridDots }) {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // Equivalent to -z-1
  };

  const dotBaseStyle = {
    position: "absolute",
    width: "1px",
    height: "1px",
    backgroundColor: "black",
  };

  return (
    <div style={containerStyle}>
      {gridDots.map((dot) => (
        <div
          key={dot.key}
          data-x={dot.x}
          data-y={dot.y}
          style={{
            ...dotBaseStyle,
            left: `${dot.x * 20}px`,
            top: `${dot.y * 20}px`,
          }}
        ></div>
      ))}
    </div>
  );
}
