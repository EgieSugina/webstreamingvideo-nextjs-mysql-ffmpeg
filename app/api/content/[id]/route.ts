import Models from "@/db/models/m_videos";
import { NextResponse } from "next/server";

const fs = require("fs");
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
export async function PUT(request, { params: { id } }) {
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

    if (file.size > 0) {
      data["format_raw"] = file.name.match(/\.[^.]+$/)[0];
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(
        `public/raw/${id}${file.name.match(/\.[^.]+$/)[0]}`,
        buffer
      );
    }
    const updatedata = await video.update(data);

    return NextResponse.json(updatedata);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
