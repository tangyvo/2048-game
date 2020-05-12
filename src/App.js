import React from 'react';

function App() {
  return (
    <div className="app">
      <header>
        <div className="logo">
          <p>2048</p>
        </div>
        <div className="header-info-section">
          <div className="score">
            <p>score</p>
            <p>1020</p>
          </div>
          <div className="best">
            <p>Best</p>
            <p>2048</p>
          </div>
          <button className="btn-reset">Reset</button>
        </div>
      </header>

      <p className="instructions"><strong>How to play: </strong>Press the u, down, right or left arrow keys to move the tiles. When 2 tiles of the same tiles touch they merge into one. Reach 2048 to win.</p>

      <main className="grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

      </main>
    </div>
  );
}

export default App;
