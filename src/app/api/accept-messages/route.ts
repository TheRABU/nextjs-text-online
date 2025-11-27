import UserModel from "@/src/models/User";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession, User } from "next-auth";

///// this is next server side session route

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to ",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Updated user's accepting messages status",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not Found!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to GET user's message accepting status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to GET user's message accepting status",
      },
      { status: 500 }
    );
  }
}
