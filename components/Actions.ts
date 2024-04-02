"use server";
import sequelize from "@/db/sequelize";
// import Image from "next/image";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Comments from "@/db/models/m_comments";
import Users from "@/db/models/m_user";
import MyList from "@/db/models/m_my_list";

export async function navigate(link) {
  redirect(link);
}
export async function navigateRevalidatePath(link) {
  revalidatePath(link);
}
export async function getOnListMyList(data) {
  const { user_id, video_id } = data;
  const myListEntry = await MyList.findOne({ where: { user_id, video_id } });
  if (myListEntry) {
    return true;
  } else {
    return false;
  }
}
export async function RemoveMyList(data) {
  const { user_id, video_id } = data;
  await MyList.destroy({ where: { user_id, video_id } });
}
export async function AddMyList(data) {
  await MyList.create(data);
}
export async function PostComments(data) {
  await Comments.create(data);
}
export async function getCommentsByVideoID(id) {
  const users = await Comments.findAll({
    raw: true,
    where: { video_id: id },
    attributes: [
      `comments_id`,
      `video_id`,
      `user_id`,
      `comment_text`,
      [sequelize.col("user.fullname"), "fullname"],
      [sequelize.col("user.username"), "username"]
    ],
    include: [
      {
        model: Users,
        attributes: [],
        required: false
      }
    ]
  });
  return users;
}
export async function imgProp(id) {
  const users = await Users.findByPk(id);
  return `data:image/png;base64,${users.img}`;
}
