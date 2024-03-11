import M_User from "@/db/models/m_user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
export async function PUT(request, { params: { id } }) {
  try {
    const user = await M_User.findByPk(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const formData: any = await request.formData();
    const updatedUser: any = {};
    for (const [key, value] of formData.entries()) {
      updatedUser[key] = value;
    }
    const { password } = updatedUser;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser.password = hashedPassword;
    } else {
      delete updatedUser["password"];
    }
    const file: any = formData.get("img");

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = buffer.toString("base64");
      updatedUser.img = base64Image;
    } else {
      delete updatedUser["img"];
    }
    await user.update(updatedUser);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
