import M_User from "@/db/models/m_user";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, username } = (await req.json()) as {
      username: string;
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user: any = await M_User.create({
      username: username,
      fullname: name,
      email: email.toLowerCase(),
      password: hashed_password
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message
      }),
      { status: 500 }
    );
  }
}
