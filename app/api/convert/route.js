import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function GET() {
  //   const { mp4FilePath } = req.body; // Assuming you send the MP4 file path in the request body
  const mp4FilePath = "./public/raw/vid.mp4"; // Directory where HLS files will be saved
  const outputDir = "./public/hls"; // Directory where HLS files will be saved
  exec(
    `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/video-%v.m3u8"`,
    // `ffmpeg -i ${mp4FilePath} -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2500k -maxrate 2500k -bufsize 3750k -b:a 160k -hls_segment_filename ${outputDir}/video_%03d.ts ${outputDir}/index.m3u8`,

    (error, stdout, stderr) => {
      if (error) {
        console.error("Error converting MP4 to HLS:", error);
        return NextResponse.json({ msg: error });
      }
      console.log("HLS conversion complete");
      return NextResponse.json({ msg: "HLS conversion complete" });
    }
  );
}
