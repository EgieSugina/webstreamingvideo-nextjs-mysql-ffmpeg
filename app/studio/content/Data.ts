"use server";

import Comments from "@/db/models/m_comments";
import Like from "@/db/models/m_likes";
import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";

export async function findAll() {
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
  return data;
}
