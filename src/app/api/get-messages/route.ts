/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from "@/src/models/User";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";

///////// aggregession pipeline to get All messages of a user

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

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      // pipelines
      {
        $match: { id: userId },
      }, // messages are in a array of Message type to need to unbind them
      {
        $unwind: "$messages",
      },
      { $sort: { "messages.createdAt": -1 } },
      // now group all the documents
      {
        $group: { _id: "$_id", messages: { $push: "$messages" } },
      },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error at getting all messages", error);
    return Response.json(
      {
        success: false,
        message: "Error getting messages from backend",
      },
      { status: 500 }
    );
  }
}
