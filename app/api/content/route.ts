import { NextRequest, NextResponse } from "next/server";

import Comments from "@/db/models/m_comments";
import Like from "@/db/models/m_likes";
import Models from "@/db/models/m_videos";
import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
export async function GET() {
  try {
    const data = await Videos.findAll({
      raw: true,
      attributes: [
        "video_id",
        "title",
        "description",
        "status",
        "upload_date",
        "user_id",
        "duration",
        "genre",
        "release_date",
        "type",
        "views",
        "public",
        [sequelize.fn("COUNT", sequelize.col("likes.like_id")), "like_count"],
        [
          sequelize.fn("COUNT", sequelize.col("comments.comments_id")),
          "comment_count"
        ]
      ],
      include: [
        {
          model: Like,
          attributes: [],
          required: false
        },
        {
          model: Comments,
          attributes: [],
          required: false
        }
      ],
      group: ["videos.video_id"]
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const uuid = uuidv4();
  const clean_uuid = uuid.replace(/-/g, "").substring(0, 11);
  try {
    const formData: any = await request.formData();

    const data: any = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    data["video_id"] = clean_uuid;
    const file: any = formData.get("video_file");

    if (file.size > 0) {
      data["format_raw"] = file.name.split(".").pop();
      const buffer = await file.arrayBuffer();
       
      await pump(
        file.stream(),
        fs.createWriteStream(`videos/raw/${clean_uuid}.${data["format_raw"]}`)
      );
      // fs.writeFileSync(
      //   `videos/raw/${clean_uuid}.${data["format_raw"]}`,
      //   Buffer.from(buffer)
      // );
    }
    const createdUser = await Models.create(data);

    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
