<template>
  <div class="container-fluid">
    <h1 style="text-align: center; margin: 1.5rem"></h1>
    <v-container>
      <div class="lista-compra" @submit.prevent="enviarOrden">
        <h2>Orden de compra:</h2>
        <br />
        <v-row>
          <v-col
            :cols="6"
            v-for="(item, index) in listaCompra"
            :key="index"
            cols="12"
          >
            <div class="producto-info">
              <div class="producto-nombre">{{ item.producto.nombre }}</div>
              <div class="producto-datos">
                <span>Cantidad: {{ item.cantidad }}</span>
                <span>Valor unidad: {{ item.producto.PrecioPetros }}</span>
                <span>Valor total: {{ item.valorTotal }}</span>
                <v-btn @click="eliminarDeListaCompra(index)" color="error">
                  Eliminar
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row
          ><v-col cols="3">
            <h2>
              <strong>Total productos: {{ totalProductos }}</strong>
            </h2> </v-col
          ><v-col cols="6">
            <h2>
              <strong>Valor total orden: {{ valorTotalOrden }}</strong>
            </h2></v-col
          >
          <v-col cols="3">
            <v-btn @click="enviarOrden" color="primary">Enviar Orden</v-btn>
          </v-col></v-row
        >
      </div>
    </v-container>
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
        Limpiar búsqueda
      </v-btn>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Tiempo de Producción</th>
            <th class="text-left">Tipo Producto</th>
            <th class="text-left">Precio(Petro)</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="productos.length > 0">
          <tr v-for="(producto, index) in productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.tiempo_de_produccion }}</td>
            <td>{{ producto.tp.tipo }}</td>
            <td>{{ producto.PrecioPetros }}</td>
            <td>
              <v-btn color="primary" @click="agregarAListaCompra(producto)">
                Añadir a la lista de compra
              </v-btn>
            </td>
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
      Usuario: [],
      reset: false,
      productos: [
      ],
      listaCompra: [

      ],
    };
  },
  computed: {
    totalProductos() {
      return this.listaCompra.length;
    },
    valorTotalOrden() {
      return this.listaCompra.reduce((total, item) => {
        return total + item.valorTotal;
      }, 0);
    },
  },
  methods: {
    cambiarEstado(producto) {
      producto.estatus = !producto.estatus;    },
    enviarOrden() {
      axios
        .post("http://localhost:4000/orden", this.listaCompra)
        .then((response) => {
          // Realizar acciones adicionales después de enviar la orden
          console.log("Orden enviada correctamente");
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al enviar la orden:", error);
        });
    },
    agregarAListaCompra(producto) {
      const itemEnLista = this.listaCompra.find(
        (item) => item.producto.nombre === producto.nombre
      );

      if (itemEnLista) {
        itemEnLista.cantidad++;
        itemEnLista.valorTotal = itemEnLista.cantidad * producto.PrecioPetros;
      } else {
        this.listaCompra.push({
          producto,
          cantidad: 1,
          valorTotal: producto.PrecioPetros,
        });
      }

      console.log("Producto añadido a la lista de compra:", producto);
    },
    eliminarDeListaCompra(index) {
      this.listaCompra.splice(index, 1);
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

      this.getProductos();
    },
  },
  created() {
    this.getProductos();
  },
};
</script>

<style scoped>
.lista-compra {
  margin-top: 20px;
}

.producto-info {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
}

.producto-nombre {
  font-weight: bold;
  margin-bottom: 5px;
}

.producto-datos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
