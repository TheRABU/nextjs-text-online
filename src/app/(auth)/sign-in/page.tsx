"use client";

import { useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();

  console.log("session data", session);

  return <div>SignIn page</div>;
};

export default SignIn;
