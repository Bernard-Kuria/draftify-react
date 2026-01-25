import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tableStyles = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  width: "100%",
  border: "1px solid #d1d5db",
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

export default function TableEditor({ tableBlock, modifyTable, fontFamily }) {
  const { data } = tableBlock;

  if (!data?.body?.length) return null;

  const cells = {
    rows: data.body.at(-1)?.id[0] ?? 0,
    cols: data.body.at(-1)?.id[1] ?? 0,
  };

  return (
    <table
      style={{
        ...tableStyles,
        fontFamily: fontFamily || tableStyles.fontFamily,
      }}
    >
      <thead>
        <tr>
          {tableBlock.data?.head?.map((cell, idx) => (
            <th
              key={idx}
              style={{
                border: "1px solid #e5e7eb",
                padding: "8px",
              }}
            >
              <input
                type="text"
                placeholder={`Col ${idx + 1}`}
                style={{
                  border: "none",
                  borderBottom: "1px solid #3b82f6",
                  outline: "none",
                  width: "100%",
                  background: "transparent",
                  fontFamily: fontFamily || tableStyles.fontFamily,
                }}
                value={cell.content}
                onChange={(e) => {
                  const updatedHead = tableBlock.data.head.map((h) =>
                    h.id === cell.id ? { ...h, content: e.target.value } : h,
                  );
                  const updatedTable = {
                    ...tableBlock.data,
                    head: updatedHead,
                  };
                  modifyTable({
                    tableBlockId: tableBlock.id,
                    tableContent: updatedTable,
                  });
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: cells.rows + 1 }, (_, i) => (
          <tr key={i}>
            {Array.from({ length: cells.cols + 1 }, (_, j) => (
              <td
                key={`${i}-${j}`}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "8px",
                }}
              >
                <input
                  type="text"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #3b82f6",
                    outline: "none",
                    width: "100%",
                    fontSize: "14px",
                    background: "transparent",
                    fontFamily: fontFamily || tableStyles.fontFamily,
                  }}
                  placeholder={`Row ${i + 1}, Col ${j + 1}`}
                  value={
                    data.body.find(
                      (cell) => cell.id[0] === i && cell.id[1] === j,
                    )?.content || ""
                  }
                  onChange={(e) => {
                    const updatedBody = data.body.map((cell) =>
                      cell.id[0] === i && cell.id[1] === j
                        ? { ...cell, content: e.target.value }
                        : cell,
                    );

                    const updatedTable = { ...data, body: updatedBody };

                    modifyTable({
                      tableBlockId: tableBlock.id,
                      tableContent: updatedTable,
                    });
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TableOutput({ tableBlock, fontFamily }) {
  if (!tableBlock.data || !tableBlock.data.head || !tableBlock.data.body) {
    return null;
  }

  const { head, body } = tableBlock.data;

  const numCols = head.length;
  const groupedBody = body.reduce((acc, cell, index) => {
    const rowIndex = Math.floor(index / numCols);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(cell);
    return acc;
  }, []);

  return (
    <table
      key={tableBlock.id}
      style={{
        ...tableStyles,
        fontFamily: fontFamily || tableStyles.fontFamily,
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f3f4f6" }}>
          {head.map((cell) => (
            <th
              key={cell.id}
              style={{
                border: "1px solid #d1d5db",
                padding: "10px 12px",
                textAlign: "left",
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#374151",
              }}
            >
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedBody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell) => (
              <td
                key={cell.id.join("-")}
                style={{
                  border: "1px solid #d1d5db",
                  padding: "10px 12px",
                  color: "#4b5563",
                  fontSize: "0.9rem",
                  verticalAlign: "top",
                }}
              >
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RenderHoverTable({ handleClick }) {
  const [table, setTable] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [hoveredCell, setHoveredCell] = useState({ rows: 2, cols: 2 });
  const [isHovered, setIsHovered] = useState(false);
  const size = 10;

  const hoverTable = {
    position: "absolute",
    transform: "translateX(-40px) translateY(10px)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "10rem",
    height: "12.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.625rem",
    cursor: "pointer",
    padding: "0.5rem",
    zIndex: "10",
  };

  const rowColInputs = {
    width: "40px",
    textDecoration: "underline",
    textAlign: "center",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    background: "transparent",
  };

  const rowColBtnSetter = {
    flex: "1",
    border: "1px solid #3b82f6",
    borderRadius: "5px",
    lineHeight: "normal",
    padding: "0 4px",
    color: "#3b82f6",
    cursor: "pointer",
  };

  useEffect(() => {
    if (row < 0) setRow(0);
    if (col < 0) setCol(0);

    setHoveredCell({ rows: row, cols: col });
  }, [row, col]);

  const renderTable = () => {
    setTable(false);
    handleClick("table", hoveredCell);
  };

  return (
    <div style={{ position: "relative" }}>
      <FontAwesomeIcon
        icon={["fas", "angle-down"]}
        onClick={() => setTable((prev) => !prev)}
      />
      {table ? (
        <div style={hoverTable}>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "0.25rem",
            }}
          >
            <input
              style={rowColInputs}
              type="number"
              value={row}
              onChange={(e) => setRow(e.target.value)}
            />
            x
            <input
              style={rowColInputs}
              type="number"
              value={col}
              onChange={(e) => setCol(e.target.value)}
            />
            <button
              style={{
                ...rowColBtnSetter,
                ...(isHovered
                  ? { backgroundColor: "#3b82f6", color: "white" }
                  : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={renderTable}
            >
              enter
            </button>
          </div>
          {[...Array(size)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "0.25rem",
              }}
            >
              {[...Array(size)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    flex: "1",
                    height: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "2px",
                    backgroundColor:
                      rowIndex <= hoveredCell.rows &&
                      colIndex <= hoveredCell.cols
                        ? "#60a5fa"
                        : "#e5e7eb",
                  }}
                  onMouseEnter={() => {
                    setRow(rowIndex);
                    setCol(colIndex);
                  }}
                  onMouseLeave={() => setHoveredCell({ rows: 0, cols: 0 })}
                  onClick={renderTable}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
