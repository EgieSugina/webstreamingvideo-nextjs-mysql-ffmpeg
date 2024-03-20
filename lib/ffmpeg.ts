//  `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/video-%v.m3u8"`
"use server";

import * as fs from "fs";

import { changeStatus } from "@/app/studio/content/Data";
import { spawn } from "child_process";

export default async function ffmpeg(id, format) {
  await changeStatus(id, "process");
  const mp4FilePath = `./public/raw/${id}${format}`;
  const outputDir = `./public/hls/${id}`;

  if (!fs.existsSync(outputDir)) {
    await fs.mkdirSync(outputDir, { recursive: true });
  }
  const ffmpegProcess = spawn(
    `ffmpeg -i ${mp4FilePath} -ss 00:00:55 -vframes 1 "${outputDir}/thumbnail.png"  && ffmpeg -i ${mp4FilePath} -ss 00:02:00 -t 00:03:00 -c copy "${outputDir}/clip.mp4" && ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/%v.m3u8"`,
    [``],
    {
      detached: true,
      stdio: "ignore",
      shell: true
    }
  );

  ffmpegProcess.on("exit", async (code) => {
    if (code === 0) {
      await changeStatus(id, "done");

      fs.unlinkSync(mp4FilePath);
      console.log("FFmpeg process completed successfully");
    } else {
      await changeStatus(id, "failed");
      console.error(`FFmpeg process exited with code ${code}`);
      console.error(ffmpegProcess);
    }
  });
  ffmpegProcess.unref();
  console.log("FFmpeg process started");

  return "FFmpeg process started";
}
