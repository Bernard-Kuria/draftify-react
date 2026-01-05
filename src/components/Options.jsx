import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RenderHoverTable } from "./blockComponents/Table";
import Tooltip from "./Tooltip";

import styles from "./module-styling/Options.module.css";

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
  { id: 11, type: "custom-1", iconText: "C1" },
  { id: 12, type: "custom-2", iconText: "C2" },
  { id: 13, type: "custom-3", iconText: "C3" },
];

export default function Options({ handleClick, options }) {
  const [activeId, setActiveId] = useState(null);

  const selectOption = (id, blockType) => {
    setActiveId(id);
    handleClick(blockType);
  };

  const customOptions = options.map((option) => {
    if (option.includes("-")) {
      const parts = option.split("-");
      if (parts[0] === "custom") {
        return parts.slice(0, 2).join("-");
      }
    }
    return option;
  });

  const filteredBlocks = customOptions
    ? blocks.filter((block) => customOptions.includes(block.type))
    : blocks;

  return (
    <div className={styles.optionsContainer}>
      {filteredBlocks.map((block) => {
        const isCustom = (block) => block.type.split("-")[0] === "custom";

        const tooltipText = isCustom(block)
          ? (() => {
              const matchingOption = options.find((o) =>
                o.startsWith(block.type + "-")
              );

              return matchingOption
                ? matchingOption.split("-")[2] || block.iconText
                : block.iconText;
            })()
          : block.type;
        return (
          <Tooltip text={tooltipText} key={block.id}>
            <div
              className={styles.optionButton}
              style={{
                color:
                  activeId === block.id
                    ? "var(--draftify-theme-color)"
                    : "#4b5563",
              }}
              onClick={() =>
                block.type !== "table" && selectOption(block.id, block.type)
              }
            >
              <div className={styles.iconWrapper}>
                {!isCustom(block) ? (
                  <FontAwesomeIcon
                    icon={block.icon}
                    onClick={() =>
                      block.type === "table" &&
                      selectOption(block.id, block.type)
                    }
                  />
                ) : (
                  <div>
                    {(() => {
                      const matchingOption = options.find((o) =>
                        o.startsWith(block.type + "-")
                      );
                      return matchingOption
                        ? matchingOption.split("-")[2] || block.iconText
                        : block.iconText;
                    })()}
                  </div>
                )}
                <div className={styles.subscript}>
                  {block.type === "subheading" ? "2" : ""}
                </div>
              </div>

              {block.type === "table" && (
                <RenderHoverTable handleClick={handleClick} block={block} />
              )}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
