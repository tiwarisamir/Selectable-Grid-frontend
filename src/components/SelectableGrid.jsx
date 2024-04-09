import React, { useCallback, useState } from "react";

const SelectableGrid = ({ rows = 15, cols = 10 }) => {
  const [isMouseDown, setisMouseDown] = useState(false);
  const [selectedBoxes, setselectedBoxes] = useState([]);

  const handleMouseDown = (boxNumber) => {
    setisMouseDown(true);
    setselectedBoxes([boxNumber]);
  };

  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / cols);
        const startCol = (startBox - 1) % cols;
        const endRow = Math.floor((endBox - 1) / cols);
        const endCol = (endBox - 1) % cols;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const selected = [];
        if (startBox < endBox) {
          for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
              selected.push(row * cols + col + 1);
            }
          }
        } else {
          for (let row = maxRow; row >= minRow; row--) {
            for (let col = maxCol; col >= minCol; col--) {
              selected.push(row * cols + col + 1);
            }
          }
        }
        setselectedBoxes(selected);
      }
    },
    [isMouseDown]
  );
  const handleMouseUp = () => {
    setisMouseDown(false);
  };
  return (
    <div
      className="container text-2xl font-semibold gap-2 select-none justify-center"
      style={{ "--rows": rows, "--cols": cols }}
      onMouseUp={handleMouseUp}
    >
      {[...Array(rows * cols).keys()].map((_, i) => (
        <div
          key={i}
          className={`w-[40px] h-[40px] border border-black flex justify-center items-center
          ${selectedBoxes.includes(i + 1) ? "bg-blue-200" : ""}`}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
