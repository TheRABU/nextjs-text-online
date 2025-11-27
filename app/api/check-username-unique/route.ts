import UserModel from "@/src/models/User";

import dbConnect from "@/src/lib/dbConnect";

import { z } from "zod";

import { UsernameValidation } from "@/src/validation/signupValidation";

const UsernameQuery = z.object({
  username: UsernameValidation,
});

// checking the username is available or not

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed!",
      },
      { status: 405 }
    );
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuery.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error checking isUserName available", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
