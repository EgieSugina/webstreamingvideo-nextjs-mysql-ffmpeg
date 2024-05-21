"use server";

import Comments from "@/db/models/m_comments";
import Like from "@/db/models/m_likes";
import MyList from "@/db/models/m_my_list";
import Videos from "@/db/models/m_videos";
import History from "@/db/models/m_history"; // Import History model
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import sequelize from "@/db/sequelize";
import { Op } from "sequelize";

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
        "comment_count",
      ],
    ],
    include: [
      {
        model: Like,
        attributes: [],
        required: false,
      },
      {
        model: Comments,
        attributes: [],
        required: false,
      },
    ],
    group: ["videos.video_id"],
  });
  return data;
}
export async function Search({ search }) {
  const data = await Videos.findAll({
    raw: true,
    where: {
      public: true,
      // type: "movie",
      title: { [Op.like]: `%${search}%` },
    },
  });
  return data;
}
export async function ListMovie({ genre }) {
  const data = await Videos.findAll({
    raw: true,
    where: {
      public: true,
      type: "movie",
      genre:
        genre !== "All" ? { [Op.like]: `%${genre}%` } : { [Op.like]: `%%` },
    },
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
      [sequelize.col(`video.type`), "type"],
    ],
    where: { user_id: session.user.id },
    include: [
      {
        model: Videos,
        required: true,
      },
    ],
  });
  return data;
}
export async function OnlyRecentlyWatched() {
  const session = await getServerSession(authOptions);

  const data = await History.findAll({
    raw: true,
    where: {
      last_watch: {
        [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
      },
      user_id: session.user.id,
    },
    attributes: [
      `history_id`,
      `user_id`,
      `video_id`,
      `last_watch`,
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
      [sequelize.col(`video.type`), "type"],
    ],
    include: [
      {
        model: Videos,
        required: true,
      },
    ],
  });
  return data;
}
export async function OnlyPublic() {
  const session = await getServerSession(authOptions);

  let whereClause = { public: true };
  let includeClause = [];

  if (session) {
    includeClause = [
      {
        model: History,
        required: false,
        where: {
          video_id: sequelize.col(`videos.video_id`),
          user_id: session.user.id,
          last_watch: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        attributes: [
          `history_id`,

          [
            sequelize.fn(
              "IF",
              sequelize.col("histories.video_id"),
              true,
              false
            ),
            "isRecentlyWatched",
          ],
        ],
      },
    ];
  }
  const data = await Videos.findAll({
    raw: true,
    where: whereClause,
    include: includeClause,
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
