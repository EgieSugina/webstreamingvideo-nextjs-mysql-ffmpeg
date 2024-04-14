/* eslint-disable no-case-declarations */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  const { filename: FileName } = params;
  const FilePath = path.join(process.cwd(), "videos", "raw", FileName);
  if (!fs.existsSync(FilePath)) {
    return new NextResponse("file not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  const readStreamPromise = new Promise((resolve, reject) => {
    const chunks = [];
    const _readStream = fs.createReadStream(FilePath);
    _readStream.on("data", (chunk) => chunks.push(chunk));
    _readStream.on("end", () => resolve(Buffer.concat(chunks)));
    _readStream.on("error", reject);
  });

  return readStreamPromise.then(buffer => 
    new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp2t",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Accept-Ranges": "bytes", // Added Accept-Ranges header for seeking support
        "Content-Length": buffer.length.toString() // Added Content-Length header for video duration
      }
    })
  );
}
