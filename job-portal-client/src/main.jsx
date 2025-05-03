
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router";
import './index.css'
import Router from "./Router/Router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={Router}></RouterProvider>
  </AuthProvider>
);
