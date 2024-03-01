export default function banner({ children }) {
  return (
    <>
      <div className="static ">
        <video autoPlay loop className={"fixed  w-full"}>
          <source src={"/hls/id_video_clip.mp4"} />
        </video>
        <div>{children}</div>
      </div>
    </>
  );
}
