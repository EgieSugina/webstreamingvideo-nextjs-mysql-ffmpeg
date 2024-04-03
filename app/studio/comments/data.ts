"use server";

import Comments from "@/db/models/m_comments";

export async function getData() {
  const data = await Comments.findAll({
    raw: true
  });
  return data;
}
