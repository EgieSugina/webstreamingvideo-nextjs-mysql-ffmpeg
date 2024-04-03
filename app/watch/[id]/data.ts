import Videos from "@/db/models/m_videos";

export async function getTitle(id) {
  const data = await Videos.findByPk(id, {
    raw: true
  });
  return data;
}
