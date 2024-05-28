/* eslint-disable no-case-declarations */

import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import fs from "fs";
import path from "path";
import zlib from "zlib";

export async function GET(request, { params }) {
  const { series_id: FileName } = params;
  const FilePath = path.join(process.cwd(), "videos", "series_cover", FileName);
  if (!fs.existsSync(FilePath)) {
    return new NextResponse("file not found: %s\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  switch (path.extname(FileName)) {
    case ".png":
      // const _stat_png = fs.statSync(FilePath);
      const png = fs.readFileSync(FilePath);

      // const png = createReadStream(FilePath);
      return new NextResponse(png, {
        headers: {
          "Content-Type": "image/png",
          // "Content-Length": _stat_png.size
        },
      });
    default:
      return new NextResponse(null, {
        status: 500,
      });
  }
}
