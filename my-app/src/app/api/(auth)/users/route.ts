import User from "@/app/interface/user";
import connect from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//
const ObjectId = require("mongoose").Types.ObjectId;

// needs to be named export
export async function GET() {
  try {
    connect();
    const user = await User.find();
    // const prettify = JSON.stringify(user, null, 2);
    const uglify = JSON.stringify(user);
    return new NextResponse(uglify, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error in fetching user: " + error, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  //return new NextResponse( 'Hello, World!' )
}

// export { GET }

export async function POST(req: Request) {
  try {
    const body = await req.json();

    connect();

    const createUser = new User(body);
    await createUser.save();

    // Return success response
    return NextResponse.json(
      { message: "User created successfully", user: createUser },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 } // Internal Server Error
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, newName, newEmail, newPassword } = body;
    connect();
    if (!id || !newName || !newEmail || !newPassword) {
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );
    }
  } catch (error) {}
}