// PlyrComponent.js
"use client";

import { Player, PlayerProvider } from "next-playerjs-wrapper";

import CommentsForm from "@/components/CommentsForm"

const VideoPlayer = ({ src, width = "83vw" }) => {
  return (
    <div className="w-full flex place-content-center ">
      <div
        className="p-4 "
        style={{ width: width, height: "50vh", display: " " }}
      >
        <PlayerProvider player="/playerjs.js">
          <Player id="my-player" file={src} />
        </PlayerProvider>
      <CommentsForm/>
      </div>
    </div>
  );
};

export default VideoPlayer;
