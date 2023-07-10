<template>
  <v-container style="margin: 1rem; padding: 3rem; margin-left: 2rem">
    <h1 style="text-align: center; margin: 1.5rem">
      Registro de tipos de productos
    </h1>
    <form @submit.prevent="enviarNuevoTipoProducto">
      <v-text-field
        v-model="nuevoTipoProducto.nombreTipo"
        label="Nombre del tipo o grupo"
      ></v-text-field>

      <v-text-field
        v-model="nuevoTipoProducto.descripcion"
        label="Descripción"
      ></v-text-field>

      <v-col cols="center">
        <v-btn size="x-large" class="me-4" type="" color="success">Registrar Tipo Producto</v-btn>
      </v-col>
    </form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nuevoTipoProducto: {
        Tipo: "",
        descripcion: "",
        Estatus: "",
      },
    };
  },
  created() {
    this.obtenerListaTipos()
  },
  methods: {
    enviarNuevoTipoProducto() {
      axios
        .post(
          "http://localhost:4000/nuevo-tipo-producto",
          this.nuevoTipoProducto
        )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }
}
</script>
