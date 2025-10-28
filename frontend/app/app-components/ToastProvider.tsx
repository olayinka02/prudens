"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
      toastStyle={{
        fontSize: "0.8rem",
    lineHeight: "1.4",
        backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
        color: theme === "dark" ? "#f1f5f9" : "#0f172a",
        borderRadius: "10px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    />
  );
}
