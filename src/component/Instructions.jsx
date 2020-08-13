import React from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

export default function Instructions() {
  return (
    <div className='instructions'>
      <BrowserView>
        <strong>How to play: </strong> Press the ↑, ↓, →, ← arrow keys to move
        the tiles. When 2 same tiles touch they merge into one. Reach 2048 to
        win.
      </BrowserView>
      <MobileView>
        <strong>How to play: </strong> Swipe up, right, down and left to move
        the tiles. When 2 same tiles touch they merge into one. Reach 2048 to
        win.
      </MobileView>
    </div>
  );
}
