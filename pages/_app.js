import React from "react";
import Layout from "../components/Layout/Layout";
import { ToastContextProvider } from "../context/ToastContextProvider";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "../context/UserContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <ToastContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastContextProvider>
    </UserContextProvider>
  );
}
