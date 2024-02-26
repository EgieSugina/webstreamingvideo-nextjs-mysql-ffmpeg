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
      <Slider>
        <VideoCards />
        <VideoCards />
        <VideoCards />
        <VideoCards />
      </Slider>
      <div className=" grid grid-cols-6">
        <VideoCards />
        <VideoCards />
        <VideoCards />
        <VideoCards />
        <VideoCards />
        <VideoCards />
        <VideoCards />
      </div>

      {/* <VideoPlayer src={hlsUrl} /> */}
    </div>
  );
}
