import M_Videos from "@/db/models/m_videos";
import { NextResponse, NextRequest } from "next/server";
import { Op } from 'sequelize';
export async function GET(Req: NextRequest) {
  const Search = Req.nextUrl.searchParams.get("search");
  try {
    const video = await M_Videos.findAll({
      raw: true,
      where: {
        title: {
          [Op.like]: `%${Search}%`,
        },
      },
    });
    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
