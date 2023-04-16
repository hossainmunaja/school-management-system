import React, { useState } from "react";
import { useRouter } from "next/router";
import useLogin from "../hooks/user/useLogin";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContextProvider";
import Loading from "../components/Loading/Loading";
import Image from "next/image";
import Head from "next/head";
import { useUser } from "../context/UserContextProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  const notify = useToast();
  const user = useUser();
  const { trigger: triggerLogin } = useLogin();
  const { register: loginForm, handleSubmit } = useForm();

  //NOTE - Login action
  const login = (data) => {
    setSubmitLoading(true);
    triggerLogin({ email: data.email, password: data.password }).catch((e) => {
      console.log(data);
      // @ts-ignore
      notify("UserID or password is invalid", "error");
      setSubmitLoading(false);
    });
  };

  if (user) {
    router.push("/");
  }

  if (user === null) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>School Management</title>
        <meta name="description" content="School Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex justify-center items-center w-full h-screen p-5 bg-no-repeat bg-cover bg-center bg-blend-overlay bg-black bg-opacity-80 bg-red-300"

        // style={{ backgroundImage: "url('/img/out.png')" }}
      >
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col justify-center items-center p-16 gap-2 shadow-2xl rounded-xl bg-white bg-opacity-80"
        >
          <Image
            src={"/img/logo.png"}
            width={100}
            height={100}
            alt={"sayemlogo"}
          />
          <h1 className="text-xl font-semibold uppercase">Login</h1>
          <input
            type="text"
            placeholder="Email"
            className="px-2 py-2 border mt-5"
            {...loginForm("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-2 py-2 border"
            {...loginForm("password")}
          />
          {isSubmitLoading ? (
            <AiOutlineLoading3Quarters
              color="black"
              className="animate-spin mt-5"
            />
          ) : (
            <input
              type="submit"
              disabled={isSubmitLoading}
              className="bg-blue-500 px-2 py-1 text-white mt-5 w-full"
            />
          )}
        </form>
      </div>
    </>
  );
}
