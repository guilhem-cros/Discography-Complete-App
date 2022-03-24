<template>
  <div class="head">
    <div class="search">
      <input type="text" id="searchBar" placeholder="Search for albums & more" v-model="searchedText" @input="searchFiveSongs">
      <div v-if="this.isSearching" class="search_results">
        <p id="albResults">Albums</p>

        <p id="artistResults">Artists</p>

        <p id="songResults">Songs</p>
      </div>
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
      songs: [],
      isSearching : true
    }
  },
  methods: {
    async searchThreeArtists(){
      if(this.searchedText.length > 0){
        let url = this.url + 'artists/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
          if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.artists = response.slice(0,3))
      }
    },
    async searchThreeAlbums(){
      if(this.searchedText.length > 0){
        let url = this.url + 'albums/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.title.toLowerCase()<b.title.toLowerCase()){return -1}
          if(a.title.toLowerCase()>b.title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.albums = response.slice(0,3));
      }
    },
    async searchThreeSongs(){
      if(this.searchedText.length > 0){
        let url = this.url + 'songs/search/' + this.searchedText;
        await axios.get(url).catch(function (error){
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){
          if(a.song_title.toLowerCase()<b.song_title.toLowerCase()){return -1}
          if(a.song_title.toLowerCase()>b.song_title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.songs = response.slice(0,3));
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async loadResearch(){
      await this.sleep(1000) //waiting a second
      //completer !!!
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
  display: grid;
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

#searchBar {
  border: none;
  border-radius: 3px;
  font-weight: 600;
  outline: none;
  font-size: 16px;
  line-height: 32px;
  margin : 1%;
  width: 250px;
  grid-row : 1;
  grid-column: 1;
}

.search_results{
  grid-row: 2;
  grid-column: 1;
  position: absolute;
  background-color: white;
  top : 2.6em;
  left : 5px;
  padding : 1%;
  padding-right: 2%;
  width : 350px;
  border-radius: 3px;
  border-top : 1px solid black;
  margin : 0;
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

#albResults, #artistResults, #songResults{
  border-bottom : solid 1px grey;
  padding-bottom : 1%;
  margin-bottom : 2%;
}
#albResults{
  margin-top : 0;
  padding-top: 3%;
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

  .search_results{
    top : 5.5vw;
  }

}

@media screen and (max-width: 1050px){
.search_results{
    top : 3.6em;
  }
}

@media screen and (max-width: 850px){
.search_results{
    width : 300px;
    top : 50px;
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
  .search_results{
    margin-left: 2%;
    top : 125px;
  }
}

@media screen and (max-width: 550px){
  .search_results{
    top : 120px;
  }
}

@media screen and (max-width: 450px){
  .search_results{
    top : 105px;
    width : 200px;
  }
}


</style>