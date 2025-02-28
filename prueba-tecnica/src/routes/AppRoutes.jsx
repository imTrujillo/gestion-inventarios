import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventario from "../pages/Inventario";
import Login from "../pages/session/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </BrowserRouter>
  );
}
