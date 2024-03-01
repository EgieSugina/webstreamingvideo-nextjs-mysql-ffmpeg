//  `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/video-%v.m3u8"`

import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function GET() {
  const mp4FilePath = "./public/raw/vid.mp4";
  const outputDir = "./public/hls";

  const ffmpegProcess = spawn(
    `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/video-%v.m3u8"`,
    [``],
    {
      detached: true,
      stdio: "ignore",
      shell: true
    }
  );

  ffmpegProcess.on("exit", (code) => {
    if (code === 0) {
      console.log("FFmpeg process completed successfully");
      // Execute your function here, for example:
      // executeFunctionAfterFFmpegCompletion();
    } else {
      console.error(`FFmpeg process exited with code ${code}`);
    }
  });
  ffmpegProcess.unref(); // Unrefs the child process to allow the parent to exit independently
  console.log("FFmpeg process started");

  return NextResponse.json({ msg: "FFmpeg process started" });
}
