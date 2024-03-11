import { NextRequest, NextResponse } from "next/server";

import M_User from "@/db/models/m_user";

export async function DELETE(request, context) {
  const { params } = context;

  try {
    const user = await M_User.findByPk(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await user.destroy();
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
