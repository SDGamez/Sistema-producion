<template>
    <h1 style="text-align:center; margin: 1.5rem;">
        Registro de empresa
    </h1>
    <v-container style="margin: 1rem; padding: 3rem; margin-left: 2rem;">
    <form @submit.prevent="enviarNuevoRegistro">
      <v-select
        v-model="nuevaEmpresa.TipoRif"
        :items="CodigosRif"
        label="Tipo de Rif"
      ></v-select>

      <v-text-field
        v-model="nuevaEmpresa.Rif"
        :counter="7"
        :rules="RifRules"
        onkeyup="this.value = this.value.replace(/[^0-9]/g,'')"
        label="RIF"
      ></v-text-field>

      <v-text-field
        v-model="nuevaEmpresa.RazonSocial"
        :counter="10"
        :rules="EmpresaRules"
        label="Nombre de empresa"
      ></v-text-field>
  
      <v-text-field
        v-model="nuevaEmpresa.Correo"
        :rules="emailRules"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="nuevaEmpresa.Convenio"
        label="Convenio"
      ></v-text-field>


      <v-select
        v-model="nuevaEmpresa.Estado"
        :items="Estados"
        label="Estado"
      ></v-select>

      <v-text-field
        v-model="nuevaEmpresa.Ciudad"
        label="Ciudad"
      ></v-text-field>

      <v-text-field
        v-model="nuevaEmpresa.direccion"
        label="Direccion"
      ></v-text-field>
  
      <v-col cols="center">
        <v-btn size="x-large"  class="me-4"
        type="submit" color="success">Registrar Empresa</v-btn>
      </v-col>
    </form> 
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      nuevaEmpresa: {
        RazonSocial: "",
        TipoRif: "",
        Rif: "",
        Correo: "",
        Estado:"",
        Ciudad: "",
        direccion:"",
        Convenio: ""
      },
      CodigosRif: [
        "V", "J", "G"
      ], 
      Estados: [

      ], 


      EmpresaRules: [
        value => {
          if (value?.length > 3) return true

          return 'Debe tener mas de 3 caracteres el nombre de la empresa'
        },
      ],
/*       RifRules: [
        value => {

        if (value?.length > 1 && /[0-9-]+/.test(value)) return true

        return 'Ingrese solo numeros'
        },
      ], */
      emailRules: [
      value => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Debe ser un correo electronico valido'
        },
      ]

 };
  },
  methods: {
    enviarNuevoRegistro() {
        axios.post('http://localhost:4000/nuevo-registro', this.NuevoRegistro)
        .then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }
  }
};
</script>
