<template>
  <h1 style="text-align: center; margin: 1.5rem">Registro Usuario</h1>
  <v-container>
    <form @submit.prevent="enviarNuevaPersona">
      <v-row class="mb-6" no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.nombres"
              :rules="NARules"
              label="Nombres"
            ></v-text-field
          ></v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.apellidos"
              :rules="NARules"
              label="Apellidos"
            ></v-text-field>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.correo"
              :rules="emailRules"
              label="Correo"
            ></v-text-field
          ></v-sheet>
        </v-col>
      </v-row>

      <v-row justify="space-around" class="pa-30 ma-30">
        <v-date-picker color="primary"></v-date-picker
      ></v-row>

      <v-row no-gutters>
        <v-col cols="2">
          <v-sheet class="pa-2 ma-2">
            <v-select
              v-model="NuevaPersona.tipoCedula"
              :items="CodigosCedula"
              label="Cedula de identidad"
            ></v-select>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.cedula"
              :counter="7"
              :rules="CedulaRules"
              label="Cedula"
            ></v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.numero"
              :counter="7"
              :rules="CedulaRules"
              label="Numero de telefono"
            >
            </v-text-field>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <VueDatePicker
              v-model="NuevaPersona.fecha_nacimiento"
              text-input
              locale="es"
              :enableTimePicker="false"
              :maxDate="minDate"
              placeholder="Seleccione la Fecha"
            />
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.password"
              label="Contraseña"
              @keyup="checkPass"
              type="password"
              class="form-field"
            >
            </v-text-field>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="NuevaPersona.password"
              label="Confrime Contraseña"
              @keyup="checkPass"
              type="password"
              class="form-field"
            >
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>


      <v-col cols="center">
        <v-btn size="x-large" class="me-4" type="submit" color="success"
          >Crear Usuario</v-btn
        >
      </v-col>
    </form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value) {
      if (value?.length > 7 && /[0-9-]+/.test(value)) return true;

      return "El numero de telefono debe tener 7 digitos";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    select(value) {
      if (value) return true;

      return "Select an item.";
    },
    checkbox(value) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
<script>
import axios from "axios";
export default {
  data() {
    return {
      NuevaPersona: {
        nombres: "",
        apellidos: "",
        correo: "",
        cedula: "",
        tipoCedula: "",
        fecha_nacimiento: "",
        password: "",
        fecha_registro: "",
        fecha_modificacion: "",
        password_tmp: "",
        recovery_time: "",
      },
      CodigosCedula: ["V", "E", "J"],
      passwordRules: {
        numero: false,
        capLetter: false,
        letter: false,
        lengthEight: false,
        symbols: false,
        equal: false,
      },
      NARules: [
        (value) => {
          if (value?.length > 3) return true;

          return "Debe tener mas de 3 caracteres el nombre de la empresa";
        },
      ],
      CedulaRules: [
        (value) => {
          if (value?.length > 1 && /[0-9-]+/.test(value)) return true;

          return "Ingrese solo numeros";
        },
      ],
      emailRules: [
        (value) => {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Debe ser un correo electronico valido";
        },
      ],
    };
  },
  methods: {
    enviarNuevaPersona() {
      axios
        .post("http://localhost:4000/registro-personas", this.NuevaPersona)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkPass() {
      const err = RegisterValidator.validatePass(
        this.newUser,
        this.passSecurity
      ); // Validacion con RegEx de la contraseña
      this.passSecurity = err;
    },
  },
};
</script>
