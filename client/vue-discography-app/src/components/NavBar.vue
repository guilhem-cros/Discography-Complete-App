<template>
  <nav>
    <router-link :to="{name : 'home'}">Home</router-link>  |
    <router-link :to="{name : 'artists'}">Artists</router-link> |
    <router-link :to="{name : 'album', params:{idAlbum : -1}}">Add an Album</router-link> |
    <router-link :to="{name: 'genres'}">Genres</router-link> |
    <router-link :to="{name : 'albumDetails'}">Album Details</router-link> |
    <router-link :to="{name : 'about'}">About</router-link>
  </nav>
</template>

<script>
export default {
  name : "NavBar",
  methods: {
    createAlbum(){
      this.$router.params.idAlbum = -1;
      this.$router.params.creation = false;
    }
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