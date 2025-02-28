import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import ListProducts from "../components/ListProducts";
import Navbar from "../routes/Navbar";

export default function Inventario() {
  const [usuario, SetUsuario] = useState(null);
  const [listProducts, setListProducts] = useState([]);

  return (
    <div>
      <div>
        <Navbar listProducts={listProducts} setListProducts={setListProducts} />
      </div>
      <div className="m-5"></div>
      <div className="row">
        <section className="mt-5 pt-5 col-12 col-md-6 col-lg-4">
          <h1>Gestión de inventario</h1>
          <Form
            key={listProducts.length}
            listProducts={listProducts}
            setListProducts={setListProducts}
          />
        </section>
        <section className="my-5 col-12 col-md-6 col-lg-8">
          <ListProducts
            key={listProducts.length}
            listProducts={listProducts}
            setListProducts={setListProducts}
          />
        </section>
      </div>
    </div>
  );
}
