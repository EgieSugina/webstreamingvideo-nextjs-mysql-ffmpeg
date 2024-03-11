import { NextRequest, NextResponse } from "next/server";

import M_User from "@/db/models/m_user";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const users = await M_User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const formData: any = await request.formData();
    const newUser: any = {};
    for (const [key, value] of formData.entries()) {
      newUser[key] = value;
    }
    const { password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    const file: any = formData.get("img");
    
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = buffer.toString("base64");
      newUser.img = base64Image;
    } else {
      newUser.img = "";
    }
    const createdUser = await M_User.create(newUser);
    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
