<template>
  <nav>
    <div class="nav_wrap">
    <router-link to="/">HomeView </router-link>
    <router-link to="/67256">키패드 문제 lv.1 </router-link>
    <router-link to="/about">About</router-link>
    </div>
  </nav>
    <hr>
  <router-view />
  <tLoading />
</template>

<script lang="ts" setup>
import { getCurrentInstance, provide } from "vue"
import tLoading from "@/components/template/loading.vue"
import { useStore } from 'vuex';
const store= useStore()
  const app = getCurrentInstance().appContext.config.globalProperties
  provide('route', app.$route)
  provide('store', app.$store)
 store.commit('startLoading')
 setTimeout(()=>{
    store.commit('endLoading')
 },1000)
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #2c3e50;
}

nav {
  overflow: hidden;
  padding: 30px;
  background: #2d3747;
  a {
    color: #fff;
  }
  .nav_wrap{
    display: flex;
    gap: 10px;
    height: 100%;
  }
}


nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
  transition: all 0.5s;
}
</style>
