//  `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/video-%v.m3u8"`
'use server'

import * as fs from 'fs'

import { changeStatus } from '@/app/studio/content/Data'
import { spawn } from 'child_process'

export default async function hls (id, format) {
  await changeStatus(id, 'process')
  const mp4FilePath = `./videos/raw/${id}.${format}`
  const outputDir = `./videos/hls/${id}`
  
  if (!fs.existsSync(outputDir)) {
    await fs.mkdirSync(outputDir, { recursive: true })
  }

  const ffmpegCuda = `ffmpeg -hwaccel cuda -c:v h264 -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v h264_nvenc -crf 22 -c:a aac -ar 48000 -filter:v:0 "format=pix_fmts=yuv420p,scale=w=480:h=360" -maxrate:v:0 600k -b:a:0 64k -filter:v:1 "format=pix_fmts=yuv420p,scale=w=640:h=480" -maxrate:v:1 900k -b:a:1 128k -filter:v:2 "format=pix_fmts=yuv420p,scale=w=1280:h=720" -maxrate:v:2 900k -b:a:2 128k -filter:v:3 "format=pix_fmts=yuv420p,scale=w=1920:h=1080" -maxrate:v:3 5000k -b:a:3 192k -filter:a:0 "aresample=async=1" -filter:a:1 "aresample=async=1" -filter:a:2 "aresample=async=1" -filter:a:3 "aresample=async=1" -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p v:3,a:3,name:1080p" -preset slow -hls_list_size 0 -hls_segment_size ${Number(process.env.HLS_SEGMENT_SIZE_MB *1000000)} -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/%v.m3u8"`

  const ffmpeglibx264 = `ffmpeg -i ${mp4FilePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v libx264 -crf 22 -c:a aac -ar 48000 -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 64k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 900k -b:a:1 128k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 900k -b:a:2 128k  -filter:v:3 scale=w=1920:h=1080 -maxrate:v:3 5000k -b:a:3 192k -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p v:3,a:3,name:1080p" -preset slow -hls_list_size 0 -hls_segment_size ${Number(process.env.HLS_SEGMENT_SIZE_MB *1000000)} -threads 0 -f hls -hls_playlist_type event -hls_time 3 -hls_flags independent_segments -master_pl_name "video.m3u8" "${outputDir}/%v.m3u8"`
  const ffmpegCommand =
    process.env.HAVE_CUDA === 'TRUE' ? ffmpegCuda : ffmpeglibx264
  console.log(ffmpegCommand)
  const ffmpegProcess = spawn(ffmpegCommand, [``], {
    detached: true,
    stdio: 'ignore',
    shell: true
  })

  ffmpegProcess.on('exit', async code => {
    if (code === 0) {
      await changeStatus(id, 'done')

      fs.unlinkSync(mp4FilePath)
      console.log('FFmpeg process completed successfully')
    } else {
      await changeStatus(id, 'failed')
      console.error(`FFmpeg process exited with code ${code}`)
      console.error(ffmpegProcess)
    }
  })
  ffmpegProcess.unref()
  console.log('FFmpeg process started')

  return 'FFmpeg process started'
}
