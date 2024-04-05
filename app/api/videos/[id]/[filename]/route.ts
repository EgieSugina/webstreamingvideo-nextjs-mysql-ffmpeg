/* eslint-disable no-case-declarations */

import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import fs from "fs";
import path from "path";
import zlib from "zlib";

export async function GET(request, { params }) {
  const { filename: FileName, id: video_id } = params;
  const FilePath = path.join(
    process.cwd(),
    "videos",
    "hls",
    video_id,
    FileName
  );
  if (!fs.existsSync(FilePath)) {
    return new NextResponse("file not found: %s\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
  switch (path.extname(FileName)) {
    case ".m3u8":
      const playlistContents = fs.readFileSync(FilePath);
      const ae = request.headers["accept-encoding"];
      if (ae && ae.match(/\bgzip\b/)) {
        zlib.gzip(playlistContents, function (err, zip) {
          if (err) throw err;
          return new NextResponse(zip, {
            headers: {
              "Content-Type": "application/vnd.apple.mpegurl",
              "Content-Encoding": "gzip"
            }
          });
        });
      } else {
        return new NextResponse(playlistContents, {
          headers: {
            "Content-Type": "application/vnd.apple.mpegurl"
          }
        });
      }
      break;
    case ".ts":
      // const stat = fs.statSync(FilePath);
      const readableStream = createReadStream(FilePath);

      // return new NextResponse(readableStream, {
      //   headers: {
      //     "Content-Type": "video/MP2T",
      //     "Content-Length": stat.size
      //   }
      // });
      const readStreamPromise = new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (chunk) => chunks.push(chunk));
        readableStream.on("end", () => resolve(Buffer.concat(chunks)));
        readableStream.on("error", reject);
      });

      return readStreamPromise.then((buffer: Buffer) => {
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": "video/MP2T",
            // "Content-Length": Number(stat.size)
          }
        });
      });
    case ".mp4":
      // const _stat = fs.statSync(FilePath);
      // const _readStream = createReadStream(FilePath);
      const _readStream = fs.readFileSync(FilePath);

      return new NextResponse(_readStream, {
        headers: {
          "Content-Type": "application/x-mpegURL",
          // "Cache-Control": "public, max-age=31536000",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          // "Content-Length": _stat.size
        }
      });
    case ".png":
      // const _stat_png = fs.statSync(FilePath);
      const png = fs.readFileSync(FilePath);

      // const png = createReadStream(FilePath);
      return new NextResponse(png, {
        headers: {
          "Content-Type": "image/png",
          // "Content-Length": _stat_png.size
        }
      });
    default:
      return new NextResponse(null, {
        status: 500
      });
  }
}
