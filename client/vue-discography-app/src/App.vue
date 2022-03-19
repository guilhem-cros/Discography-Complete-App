<template>
  <GlobalHeader />
  <router-view/>
</template>

<script>
import GlobalHeader from './components/GlobalHeader.vue';


export default {
    components: { GlobalHeader, }
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
  background-color: white;
}

</style>
