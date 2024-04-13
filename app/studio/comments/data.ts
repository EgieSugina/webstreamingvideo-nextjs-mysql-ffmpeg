"use server";

import Comments from "@/db/models/m_comments";
import Video from "@/db/models/m_videos";

export async function getData() {
  const data = await Comments.findAll({
    include: [{
      model: Video,
      attributes: ['title']
    }],
    raw: true
  });
  return data;
}
