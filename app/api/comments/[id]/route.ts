import Models from "@/db/models/m_comments";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
    const { params } = context;
    try {
      const data = await Models.findByPk(params.id);
      if (!data) {
        return NextResponse.json({ message: "Comments not found" }, { status: 404 });
      }
      await data.destroy();
      return NextResponse.json({ message: "Comments deleted successfully" });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
 