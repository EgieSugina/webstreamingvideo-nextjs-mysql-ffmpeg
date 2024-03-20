"use server";

import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import M_User from "@/db/models/m_user";

export async function findOne() {
  const data = await Videos.findOne({
    where: { public: true },
    raw: true,

    order: sequelize.random()
  });
  return data;
}
export async function getUserSession() {
  const session = await getServerSession(authOptions);
  const users = await M_User.findByPk(session.user.id);
  return { session: session, users: users };
}
