import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import IconEdit from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { db } from "../database";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const Tabla = (props) => {
  const { form, setForm } = props;
  useEffect(() => {
    getTareas();
  }, []);

  useEffect(() => {
    form.upgrade && getTareas();
  }, [form]);

  const [rows, setRows] = useState([]);

  const getTareas = async () => {
    await onSnapshot(collection(db, "tareas"), (query) => {
      const tareas = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRows(tareas.sort((a, b) => a.titulo - b.titulo));
    });
  };

  const editarTarea = async (row) => {
    try {
      setForm({ ...row, update: true });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await deleteDoc(doc(db, "tareas", id));
      Swal.fire({
        title: "Tarea eliminada",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Tabla</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={6}
          sx={{ marginTop: "2rem", textAlign: "center", width: "50%" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Título</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.titulo}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.descripcion}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => editarTarea(row)}>
                          <IconEdit />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => eliminarTarea(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell component="th" scope="row">
                    No hay tareas
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tabla;
