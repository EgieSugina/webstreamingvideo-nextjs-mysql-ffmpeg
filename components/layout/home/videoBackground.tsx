"use client";

import React, { useEffect, useRef } from "react";

export default function Banner({ children, Data }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Attempt to play the video
      const playPromise = video.play();

      // Check if the browser allows autoplay
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started
          })
          .catch((error) => {
            // Autoplay was prevented
            // You might want to show a play button for the user to interact with
            console.error("Autoplay prevented:", error);
          });
      }
    }
  }, [Data]);
  return (
    <>
      <div className="relative ">
        {Data ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              className={"fixed  w-full"}
            >
              <source src={`/hls/${Data.video_id}/clip.mp4`} />
            </video>
          </>
        ) : null}
        <div className="absolute w-full h-screen">{children}</div>
      </div>
    </>
  );
}
