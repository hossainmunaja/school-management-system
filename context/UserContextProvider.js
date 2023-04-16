import React, { useContext, useEffect, useState } from "react";
import { pb } from "../libs/pocketbase";

const UserContext = React.createContext({});
const UserLogoutContext = React.createContext({});

export function useUser() {
  return useContext(UserContext);
}

export function useUserLogout() {
  return useContext(UserLogoutContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    pb.authStore.clear();
  };

  pb.authStore.onChange((auth, model) => {
    if (auth == "") {
      // @ts-ignore
      setUser(false);
    } else {
      // @ts-ignore
      setUser(model);
    }
  });

  // const authRefresh = async () => {
  //   await pb.collection("users").authRefresh();
  // };

  useEffect(() => {
    if (pb.authStore.isValid) {
      // @ts-ignore
      setUser(pb.authStore.model);
    } else {
      // @ts-ignore
      setUser(false);
    }
  }, []);

  return (
    <UserContext.Provider
      // @ts-ignore
      value={user}
    >
      <UserLogoutContext.Provider value={logout}>
        {children}
      </UserLogoutContext.Provider>
    </UserContext.Provider>
  );
}
