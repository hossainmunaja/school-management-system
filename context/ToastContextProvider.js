import React, { useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = React.createContext({});

export function useToast() {
  return useContext(ToastContext);
}

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export function ToastContextProvider({ children }) {
  const notify = (message, type) => {
    if (type === "error") {
      // @ts-ignore
      toast.error(message, toastStyle);
    }
    if (type === "default") {
      // @ts-ignore
      toast(message, toastStyle);
    }
  };

  return (
    <ToastContext.Provider value={notify}>{children}</ToastContext.Provider>
  );
}
