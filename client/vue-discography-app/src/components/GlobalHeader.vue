<template>
  <div class="head">
    <div class="search">
      <input type="text" id="searchBar" placeholder="Search for albums & more" v-model="searchedText" @input="searchFiveSongs">
      <img src="../assets/search.png" width="auto" height="24px" alt="research button" id="research_butt">
    </div>
    <div class="title">
      <h1 id="title">音楽</h1>
    </div>
    <div class="sign_panel">
      <div>
        <p id="sign_in_butt">SIGN IN</p>
        <p id="sign_up_butt">SIGN UP</p>
      </div>
    </div>
  </div>
  <NavBar />
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },
  name : "GlobalHeader",
  data(){
    return{
      searchedText : "",
      url : this.$store.getters.getApiURL,
      artists :  [],
      albums : [],
      songs: []
    }
  },
  methods: {
    async searchFiveArtists(){
      if(this.searchedText.length > 0){
        let url = this.url + 'artists/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
          if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.artists = response.slice(0,5))
      }
    },
    async searchFiveAlbums(){
      if(this.searchedText.length > 0){
        let url = this.url + 'albums/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.title.toLowerCase()<b.title.toLowerCase()){return -1}
          if(a.title.toLowerCase()>b.title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.albums = response.slice(0,5));
      }
    },
    async searchFiveSongs(){
      if(this.searchedText.length > 0){
        let url = this.url + 'songs/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.song_title.toLowerCase()<b.song_title.toLowerCase()){return -1}
          if(a.song_title.toLowerCase()>b.song_title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.songs = response.slice(0,5));
        console.log(this.songs)
      }
    }

  }
  
}


</script>


<style>
.head{
  display: grid;
  background-color: #FFE469;
  grid-auto-columns: minmax(0, 1fr);
  margin : 0;
  align-items: center;
}

.search{
  text-align: left;
  grid-column: 1;
  display: inline-flex;
  align-items: center;
}

.title{
  text-align: center;
  grid-column: 2;
}

#title{
  margin: 0;

}

.sign_panel{
  grid-column: 3;
  text-align: right;
}

.sign_panel > div{
  display: inline-flex;
  margin : 1%;
  width : 30%;
  margin-right: 1rem;
  text-align: center;
}

.sign_panel > div > p{
  font-size: 12px;
  margin-left: 1%;
  width : 100%;
  font-weight: bold;
}

.search > input {
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  font-weight: 600;
  outline: none;
  font-size: 16px;
  line-height: 32px;
  margin : 1%;
}

.search > input::placeholder{
  color: #151515;
}

.search > input:focus::placeholder{
  color: grey;
}

#sign_in_butt:hover, #sign_up_butt:hover{
  cursor: pointer;
  opacity: 0.7;
}

#title:hover{
  cursor: pointer;
}

/*Under 1250 px*/
@media screen and (max-width: 1250px){
  .sign_panel > div{
    display: inline;
    margin : 0;
    width : 30%;
  }

  .sign_panel > div > p{
    margin: 5%;
  }

}

/*Under 680 px*/
@media screen and (max-width: 650px){
  .title{
    margin-left: 1%;
    grid-column: 1;
    grid-row: 1;
    text-align: left;
  }

  .search{
    grid-column: 1;
    grid-row :2;
  }

  .sign_panel{
    text-align: right;
  }

  .sign_panel>div{
    display: inline;
    margin : 0;
    text-align: center;
  }

  .sign_panel > div > p{
    margin: 10%;
  }

  .head{
    padding: 2%;
    padding-top : 0;
  }
}
</style>