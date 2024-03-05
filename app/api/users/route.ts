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
export async function POST(request) {
  try {
    const newUser = request.body;
    const createdUser = await M_User.create(newUser);
    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const updatedUser = request.body;
    const userId = request.params.id;
    const user = await M_User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await user.update(updatedUser);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const userId = request.params.id;
    const user = await M_User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await user.destroy();
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
