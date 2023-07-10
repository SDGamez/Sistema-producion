// Composables
import { createRouter, createWebHistory } from 'vue-router'
import helloWorld from '../components/HelloWorld.vue'
import login from '../views/Login.vue'
import nuevoProd from '../views/RegistrarProducto.vue'
import listaProd from '../views/ListaProductos.vue'
import registrarEmpresa from '../views/RegistrarEmpresa.vue'
import nuevoTipo from '../views/RegistroTipoProducto.vue'
import listatipos from "../views/ListadeTiposProductos.vue"
import registroPersonas from "../views/RegistroPersona.vue"
import NewArchivo from "../views/ArchivoPersonaNuevo.vue"
import RolesRegistro from "../views/usuarioroles.vue"
import ListaUsuarios from "../views/UsuariosInternos.vue"
import Compras from '../views/VentanadeCompra.vue'

const routes = [
  {
    path: '/',
    component: helloWorld
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/nuevo-producto',
    component: nuevoProd
  },
  {
    path: '/lista-productos',
    component: listaProd
  },
  {
    path: '/registrar-empresa',
    component: registrarEmpresa
  },
  {
    path: '/nuevo-tipo',
    component: nuevoTipo
  },
  {
    path: '/lista-tipos',
    component: listatipos
  },
  {
    path: '/registro-personas',
    component: registroPersonas
  },
  {
    path: "/Registro-Usuarios",
    component: NewArchivo
  },
  {
    path: "/RUsuario-Roles",
    component: RolesRegistro
  },
  {
    path: "/Lista-Usuarios",
    component: ListaUsuarios
  },
  {
    path: '/Orden',
    component: Compras
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
