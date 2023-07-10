<template>
  <h1 style="text-align: center; margin: 1.5rem">Lista de Usuarios</h1>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      @click:append="FiltrarNombreUsuario"
      label="Buscar"
      style="justify-content: left"
    ></v-text-field>
    <v-btn
      color="green"
      @click="Usuario"
      style="margin-top: 1.5rem; margin-bottom: 2.5rem"
    >
      Limpiar busquedad
    </v-btn>
    <v-form> </v-form>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Nombres</th>
          <th class="text-left">Apellidos</th>
          <th class="text-left">Cedula</th>
          <th class="text-left">Codigo de Area</th>
          <th class="text-left">Telefono</th>
          <th class="text-left">Correo</th>
          <th class="text-left">Rol</th>
          <th class="text-left">Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="Usuario.length > 0"
          v-for="(Usuarios, index) in Usuario"
          :key="index"
        >
          <td>{{ Usuarios.nombres }}</td>
          <td>{{ Usuarios.apellidos }}</td>
          <td>{{ Usuarios.Cedula }}</td>
          <td>{{ Usuarios.codigos.codigo_area }}</td>
          <td>{{ Usuarios.numero }}</td>
          <td>{{ Usuarios.usuario.correo }}</td>
          <td>{{ Usuarios.usuario.RU.RolesUsuario }}</td>
          <td>
            <v-icon
              v-show="Usuarios.usuario.status == true"
              icon="mdi-thumb-up"
            ></v-icon>
            <v-icon
              v-show="Usuarios.usuario.status == false"
              icon="mdi-thumb-down"
            ></v-icon>
          </td>
          <td class="text-center" style="justify-content: center">
            <div>
              <v-btn
                color="error"
                style="content: center"
                @click="openModal(Usuarios)"
              >
                Editar
              </v-btn>
            </div>
          </td>
          <v-row class="xl" no-gutters v-if="showModal">
            <div class="modal">
              <div class="modal-content">
                <h2>Actualizar Datos</h2>
                <form @submit.prevent="updateData">
                  <v-row>
                    <v-col cols="">
                      <v-sheet class="6">
                        <v-text-field
                          v-model="formData.nombres"
                          id="name"
                          label="Nombres:"
                        ></v-text-field>
                      </v-sheet>
                    </v-col>
                    <v-col cols="">
                      <v-sheet class="6">
                        <v-text-field
                          v-model="formData.apellidos"
                          id="apellidos"
                          label="Apellidos:"
                        ></v-text-field>
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="">
                      <v-sheet class="1">
                        <v-select
                          v-model="formData.CodArea"
                          id="CodArea"
                          label="Codigo de Area"
                          :items="Codigos"
                          item-title="codigo_area"
                          item-value="id"
                        ></v-select>
                      </v-sheet>
                    </v-col>
                    <v-col cols="">
                      <v-sheet class="5">
                        <v-text-field
                          v-model="formData.numero"
                          id="telefono"
                          label="Telefono:"
                        ></v-text-field>
                      </v-sheet>
                    </v-col>
                    <v-col cols="">
                      <v-sheet class="6">
                        <v-text-field
                          v-model="formData.correo"
                          id="Email"
                          label="Correo:"
                        ></v-text-field>
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="">
                      <v-sheet class="6">
                        <v-select
                          v-model="formData.RolesUsuario"
                          label="Roles"
                          :items="Roles"
                          item-title="RolesUsuario"
                          item-value="id"
                        ></v-select>
                      </v-sheet>
                    </v-col>
                    <v-col cols="">
                      <v-sheet class="6">
                        <v-select
                          v-model="formData.Estatus"
                          label="Estatus"
                          :items="[{title:'Si', value: true},{title:'No', value: false}]"
                          item-title="title"
                          item-value="value"
                        ></v-select>
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <v-btn
                    type="submit"
                    color="success"
                    class="botones"
                    @click="updateData"
                    >Actualizar</v-btn
                  >
                  <v-btn @click="closeModal" color="" class="botones"
                    >Cerrar</v-btn
                  >
                </form>
              </div>
            </div>
          </v-row>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      search: "",
      Usuario: [],
      showModal: false,
      Roles: [],
      formData: {
        nombres: "",
        cedula: "",
        apellidos: "",
        numero: "",
        CodArea: "",
        RolesUsuario: "",
        status: "",
        correo: "",
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
    FiltrarNombreUsuario() {
      this.Usuario = this.Usuario.filter((el) => {
        if (el.nombres.toUpperCase().includes(this.search.toUpperCase())) {
          return true;
        }
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
    getUsuario() {
      axios
        .get("http://localhost:4000/Lista-Usuarios")
        .then((res) => {
          this.Usuario = res.data;
          console.log(this.Usuario);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openModal(Usuarios) {
      // Obtener datos de la base y asignarlos a formData
      this.formData.nombres = Usuarios.nombres;
      this.formData.apellidos = Usuarios.apellidos;
      this.formData.CodArea = Usuarios.cod_id;
      this.formData.numero = Usuarios.numero;
      this.formData.cedula = Usuarios.Cedula;
      this.formData.correo = Usuarios.usuario.correo;
      this.formData.RolesUsuario = Usuarios.usuario.id_Roles;
      this.formData.status = Usuarios.usuario.status;

      this.showModal = true;
    },

    updateData() {
      // Enviar los datos actualizados al servidor para actualizar la base de datos
      axios
        .post("http://localhost:4000/ActualizacionUsuarios", this.formData) // Reemplaza "ruta-de-actualizacion" con la URL adecuada
        .then((response) => {
          // Actualización exitosa
          console.log("Datos actualizados correctamente");
          // Aquí puedes agregar lógica adicional después de la actualización exitosa, si es necesario

          this.closeModal(); // Cerrar el modal después de actualizar los datos
        })
        .catch((error) => {
          // Error durante la actualización
          console.error("Error al actualizar los datos", error);
          // Aquí puedes manejar el error y mostrar mensajes de error adecuados al usuario
          // ...
        });
    },
    closeModal() {
      this.showModal = false; // Cerrar el modal estableciendo la variable showModal a false
    },
  },
  created() {
    this.getRoles();
    this.getUsuario();
    this.getCodigo();
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  width: 80%; /* Ajusta el ancho según tus necesidades */
  height: 80%; /* Ajusta la altura según tus necesidades */
}

.botones {
  width: 50%;
  justify-content: center;
  align-items: center;
}
</style>
