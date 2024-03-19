// PlyrComponent.js
"use client";

import { Player, PlayerProvider } from "next-playerjs-wrapper";

const VideoPlayer = ({ src, width = "80vw" }) => {
  return (
    <div
      className="p-4"
      style={{ width: width, height: "50vh", display: " " }}
    >
      <PlayerProvider player="/playerjs.js">
        <Player id="my-player" file={src} />
      </PlayerProvider>
    </div>
  );
};

export default VideoPlayer;
