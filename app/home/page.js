"use client";

import "./home.css";

import Slider from "@/components/Slider";
import VideoCards from "@/components/VideoCards";

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <div>
      <video autoPlay loop className={"-z-10 fixed w-full"}>
        <source src={"/hls/id_video_clip.mp4"} />
      </video>
      <div className="mx-auto  py-6 sm:px-6 lg:px-8">
        <div>HOME</div>
        <Slider id={"slider-1"}>
          <VideoCards id={"ini-video-id"} />
        </Slider>

        {/* <VideoPlayer src={hlsUrl} /> */}
      </div>
    </div>
  );
}
