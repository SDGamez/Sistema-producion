<template>
  <v-container>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          v-model="firstName"
          label="First name"
          :rules="firstNameRules"
        ></v-text-field>

        <v-text-field
          v-model="lastName"
          label="Last name"
          :rules="lastNameRules"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstName: "",
      firstNameRules: [
        (value) => {
          if (value?.length > 3) return true;

          return "el nombre debe contener 3 caracteres.";
        },
      ],
      lastName: "123",
      lastNameRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;

          return "El apellido no puede contener numeros.";
        },
      ],
    };
  },
  methods: {
    login() {
      const data = {
        nombre: this.firstName,
        apellido: this.lastName,
      };
      axios
        .post("http://localhost:4000/login", data)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(`nombre: ${this.firstName} apellido: ${this.lastName}`);
    },
  },
};
</script>
