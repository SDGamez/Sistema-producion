<template>
  <v-card variant="outlined"
    ><v-container>
      <v-alert
        v-if="MostrarAlerta"
        density="compact"
        type="error"
        icon="$error"
        title="Alerta"
        text="Cedula ya registrada"
      ></v-alert>
      <v-card-tittle>
        <h1 style="text-align: center; margin: 1.5rem">Registro Usuario</h1>
      </v-card-tittle>
      <form @submit.prevent="enviarNewUser" action="" method="post">
        <v-row class="mb-6" no-gutters>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                v-model="nombres"
                :rules="NARules"
                label="Nombres"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                v-model="apellidos"
                :rules="NARules"
                label="Apellidos"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-select
                v-model="RolesUsuarios"
                label="Roles"
                :items="Roles"
                item-title="RolesUsuario"
                item-value="id"
              ></v-select>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row class="mb-6" no-gutters>
          <v-col cols="2">
            <v-sheet class="pa-2 ma-2">
              <v-select
                v-model="CodArea"
                label="Codigo de area"
                :items="Codigos"
                item-title="codigo_area"
                item-value="id"
                disable
              ></v-select>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                v-model="numero"
                :rules="NroRules"
                :counter="7"
                label="Numero de telefono"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <VueDatePicker
                v-model="fecha_nacimiento"
                text-input
                locale="es"
                :enableTimePicker="false"
                placeholder="Fecha de nacimiento"
              />
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="2">
            <v-sheet class="pa-2 ma-2">
              <v-select
                v-model="tipoCedula"
                :items="CodigosCedula"
                label="Tipo de Cedula"
                disable
              ></v-select>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                v-model="cedula"
                :counter="7"
                :rules="NroRules"
                label="Cedula"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2"
              ><v-text-field
                v-model="correo"
                :rules="[rules.email]"
                label="Correo electronico"
              ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                rel="noopener noreferrer"
                target="_blank"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Ingrese contraseña"
                hint="Debe tener mas de 8 Caracteres"
                type="password"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-text-field
                rel="noopener noreferrer"
                target="_blank"
                v-model="repeatPass"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="Confirmacion"
                label="Confirme contraseña"
                hint="Debe Coincidir la contraseña"
                counter
                @click:append="show1 = !show1"
                type="password"
                rules="confirmed:@password"
              ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>

        <v-card-item>
          <v-btn class="me-4" type="submit" color="success" size="x-large">
            Crear Usuario
          </v-btn>

          <v-btn @click="handleReset" size="x-large" color="error">
            Borrar
          </v-btn>
        </v-card-item>
      </form>
    </v-container>
  </v-card>
</template>



<script setup>
function say(message) {
  alert(message)
}
</script>
<script>
import axios from "axios";
export default {
  data() {
    return {
      nombres: "",
      apellidos: "",
      cedula: "",
      tipoCedula: "",
      numero: "",
      fecha_nacimiento: "",
      password: "",
      repeatPass: "",
      correo: "",
      CodArea: "",
      RolesUsuarios: "",
      MostrarAlerta: false,
      show1: false,
      show2: true,
      Codigos: [],
      Roles: [],
      CodigosCedula: ["V", "E", "J"],
      NARules: [
        (value) => {
          if (value?.length > 2) return true;

          return "Debe tener mas de 2 caracteres";
        },
      ],
      NroRules: [
        (value) => {
          if (value?.length > 1 && /[0-9-]+/.test(value)) return true;

          return "Ingrese solo numeros";
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Minimo 8 Caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Ingrese un correo valido";
        },
      },
    };
  },
  methods: {
    getCodigo() {
      axios
        .get("http://localhost:4000/Codigo")
        .then((res) => {
          this.Codigos = res.data;
          console.log(this.Codigos);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getRoles() {
      axios
        .get("http://localhost:4000/Roles")
        .then((res) => {
          this.Roles = res.data;
          console.log(this.Roles);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    enviarNewUser() {
      const usuario = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        cedula: this.cedula,
        tipoCedula: this.tipoCedula,
        numero: this.numero,
        fecha_nacimiento: this.fecha_nacimiento,
        password: this.password,
        correo: this.correo,
        codigo_area: this.CodArea,
        RolesUsuario: this.RolesUsuarios,
      };
      console.log(usuario);
      axios
        .post("http://localhost:4000/RUsuario-Roles", usuario)
        .then((res) => {
          if (res.data=="Cedula ya Registrada"){
            this.MostrarAlerta = true
          }
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getCodigo();
    this.getRoles();
  },
};
</script>
