"use client";

import "./home.css";

import { useEffect, useState } from "react";

import Slider from "@/components/Slider";
import VideoCards from "@/components/VideoCards";
import { OnlyPublic } from "@/app/studio/content/Data";

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [Data, setData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await OnlyPublic();
      setData(data);
    };
    getData();
  }, []);
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <div>
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <div>Terbaru</div>
        {Data.length > 0 && (
          <>
            <Slider id={"slider-1"}>
              {Data.map((v, i) => (
                <VideoCards key={i + "new"} Data={v} />
              ))}
            </Slider>
          </>
        )}

        {/* <Slider id={"slider-2"} autoplay={false}>
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
        </Slider> */}

        {/* <VideoPlayer src={hlsUrl} /> */}
      </div>
    </div>
  );
}
