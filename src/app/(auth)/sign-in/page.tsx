"use client";

// import { useRouter } from "next/router";

// import * as z from 'zod';
// import { signIn } from 'next-auth/react';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useEffect, useState } from "react";
// import { useDebounceValue } from 'usehooks-ts'
// import toast, { Toaster } from 'react-hot-toast';
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import axios, {AxiosError} from "axios";

// import { SignUpValidation } from "@/src/validation/signupValidation";
// import { ApiResponse } from "@/src/types/ApiResponse";

const SignIn = () => {
  // const [username, setUsername] = useState("");
  // const [usernameMessage, setUsernameMessage] = useState("");
  // const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const router = useRouter();

  // const debouncedUsername = useDebounceValue(username, 300);

  // const form = useForm<z.infer<typeof SignUpValidation>>({
  //   resolver: zodResolver(SignUpValidation),
  //   defaultValues: {
  //     username: '',
  //     email: '',
  //     password: ''
  //   }
  // })

  //   useEffect(()=> {
  //     const checkUserName = async () => {
  //       if(debouncedUsername) {
  //         setIsCheckingUsername(true);
  //         setUsernameMessage('');
  //         try {
  //          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);

  //          setUsernameMessage(response.data.message)
  //         } catch (error) {
  //           console.error(error);
  //           const axiosError = error as AxiosError<ApiResponse>;

  //           setUsernameMessage(
  //             axiosError.response?.data.message ?? "Error checking username"
  //           )
  //         }
  //           finally {
  //             setIsCheckingUsername(false)
  //           }
  //       }
  //     }
  //     checkUserName();
  //   },[debouncedUsername])

  //   const onSubmit = async (data: z.infer<typeof SignUpValidation>) => {
  //     setIsSubmitting(true);

  //     try {
  //     const response =  await axios.post<ApiResponse>("/api/sign-up", data);
  //     toast.success("")
  //     } catch (error) {

  //     }
  //   }
  return (
    <>
      <div>SignIn page</div>
      {/* <Toaster /> */}
    </>
  );
};

export default SignIn;
