// PlyrComponent.js
"use client";

import { Player, PlayerProvider } from "next-playerjs-wrapper";

const VideoPlayer = ({ src }) => {
  return (
    <div className="p-4" style={{ width: "80vw", height: "50vh", display: "flex" }}>
      <PlayerProvider player="/playerjs.js">
        <Player id="my-player" file={src} />
      </PlayerProvider>
    </div>
  );
};

export default VideoPlayer;
