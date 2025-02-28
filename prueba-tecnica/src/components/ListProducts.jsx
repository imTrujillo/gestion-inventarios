import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Products from "./Products";
import Swal from "sweetalert2";

export default function ListProducts({ setListProducts, listProducts }) {
  const [loading, setLoading] = useState(true);

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
    setEstado(e.target.value);
  };
  const handleMovimiento = (e) => {
    setMovimiento(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/productos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setListProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, [setListProducts]);

  const borrarProducto = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const actualizarProductos = listProducts.filter(
          (producto) => producto.id !== id
        );
        setListProducts(actualizarProductos);

        Swal.fire({
          title: "!Operación exitosa!",
          text: "Se borró el producto",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "¡Ocurrió un problema!",
          text: "Error al borrar el producto",
          icon: "error",
        });
      });
  };

  if (loading) {
    return <div className="fw-light text-success">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-danger">Lista de productos</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {listProducts.length > 0 ? (
          listProducts.map((producto) => {
            return (
              <Products
                key={producto.id}
                propNombre={producto.nombre}
                propDescripcion={producto.descripcion}
                propPrecio={producto.precio}
                propCantidadInicial={producto.cantidadInicial}
                propEstado={producto.estado}
                propMovimiento={producto.movimiento}
                borrarProducto={borrarProducto}
                propIdproducto={producto.id}
                setListProducts={setListProducts}
                listProducts={listProducts}
              />
            );
          })
        ) : (
          <div>Aquí aparecerán los registros</div>
        )}
      </div>
    </div>
  );
}
