import "./App.css";
import React from "react";
import "./database.js";

import Formulario from "./components/Formulario";
import Tabla from "./components/Tabla";
import { Divider } from "@mui/material";

function App() {
  const [form, setForm] = React.useState({
    titulo: "",
    descripcion: "",
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>CRUD-CON-REACT</h1>
      <Formulario form={form} setForm={setForm} />
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Tabla form={form} setForm={setForm} />
    </>
  );
}

export default App;
