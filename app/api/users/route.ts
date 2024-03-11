import * as crypto from "crypto";

import { NextRequest, NextResponse } from "next/server";

import M_User from "@/db/models/m_user";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";

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
    const formData = await request.formData();
    // Extract data from FormData
    const newUser = {};
    for (const [key, value] of formData.entries()) {
      newUser[key] = value;
    }
    const { password, image } = newUser;
    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    // Replace the plain text password with the hashed password
    newUser.password = hashedPassword;
    // Convert image from binary to base64
    const file = formData.get("img");
    if (file) {
      // If no file is received, return a JSON response with an error and a 400 status code
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = buffer.toString("base64");
      // console.log(base64Image);
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


