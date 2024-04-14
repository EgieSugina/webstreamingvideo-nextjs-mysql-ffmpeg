"use server";

import Comments from "@/db/models/m_comments";
import User from "@/db/models/m_user"; // Added m_user model
import Video from "@/db/models/m_videos";

export async function getData() {
  const data = await Comments.findAll({
    include: [
      {
        model: Video,
        attributes: ["title"]
      },
      {
        model: User, // Added User model
        attributes: ["fullname", "username", "img"] // Added attributes to retrieve fullname, username, and img
      }
    ],
    raw: true
  });
  return data;
}
