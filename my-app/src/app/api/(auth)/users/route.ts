import User from "@/app/interface/user";
import connect from "@/app/lib/db";
import mongoose, { Types } from "mongoose";
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
    const { id, name, email, password } = body;
    console.log(body);
    await connect();
    if (!id || !name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    const updateUser = await User.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name: name, email: email, password: password } },
      { new: true }
    );
    if (!updateUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updateUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

// define delete method to delete user by id
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: "Please provide user id" },
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    connect();
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "User deleted successfully",
        user: deleteUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
