import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading/Loading";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Overseas_CSE470</title>
        <meta name="description" content="School Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Dashboard"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1>Get Ready to do this</h1>
        </div>
      </main>
    </>
  );
}
