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
  const themeModeBtn = useRef(null);
  const themeModeToggle = useRef(null);

  function handleThemeBtnClick(view, btn, toggle) {
    if (!btn || !toggle) return;
    if (view === "editor") {
      toggle.style.transform = "translateX(14px)";
    } else {
      toggle.style.transform = "translateX(0)";
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  }, [copy]);

  return (
    <div className="md:h-10">
      <div className="relative grid md:flex items-center text-[12px] italic gap-2.5">
        <div className="md:flex gap-2.5 items-center font-bold logo-text text-[20px]">
          DRAFTIFY PRO{" "}
          <div className="underline font-normal text-[12px]">
            Write. Create. Build your story block by block.
          </div>
        </div>
        <div className="md:absolute right-0 flex items-center gap-2.5">
          <Tooltip text="e.g. for dev dummy data">
            <button
              className="border rounded-[10px] bg-(--hovered-draftify-theme-color) text-white hover:font-semibold hover:bg-(--draftify-theme-color) p-1 cursor-pointer"
              onClick={() => {
                setPromptAction("downloadJSON");
                setPromptVisiblility(true);
              }}
            >
              Download JSON <FontAwesomeIcon icon={["fas", "download"]} />
            </button>
          </Tooltip>
          <Tooltip text={`Download as document`}>
            <button
              className="border rounded-[10px] bg-(--hovered-draftify-theme-color) text-white hover:font-semibold hover:bg-(--draftify-theme-color) p-1 cursor-pointer"
              onClick={() => {
                setPromptAction("exportDocx");
                setPromptVisiblility(true);
              }}
            >
              Export .docx <FontAwesomeIcon icon={["fas", "download"]} />
            </button>
          </Tooltip>
          <Tooltip text={`copy to clipboard`}>
            <button
              className={`p-1 cursor-pointer ${
                copy
                  ? "text-green-400"
                  : "text-(--hovered-draftify-theme-color)"
              }`}
            >
              <FontAwesomeIcon
                icon={["fas", `${copy ? "check" : "copy"}`]}
                onClick={() => handleCopy(blocksData, setCopy)}
              />
            </button>
          </Tooltip>
          <Tooltip text={`toggle btn editor & preview`}>
            <div
              ref={themeModeBtn}
              className="border w-7.5 h-4 rounded-2xl cursor-pointer duration-300 flex items-center p-0"
              onClick={() => {
                setView((prev) => (prev === "editor" ? "preview" : "editor"));
                handleThemeBtnClick(
                  view,
                  themeModeBtn.current,
                  themeModeToggle.current
                );
              }}
            >
              <div
                ref={themeModeToggle}
                className="w-3 h-3 rounded-xl bg-[#232323] duration-300 flex items-center leading-2 justify-center translate-x-px"
              >
                <div className="flex items-center h-full text-white -translate-y-0.5">
                  {view === "editor" ? "e" : "p"}
                </div>
              </div>
            </div>{" "}
          </Tooltip>
          <div className="w-25">viewing {view}</div>
        </div>
      </div>
    </div>
  );
}
