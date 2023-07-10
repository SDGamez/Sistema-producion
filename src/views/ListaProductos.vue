<template>
  <div class="container-fluid">
    <h1 style="text-align: center; margin: 1.5rem">Lista de productos</h1>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        @click:append="FiltrarNombreDeProducto"
        label="Buscar"
        style="justify-content: left"
        @keyup.enter="FiltrarNombreDeProducto"
      ></v-text-field>
      <v-btn
        color="green"
        @click="resetPage(this)"
        style="margin-top: 1.5rem; margin-bottom: 2.5rem"
      >
        Limpiar busquedad
      </v-btn>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Tiempo de Produccion</th>
            <th class="text-left">Tipo Producto</th>
            <th class="text-left">Descripción</th>
            <th class="text-left">Precio(Petro)</th>
            <th class="text-left">Estatus</th>
            <!-- <th class="text-center">Eliminar</th> -->
          </tr>
        </thead>
        <tbody v-if="productos.length > 0">
          <tr v-for="(producto, index) in productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.tiempo_de_produccion }}</td>
            <td>{{ producto.tp.tipo }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.PrecioPetros }}</td>
            <td>
              <v-icon
                v-show="producto.estatus == true"
                icon="mdi-thumb-up"
              ></v-icon>
              <v-icon
                v-show="producto.estatus == false"
                icon="mdi-thumb-down"
              ></v-icon>
            </td>
            <td class="text-center" style="justify-content: center">
              <div>
                <v-btn
                  color="error"
                  style="content: center"
                  @click="openModal(producto)"
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
                            :items="[
                              { title: 'Si', value: true },
                              { title: 'No', value: false },
                            ]"
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

            <!-- <v-btn @click="cambiarEstado(producto)">
              {{ producto.estatus ? 'Desactivar' : 'Activar' }}
            </v-btn> -->
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      reset: false,
      productos: [
        {
          tp: {},
        },
      ],
    };
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      if (!this.reset) {
        // Aplicar filtros según los valores seleccionados y la búsqueda
        // ...
      }

      return filtered;
    },
  },
  methods: {
    openModal(producto) {
      // Obtener datos de la base y asignarlos a formData
      this.formData.nombres = producto.nombres;
      this.formData.apellidos = producto.apellidos;
      this.formData.CodArea = producto.cod_id;
      this.formData.numero = producto.numero;
      this.formData.cedula = producto.Cedula;
      this.formData.correo = producto.usuario.correo;
      this.formData.RolesUsuario = producto.usuario.id_Roles;
      this.formData.status = producto.usuario.status;

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
    cambiarEstado(producto) {
      // Lógica para cambiar el estado del producto
      producto.estatus = !producto.estatus;
      // Realizar la llamada al backend para guardar los cambios en la base de datos
    },
    FiltrarNombreDeProducto() {
      this.productos = this.productos.filter((el) => {
        const nombreCoincide = el.nombre
          .toUpperCase()
          .includes(this.search.toUpperCase());
        const tipoCoincide = el.tp.tipo
          .toUpperCase()
          .includes(this.search.toUpperCase());
        return nombreCoincide || tipoCoincide;
      });
    },
    getProductos() {
      axios
        .get("http://localhost:4000/productos")
        .then((res) => {
          this.productos = res.data;
          console.log(this.productos);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetPage() {
      this.reset = true;
      this.search = "";

      // Restablecer la lista de productos al valor original
      this.getProductos();
    },
  },
  created() {
    this.getProductos();
  },
};
</script>
