<template>
  <h1 style="text-align: center; margin: 1.5rem">Registro de productos</h1>
  <v-container style="margin: 1rem; padding: 3rem; margin-left: 2rem">
    <form @submit.prevent="enviarNuevoProducto" action="" method="post">
      <v-text-field
        v-model="nuevoProducto.nombreProducto"
        label="Nombre Producto"
      ></v-text-field>

      <v-text-field
        v-model="nuevoProducto.tiempoProduccion"
        label="Tiempo de Produccion"
      ></v-text-field>

      <v-text-field
        v-model="nuevoProducto.descripcion"
        label="Descripción"
      ></v-text-field>

      <v-text-field
        v-model="nuevoProducto.PrecioPetros"
        :rules="precio"
        onkeyup="this.value=this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')"
        label="Precio en Petros"
      ></v-text-field>

      <v-select
        v-model="nuevoProducto.subdireccion"
        :items="Subdirecciones"
        item-title="subdireccion"
        item-value="id"
        label="Subdireccion"
        @update:modelValue="obtenerlistadeCategoria(nuevoProducto.subdireccion)"
      ></v-select>

      <v-select
        v-model="nuevoProducto.categoria"
        :items="Categorias"
        item-title="NameCategoria"
        item-value="id"
        label="Categoria"
        @update:modelValue="obtenerlistadeTipos(nuevoProducto.categoria)"
      ></v-select>

      <v-select
        v-model="nuevoProducto.tipo_producto_id"
        :items="tipos"
        item-title="tipo"
        item-value="id"
        label="Tipo de productos"
      ></v-select>

      <v-col cols="md-12">
        <v-btn size="x-large" class="me-4" type="submit" color="success" 
          >Registrar Producto</v-btn>
      </v-col>
    </form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nuevoProducto: {
        nombreProducto: "",
        tiempoProduccion: "",
        descripcion: "",
        PrecioPetros: "",
        tipo_producto_id: "",
      },
      Subdirecciones: [],
      Categorias: [],
      tipos: [],
   /*    precio: [
        value => {
          if (value?.length > 1 && /[0-9-]+/.test(value)) return true
        return 'Ingrese solo numeros'
        },
      ] */
    };
  },
  created() {
    this.obtenerlistaSubdireccion();
  },
  methods: {
    enviarNuevoProducto() {
      axios
        .post("http://localhost:4000/nuevo-producto", this.nuevoProducto)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    obtenerlistadeTipos(id) {
      axios
        .get("http://localhost:4000/lista-tipos/" + id)
        .then((res) => {
          this.tipos = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    obtenerlistadeCategoria(id) {
      axios
        .get("http://localhost:4000/lista-categorias/" + id)
        .then((res) => {
          this.Categorias = res.data;
          console.log(this.Categorias);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    obtenerlistaSubdireccion() {
      axios
        .get("http://localhost:4000/lista-subdirecciones")
        .then((res) => {
          this.Subdirecciones = res.data;
          console.log(this.Subdirecciones);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
