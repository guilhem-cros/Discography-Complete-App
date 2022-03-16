<template>
  <nav>
    <router-link to="/">Home</router-link>  | 
    <router-link to="/about">About</router-link> | 
    <router-link :to="{name: 'genreForm'}">GenreForm</router-link>
  </nav>
</template>

<script>

export default {
  setup() {

  },
  methods: {

  }
}

</script>

<style>

nav{
  background-color : #1B1B19;
  padding: 10px;
  font-weight: bold;
  color: white;
}

nav a {
  text-decoration: none;
  color : white;
  margin-left : 2%;
  margin-right : 2%;
}

nav a.router-link-exact-active {
  color: #FFE469;
  opacity: 0.8;
}

</style>