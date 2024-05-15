// PlyrComponent.js
"use client";

import { Player, PlayerProvider } from "next-playerjs-wrapper";

const VideoPlayer = ({ src, width = "83vw" }) => {
  return (
      <div
        className="p-4 "
        style={{ width: width, display: " " }}
      >
        <PlayerProvider player="/playerjs.js">
          <Player id="my-player" file={src} subtitle={[]}/>
        </PlayerProvider>
      </div>
  );
};

export default VideoPlayer;
