<template>
  <v-container style="margin: 1rem; padding: 3rem; margin-left: 2rem">
    <h1 style="text-align: center; margin: 1.5rem">
      Registro de tipos de productos
    </h1>

    <v-card style="margin-top: 1.5rem">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Tipo</th>
            <th class="text-left">Descripción</th>
            <th class="text-left">Estatus</th>
            <th class="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tipo, index) in tipos" :key="index">
            <td>{{ tipo.tipo }}</td>
            <td>{{ tipo.descripcion }}</td>
            <td>{{ tipo.estatus }}</td>
            <div
              class="text-center"
              style="justify-content: center; padding-top: 0.5rem"
            >
              <v-btn color="error"> Eliminar </v-btn>
            </div>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tipos: [],
    };
  },
  methods: {
    getobtenerListaTipos() {
      axios
        .get("http://localhost:4000/lista-tipos")
        .then((res) => {
          this.tipos = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  created() {
    this.getobtenerListaTipos();
  },
};
</script>
