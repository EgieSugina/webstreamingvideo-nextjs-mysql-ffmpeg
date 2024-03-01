import VideoPlayer from "@/components/VideoPlayer";

export default function Index({ params }) {
  console.log(params);
  const hlsUrl = "/hls/video.m3u8";
  return (
    <>
      <VideoPlayer src={hlsUrl} />
    </>
  );
}
