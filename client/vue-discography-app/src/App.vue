<template>
  <GlobalHeader />
  <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  -->
  <router-view/>
</template>

<script>
import GlobalHeader from './components/GlobalHeader.vue';

export default {
    setup() {
    },
    components: { GlobalHeader }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color : black;
  height: 100%;
}

body{
  margin: 0;
  height: 100%;
}

</style>
