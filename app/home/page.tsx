"use client";

import "./home.css";

import Slider from "@/components/Slider";
import VideoCards from "@/components/VideoCards";

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <div>
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <div>Terbaru</div>
        
        <Slider id={"slider-1"}>
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          
        </Slider>
        
        <Slider id={"slider-2"} autoplay={false}>
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
        </Slider>
        <Slider id={"slider-2"} autoplay={false}>
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
          <VideoCards id={"ini-video-id"} />
        </Slider>

        {/* <VideoPlayer src={hlsUrl} /> */}
      </div>
    </div>
  );
}
