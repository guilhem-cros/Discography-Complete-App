<template>
  <nav>
    <router-link :to="{name : 'home'}">Home</router-link>  |
    <router-link :to="{name : 'artists'}">Artists</router-link> |
    <router-link :to="{name: 'genres'}">Genres</router-link> |
    <router-link :to="{name : 'about'}">About</router-link> |
    <router-link :to="{name : 'album', params:{idAlbum : -1, artistName: ''}}" v-if="this.$store.getters.adminState">Add an Album</router-link>
  </nav>
</template>

<script>
export default {
  name : "NavBar",
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