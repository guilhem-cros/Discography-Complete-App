<template>
  <GlobalHeader />
  <router-view/>
  <AppFooter/>
</template>

<script>
import GlobalHeader from './components/GlobalHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
    components: { GlobalHeader, AppFooter}
}
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color : black;
  min-height: 100vh;
  display : flex;
  flex-direction: column;
}

html, body{
  margin: 0;
  min-height: 100vh;
  background-color: white;
}

</style>
