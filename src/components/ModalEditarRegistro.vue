<template>
  <div id="app">
    <transition name="fade">
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>

    <transition name="fade">
        <div class="modal-overlay" v-if="showModal">
          <h1>Titulo</h1>
          <p>contenido</p>
          <button @click="showModal = false "> Cerrar </button>
        </div>
    </transition>


    <button @click="showModal = true "> Abrir </button>
  </div>
</template>

<script>
</script>


<style>
</style>