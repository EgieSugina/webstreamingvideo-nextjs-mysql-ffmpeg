// PlyrComponent.js
"use client";

import { Player, PlayerProvider } from "next-playerjs-wrapper";

const VideoPlayer = ({ src }) => {
  return (
    <div style={{ width: "500px", height: "281px" }}>
      <PlayerProvider player="/playerjs.js">
        <Player id="my-player" file={src} />
      </PlayerProvider>
    </div>
  );
};

export default VideoPlayer;
