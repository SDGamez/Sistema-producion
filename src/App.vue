<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar color="primary" prominent>
      <v-toolbar-title>Sistema de Produccion</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-home" to="/"></v-btn>
      <v-btn variant="text" icon="mdi-login" to="/login"></v-btn>

      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Registrar Producto"
          to="/nuevo-producto"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-factory"
          title="Registrar Empresa"
          value="shared"
          to="/registrar-empresa"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-star"
          title="Starred"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
//
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      axios
        .get("http://localhost:4000")
        .then((res) => {
          console.log(res);
          this.message = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
