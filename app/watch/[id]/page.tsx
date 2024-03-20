import CommentsForm from "@/components/CommentsForm";
import VideoPlayer from "@/components/VideoPlayer";

export default function Index({ params }) {
  const { id } = params;
  
  return (
    <>
      <VideoPlayer src={`/hls/${id}/video.m3u8`} />
      <CommentsForm />
    </>
  );
}
