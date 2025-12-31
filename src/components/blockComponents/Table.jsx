import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableEditor({ tableBlock, modifyTable }) {
  const { data } = tableBlock;

  if (!data?.body?.length) return null;

  const cells = {
    rows: data.body.at(-1)?.id[0] ?? 0,
    cols: data.body.at(-1)?.id[1] ?? 0,
  };

  return (
    <table className="mt-4">
      <thead>
        <tr>
          {tableBlock.data?.head?.map((cell, idx) => (
            <th key={idx} className="border p-2">
              <input
                type="text"
                className="outline-none w-full"
                autoFocus
                value={cell.content}
                onChange={(e) => {
                  const updatedHead = tableBlock.data.head.map((h) =>
                    h.id === cell.id ? { ...h, content: e.target.value } : h
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
        {Array.from({ length: cells.rows + 1 }, (_, i) => {
          const tableCells = [];
          for (let j = 0; j <= cells.cols; j++) {
            tableCells.push(
              <td key={`${i}-${j}`} className="border p-2">
                <input
                  type="text"
                  className="outline-none w-full"
                  placeholder={`Row ${i + 1}, Col ${j + 1}`}
                  value={
                    data.body.find(
                      (cell) => cell.id[0] === i && cell.id[1] === j
                    )?.content || ""
                  }
                  onChange={(e) => {
                    const updatedBody = data.body.map((cell) =>
                      cell.id[0] === i && cell.id[1] === j
                        ? { ...cell, content: e.target.value }
                        : cell
                    );

                    const updatedTable = { ...data, body: updatedBody };

                    modifyTable({
                      tableBlockId: tableBlock.id,
                      tableContent: updatedTable,
                    });
                  }}
                />
              </td>
            );
          }
          return <tr key={i}>{tableCells}</tr>;
        })}
      </tbody>
    </table>
  );
}

export function TableOutput({ tableBlock }) {
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
    <table key={tableBlock.id} className="w-full">
      <thead>
        <tr>
          {head.map((cell) => (
            <th key={cell.id} className="border p-2">
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedBody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell) => (
              <td key={cell.id.join("-")} className="border p-2">
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
  const size = 10;

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
    <div className="relative">
      <FontAwesomeIcon
        icon={["fas", "angle-down"]}
        onClick={() => setTable((prev) => !prev)}
      />
      {table ? (
        <div className="absolute -translate-x-[40px] translate-y-[10px] bg-white flex flex-col gap-1 w-40 h-50 border border-gray-600 rounded-[10px] cursor-pointer p-2">
          <div className="flex w-full gap-1">
            <input
              className="w-[40px] underline text-center border rounded-[5px]"
              type="number"
              value={row}
              onChange={(e) => setRow(e.target.value)}
            />
            x
            <input
              className="w-[40px] underline text-center border rounded-[5px]"
              type="number"
              value={col}
              onChange={(e) => setCol(e.target.value)}
            />
            <button
              className="border rounded-[5px] leading-none px-1 border-(--draftify-theme-color) text-(--draftify-theme-color) cursor-pointer hover:bg-(--draftify-theme-color) hover:text-white"
              onClick={renderTable}
            >
              enter
            </button>
          </div>
          {[...Array(size)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {[...Array(size)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex-1 h-3 border border-gray-600 rounded-2 ${
                    rowIndex <= hoveredCell.rows && colIndex <= hoveredCell.cols
                      ? "bg-blue-400"
                      : "bg-gray-200"
                  }`}
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
