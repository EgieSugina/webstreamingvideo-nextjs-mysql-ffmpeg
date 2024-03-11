'use server'

import M_User from "@/db/models/m_user";

export default async function getDatafindAll() {
  const users = await M_User.findAll({
    raw: true
  });
  return users;
}