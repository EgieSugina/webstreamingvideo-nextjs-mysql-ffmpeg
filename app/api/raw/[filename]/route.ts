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

  // Use a stream instead of reading the file directly to handle large files
  const _readStream = fs.createReadStream(FilePath);

  // Stream the file directly to the response
  return new NextResponse(_readStream, {
    status: 200,
    headers: {
      "Content-Type": "application/x-mpegURL",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0"
    }
  });
}
