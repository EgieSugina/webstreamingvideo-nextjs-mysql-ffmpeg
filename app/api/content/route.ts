import { NextRequest, NextResponse } from "next/server";

import Comments from "@/db/models/m_comments";
import Like from "@/db/models/m_likes";
import Models from "@/db/models/m_videos";
import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";
import { v4 as uuidv4 } from "uuid";

const fs = require("fs");
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
    const newUser: any = {};
    for (const [key, value] of formData.entries()) {
      newUser[key] = value;
    }
    newUser["video_id"] = clean_uuid;
    const file: any = formData.get("video_file");
    console.log(newUser);

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(
        `public/raw/${clean_uuid}${file.name.match(/\.[^.]+$/)[0]}`,
        buffer
      );
    }
    const createdUser = await Models.create(newUser);

    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
