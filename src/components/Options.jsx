import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RenderHoverTable } from "./blockComponents/Table";
import Tooltip from "./Tooltip";

const blocks = [
  { id: 1, type: "heading", icon: ["fas", "heading"] },
  { id: 2, type: "subheading", icon: ["fas", "heading"] },
  { id: 3, type: "paragraph", icon: ["fas", "paragraph"] },
  { id: 4, type: "quote", icon: ["fas", "quote-right"] },
  { id: 5, type: "list", icon: ["fas", "list"] },
  { id: 6, type: "table", icon: ["fas", "table-list"] },
  { id: 7, type: "image", icon: ["far", "image"] },
  { id: 8, type: "video", icon: ["fas", "play"] },
  { id: 9, type: "link", icon: ["fas", "link"] },
  { id: 10, type: "code", icon: ["fas", "code"] },
];

export default function Options({ handleClick }) {
  const [activeId, setActiveId] = useState(null);

  const selectOption = (id, blockType) => {
    setActiveId(id);
    handleClick(blockType);
  };

  return (
    <div className="flex flex-wrap gap-[5px] md:gap-[10px] items-center">
      {blocks.map((block) => (
        <Tooltip text={`${block.type}`} key={block.id}>
          <div
            className={`flex items-center gap-[10px] h-[40px] p-2 border-2 border-gray-600 cursor-pointer rounded-[10px] text-sm md:text-md ${
              activeId === block.id
                ? "text-(--draftify-theme-color)"
                : "text-gray-600"
            }`}
            onClick={() =>
              block.type !== "table" && selectOption(block.id, block.type)
            }
          >
            <div className="flex">
              <FontAwesomeIcon
                icon={block.icon}
                onClick={() =>
                  block.type === "table" && selectOption(block.id, block.type)
                }
              />
              <div className="text-xs">
                {block.type === "subheading" ? "2" : ""}
              </div>
            </div>
            {block.type === "table" && (
              <RenderHoverTable handleClick={handleClick} block={block} />
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
