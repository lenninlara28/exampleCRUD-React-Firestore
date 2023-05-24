import React from "react";

import { Button, Grid, TextField } from "@mui/material";
import { db } from "../database";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Formulario = (props) => {
  const { form, setForm } = props;

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (form?.update) {
        const docRef = doc(db, "tareas", form.id);
        await updateDoc(docRef, {
          titulo: form.titulo,
          descripcion: form.descripcion,
        });
        Swal.fire({
          title: "Tarea actualizada",
        }).then(() => {
          setForm({
            titulo: "",
            descripcion: "",
            upgrade: true,
          });
        });
      } else {
        await addDoc(collection(db, "tareas"), form);
        Swal.fire({
          title: "Tarea creada",
        }).then(() => {
          setForm({
            titulo: "",
            descripcion: "",
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              required
              name="titulo"
              label="Titulo de tarea"
              variant="outlined"
              placeholder="Ingrese el titulo de la tarea"
              sx={stylesFormulario.textField}
              onChange={handleInput}
              value={form.titulo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="descripcion"
              label="Descripcion de tarea"
              sx={stylesFormulario.textField}
              multiline
              maxRows={4}
              onChange={handleInput}
              value={form.descripcion}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              sx={stylesFormulario.button}
              variant="outlined"
            >
              {form?.update ? "Actualizar" : "Crear"}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={() =>
                setForm({
                  titulo: "",
                  descripcion: "",
                })
              }
              sx={stylesFormulario.button}
              variant="outlined"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const stylesFormulario = {
  textField: {
    backgroundColor: "#fff",
    border: "1px",
    width: "30%",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
};

export default Formulario;
