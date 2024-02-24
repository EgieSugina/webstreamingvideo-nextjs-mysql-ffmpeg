"use client";

import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const hlsUrl = "/hls/video.m3u8";

  return (
    <div className="h-40">
      <div>HOME</div>
      <VideoPlayer src={hlsUrl} />
    </div>
  );
}
