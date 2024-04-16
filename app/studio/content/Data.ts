"use server";

import Comments from "@/db/models/m_comments";
import Like from "@/db/models/m_likes";
import MyList from "@/db/models/m_my_list";
import Videos from "@/db/models/m_videos";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
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
  return data;
}

export async function ListMovie() {
  const data = await Videos.findAll({
    raw: true,
    where: { public: true,type:'movie' }
  });
  return data;
}
export async function OnlyMyList() {
  const session = await getServerSession(authOptions);
  const data = await MyList.findAll({
    raw: true,
    attributes: [
      `id_mylist`,
      `video_id`,
      `user_id`,
      `mylistadd_date`,
      [sequelize.col(`video.video_id`), "video_id"],
      [sequelize.col(`video.title`), "title"],
      [sequelize.col(`video.description`), "description"],
      [sequelize.col(`video.status`), "status"],
      [sequelize.col(`video.upload_date`), "upload_date"],
      [sequelize.col(`video.user_id`), "user_id"],
      [sequelize.col(`video.views`), "views"],
      [sequelize.col(`video.public`), "public"],
      [sequelize.col(`video.duration`), "duration"],
      [sequelize.col(`video.genre`), "genre"],
      [sequelize.col(`video.format_raw`), "format_raw"],
      [sequelize.col(`video.release_date`), "release_date"],
      [sequelize.col(`video.type`), "type"]
    ],
    where: { user_id: session.user.id },
    include: [
      {
        model: Videos,
        required: true
      }
    ]
  });
  return data;
}
export async function OnlyPublic() {
  const data = await Videos.findAll({
    raw: true,
    where: { public: true }
  });
  return data;
}
export async function contentVisibelity(id, visibelity) {
  const _video = await Videos.findByPk(id);

  await _video.update({ public: visibelity });
}
export async function changeStatus(id, status) {
  const _video = await Videos.findByPk(id);

  await _video.update({ status: status });
}
