export default function Grabber() {
  return (
    <div className="group flex flex-col justify-center gap-y-[3px] w-[15px] h-full border border-(--draftify-theme-color) hover:border-black rounded-tl-[5px] rounded-bl-[5px] cursor-move">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-1 h-1 rounded-2.5 bg-(--draftify-theme-color) group-hover:bg-black self-center"
        ></div>
      ))}
    </div>
  );
}
