import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function Form({ setListProducts, listProducts }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidadInicial, setCantidadInicial] = useState(0);
  const [estado, setEstado] = useState(true);
  const [movimiento, setMovimiento] = useState(0);

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleDescripcion = (e) => {
    setDescripcion(e.target.value);
  };
  const handlePrecio = (e) => {
    setPrecio(e.target.value);
  };
  const handleCantidadInicial = (e) => {
    setCantidadInicial(e.target.value);
  };
  const handleEstado = (e) => {
    setEstado(e.target.value === "true");
  };
  const handleMovimiento = (e) => {
    setMovimiento(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !cantidadInicial ||
      !estado ||
      !movimiento
    ) {
      Swal.fire({
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos",
        icon: "warning",
      });
      return;
    }
    if (isNaN(precio) || isNaN(cantidadInicial) || isNaN(movimiento)) {
      Swal.fire({
        title: "Campos con valores incorrectos",
        text: "El precio, el movimiento y la cantidad deben ser valores numéricos",
        icon: "warning",
      });
      return;
    }
    const numPrecio = parseFloat(precio);
    const numCantidadInicial = parseInt(cantidadInicial, 10);
    const numMovimiento = parseInt(movimiento, 10);
    const numCantidadTotal = numCantidadInicial + numMovimiento;

    const nuevoProducto = {
      id: uuidv4(),
      nombre: nombre,
      descripcion: descripcion,
      precio: numPrecio,
      cantidadInicial: numCantidadInicial,
      estado: estado,
      movimiento: numMovimiento,
      cantidadTotal: numCantidadTotal,
    };

    axios
      .post("http://localhost:8000/api/v1/productos", nuevoProducto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setListProducts([...listProducts, response.data]);
        Swal.fire({
          title: "!Operación exitosa!",
          text: "Se añadió el producto",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "!Operación fallida!",
          text: "Error al añadir el producto",
          icon: "error",
        });
        console.error("Error al añadir el producto:", error);
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="text-start">
        {/* Primera fila de columnas */}
        <div className="row mb-4">
          <div className="col">
            <label className="form-label" htmlFor="form6Example1">
              Nombre del producto
            </label>
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example1"
                className="form-control"
                placeholder="Type here..."
                onChange={(e) => handleNombre(e)}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example2">
                Descripción del producto
              </label>
              <input
                type="text"
                id="form6Example2"
                className="form-control"
                placeholder="Type here..."
                onChange={(e) => handleDescripcion(e)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div data-mdb-input-init className="form-outline mb-4 col">
            <label className="form-label" htmlFor="form6Example3">
              Precio del producto
            </label>
            <input
              type="text"
              id="form6Example3"
              className="form-control"
              placeholder="Type here..."
              onChange={(e) => handlePrecio(e)}
            />
          </div>
          <div className="form-outline mb-4 col">
            <label className="form-label" htmlFor="estado">
              Estado
            </label>
            <select
              className="form-control"
              name="estado"
              id="estado"
              onChange={(e) => handleEstado(e)}
            >
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div data-mdb-input-init className="form-outline mb-4 col">
            <label className="form-label" htmlFor="form6Example4">
              Cantidad Inicial
            </label>
            <input
              type="text"
              id="form6Example4"
              className="form-control"
              placeholder="Type here..."
              onChange={(e) => handleCantidadInicial(e)}
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4 col">
            <label className="form-label" htmlFor="form6Example5">
              Movimiento (entrada/salida)
            </label>
            <input
              type="text"
              id="form6Example5"
              className="form-control"
              placeholder="Type here..."
              onChange={(e) => handleMovimiento(e)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Guardar
        </button>
      </form>
    </div>
  );
}
