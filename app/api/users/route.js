import M_User from "@/db/models/m_user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await M_User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
