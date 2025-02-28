import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "*Alerta!",
        text: "Debes llenar todos los datos del formulario.",
        icon: "warning",
      });
      return;
    }

    login(email, password);
  };

  const login = (email, password) => {
    axios
      .post("http://localhost:8000/api/v1/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        Swal.fire({
          title: "Bienvenido!",
          text: "Has iniciado sesión",
          icon: "success",
        });
        navigate("/inventario");
      })
      .catch((error) => {
        console.error("Ocurrió un error.", error);
        Swal.fire({
          title: "Error de sesión",
          text: "Verifica tus credenciales",
          icon: "error",
        });
      });
  };

  return (
    <section>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <h2 className="fw-normal my-3 me-3">¡Bienvenido!</h2>
              </div>

              <div className="divider d-flex align-items-start my-4">
                <p className="text-center fw-bold mx-3 mb-0">
                  Ingresa tus credenciales
                </p>
              </div>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label ">Correo:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Type here.."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label">Contraseña: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Type here..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
