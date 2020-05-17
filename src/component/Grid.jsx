import React from "react";
import { colour } from "./globalObjects";

const Grid = ({ grid }) => {
  return (
    <main className="grid">
      {grid
        .join(",")
        .split(",")
        .map((tile) => (
          <div className={colour(tile)} key={Math.random()}>
            {tile === "0" ? "" : tile}
          </div>
        ))}
    </main>
  );
};

export default Grid;
