import React from "react";

const Grid = ({ grid, id }) => {
  return (
    <main className="grid">
        
      {grid
        .join(",")
        .split(",")
        .map((tile, index) => (
          <div className={`colour-${tile} ${index === id ? 'newBlock' : ''}`} key={index}>
            {tile === "0" ? "" : tile}
          </div>
        ))}
    </main>
  );
};

export default Grid;
