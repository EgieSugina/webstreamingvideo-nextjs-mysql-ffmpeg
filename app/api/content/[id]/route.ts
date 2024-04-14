import Models from "@/db/models/m_videos";
import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function DELETE(request, context) {
    const { params } = context;
  
    try {
      const data = await Models.findByPk(params.id);
      if (!data) {
        return NextResponse.json({ message: "Content not found" }, { status: 404 });
      }
      await data.destroy();
      return NextResponse.json({ message: "Content deleted successfully" });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
export async function POST(request, { params: { id } }) {
  try {
    const video = await Models.findByPk(id);
    if (!video) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const formData: any = await request.formData();
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const file: any = formData.get("video_file");

    // if (file.size > 0) {
    //   data["format_raw"] = file.name.match(/\.[^.]+$/)[0];
    //   const buffer = Buffer.from(await file.arrayBuffer());
    //   fs.writeFileSync(
    //     `videos/raw/${id}${file.name.match(/\.[^.]+$/)[0]}`,
    //     buffer
    //   );
    // }
    if (file.size > 0) {
      data["format_raw"] = file.name.split(".").pop();
      const buffer = await file.arrayBuffer();
      console.log(buffer);
      console.log(data);
      await pump(
        file.stream(),
        fs.createWriteStream(`videos/raw/${id}.${data["format_raw"]}`)
      );
      // fs.writeFileSync(
      //   `videos/raw/${clean_uuid}.${data["format_raw"]}`,
      //   Buffer.from(buffer)
      // );
    }
    const updatedata = await video.update(data);

    return NextResponse.json(updatedata);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
