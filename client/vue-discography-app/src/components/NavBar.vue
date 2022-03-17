<template>
  <nav>
    <router-link :to="{name : 'home'}">Home</router-link>  | 
    <router-link :to="{name: 'genreForm'}">GenreForm</router-link> | 
    <router-link :to="{name : 'about'}">About</router-link>
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
}

</style>