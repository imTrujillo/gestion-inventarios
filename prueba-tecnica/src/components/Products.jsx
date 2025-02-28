import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Products({
  propNombre,
  propDescripcion,
  propPrecio,
  propCantidadInicial,
  propEstado,
  propMovimiento,
  borrarProducto,
  propIdproducto,
  setListProducts,
  listProducts,
}) {
  const [modal, setModal] = useState(false);

  const [nombre, setNombre] = useState(propNombre);
  const [descripcion, setDescripcion] = useState(propDescripcion);
  const [precio, setPrecio] = useState(propPrecio);
  const [cantidadInicial, setCantidadInicial] = useState(propCantidadInicial);
  const [estado, setEstado] = useState(propEstado);
  const [movimiento, setMovimiento] = useState(propMovimiento);

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

  const editarProducto = (id) => {
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

    const productoActualizado = {
      id,
      nombre,
      descripcion,
      precio: numPrecio,
      cantidadInicial: numCantidadInicial,
      estado: estado,
      movimiento: numMovimiento,
      cantidadTotal: numCantidadTotal,
    };

    axios
      .patch(
        `http://localhost:8000/api/v1/productos/${id}`,
        productoActualizado,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const actualizarProductos = listProducts.map((producto) =>
          producto.id === id ? response.data : producto
        );
        setListProducts(actualizarProductos);
        Swal.fire({
          title: "!Operación exitosa!",
          text: "Se actualizó el producto",
          icon: "success",
        });
        setModal(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "!Operación fallida!",
          text: "Error al actualizar el producto",
          icon: "error",
        });
        console.error("Error al actualizar el producto:", error.response?.data);
      });
  };

  return (
    <div>
      <div className="card text-bg-light mb-3" style={{ maxWidth: "30rem" }}>
        <h5 className="card-header">Nombre: {propNombre}</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-6">
              <p className="card-text">
                <strong>Descripción: </strong> {propDescripcion}
              </p>
              <p className="card-text">
                <strong>Precio: $</strong> {propPrecio}
              </p>
              <p className="card-text">
                <strong>Estado: </strong>
                {propEstado === true ? "Disponible" : "No disponible"}
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning"
                  onClick={() => setModal(true)}
                >
                  Editar
                </button>
                <button
                  onClick={() => borrarProducto(propIdproducto)}
                  className="btn btn-danger"
                >
                  Borrar
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <p className="card-text">
                <strong>Cantidad Inicial:</strong> {propCantidadInicial}{" "}
                unidades
              </p>

              <p className="card-text">
                <strong>(Entrada/Salida):</strong> {propMovimiento} unidades
              </p>
              <p className="card-text">
                <strong>Cantidad Total:</strong>{" "}
                {propCantidadInicial + propMovimiento} unidades
              </p>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">
                  Editar producto "{propNombre}"
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModal(false)}
                />
              </div>
              <form
                className="p-4 text-start"
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  editarProducto(propIdproducto);
                }}
              >
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Nombre del producto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={nombre}
                        onChange={(e) => handleNombre(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">
                        Descripción del producto
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={descripcion}
                        onChange={(e) => handleDescripcion(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Precio del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                    value={precio}
                    onChange={(e) => handlePrecio(e)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Cantidad Inicial</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                    value={cantidadInicial}
                    onChange={(e) => handleCantidadInicial(e)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Estado</label>

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

                <div className="form-outline mb-4">
                  <label className="form-label">Movimiento (cantidad)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                    value={movimiento}
                    onChange={(e) => handleMovimiento(e)}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModal(false)}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
