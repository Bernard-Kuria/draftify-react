// Tooltip.jsx
export default function Tooltip({ text, children }) {
  return (
    <div className="relative inline-block group">
      {children}
      <span
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
        bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 group-hover:transition-y-[5px] transition duration-300 whitespace-nowrap z-10"
      >
        {text}
      </span>
    </div>
  );
}
