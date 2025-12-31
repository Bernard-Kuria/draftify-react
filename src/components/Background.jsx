export default function BackGround({ gridDots }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-1">
      {gridDots.map((dot) => (
        <div
          className="absolute w-px h-px bg-black"
          data-x={dot.x}
          data-y={dot.y}
          key={dot.key}
          style={{
            left: `${dot.x * 20}px`,
            top: `${dot.y * 20}px`,
          }}
        ></div>
      ))}
    </div>
  );
}
