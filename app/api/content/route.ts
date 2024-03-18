import { NextRequest, NextResponse } from "next/server";

import Models from "@/db/models/m_videos";
import { v4 as uuidv4 } from "uuid";

const fs = require("fs");

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
