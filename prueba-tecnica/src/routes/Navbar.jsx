import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setListProducts, listProducts }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("ninguno");
  const [valorFiltro, setValorFiltro] = useState("");

  const handleFiltro = (e) => {
    setTipoFiltro(e.target.value);
  };
  const handleValorFiltro = (e) => {
    setValorFiltro(e.target.value);
  };

  const buscarProducto = (e) => {
    e.preventDefault();

    let url = `http://localhost:8000/api/v1/productos/${searchInput}`;
    if (tipoFiltro !== "ninguno" && valorFiltro) {
      url += `?${tipoFiltro}=${valorFiltro}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setListProducts(response.data);

        Swal.fire({
          title: "Bien hecho",
          text: "Filtro aplicado",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error al buscar el producto:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al buscar el producto",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    console.log("Lista de productos actualizada", listProducts);
  }, [listProducts]);

  const logout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Inicie sesión nuevamente",
        icon: "error",
      });
      navigate("/");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Sesión Cerrada",
          text: "Has cerrado sesión",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesion", error);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Gestión de Inventarios
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-collapse-init
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <form
                  className="form-inline my-2 my-lg-0"
                  onSubmit={buscarProducto}
                >
                  <div className="d-flex flex-row gap-3">
                    <input
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <p>Filtrar por:</p>
                    <input
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="Menor que..."
                      aria-label="Search"
                      value={valorFiltro}
                      onChange={handleValorFiltro}
                    />
                    <select
                      name="filtrar"
                      id="filtro"
                      value={tipoFiltro}
                      onChange={handleFiltro}
                    >
                      <option value="ninguno">Seleccionar</option>
                      <option value="cantidad"> Cantidad</option>
                      <option value="precio">Precio</option>
                    </select>
                    <button
                      className="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </li>
              <li className="nav-item ms-3">
                <button
                  className="btn btn-danger p-3 rounded-5"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
