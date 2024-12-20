import Sessions from "@/app/interface/session";
import User from "@/app/interface/user";
import connect from "@/app/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      throw new Error("Please provide user id");
    }
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    connect();
    const finduser = await User.findById(id);
    if (!finduser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const sessions = await Sessions.find({ userId: new Types.ObjectId(id) });
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 500 }
    );
  }
}
