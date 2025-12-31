import { useEffect } from "react";

export function useGenerateGrid(setGridDots) {
  useEffect(() => {
    function generateGrid() {
      const dotSize = 20;
      const cols = Math.ceil(window.innerWidth / dotSize);
      const rows = Math.ceil(document.documentElement.scrollHeight / dotSize);
      const dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({ x, y, key: `${x}-${y}` });
        }
      }
      setGridDots(dots);
    }

    generateGrid();
    window.addEventListener("resize", generateGrid);
    return () => window.removeEventListener("resize", generateGrid);
  }, [setGridDots]);
}
