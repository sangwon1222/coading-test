<template>
  <div v-if="state.loadingStatus" class="loading-wrap">
  <div class="bg" />
    <div
      wire:loading
      class="loader-wrap"
    >
      <div
        class="loader "
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex';

const store= useStore()
const state = reactive({
  loadingStatus: computed(() => store.getters['loadingStatus']),
})


</script>

<style lang="scss" scoped>
.loading-wrap {
  width: 100vw; 
  height: 100vh;
  position: fixed;
  top: 0;
  left:0;
}
.bg{
  width: 100vw; 
  height: 100vh;
  position: fixed;
  top: 0;
  left:0;
  background: #000;
  opacity: 0.20
}
.loader-wrap{
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top:0;
  left:0;
  right: 0;
  bottom:0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  background-color: rgb(55 65 81);
  opacity: 0.75;
}
.loader {
  transition-timing-function: linear;
  border-radius: 9999px;
  border: 4px #fff solid;
  border-top-color: #3498db;
  width: 100px;
  height: 100px;
  margin-bottom: 4px;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
