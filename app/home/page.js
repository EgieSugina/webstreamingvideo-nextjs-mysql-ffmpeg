"use client";

import "./home.css";

import Slider from "@/components/Slider";
import VideoCards from "@/components/VideoCards";

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <div className="">
      <div>HOME</div>
      <Slider id={"slider-1"}>
        <VideoCards id={"ini-video-id"} />
      </Slider>

      {/* <VideoPlayer src={hlsUrl} /> */}
    </div>
  );
}
