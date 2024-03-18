"use server";

import Like from "@/db/models/m_likes";
import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";

export async function findAll() {
  const users = await Videos.findAll({
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
      [sequelize.fn("COUNT", sequelize.col("likes.like_id")), "like_count"]
    ],
    include: [
      {
        model: Like,
        attributes: [],
        required: false // Use 'true' if you want to perform an inner join
      }
    ],
    group: ["videos.video_id"] // Group by video_id to count likes per video
  });
  return users;
}
