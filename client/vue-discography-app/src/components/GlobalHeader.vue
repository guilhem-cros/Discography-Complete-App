<template>
  <div class="head" @keyup.esc="this.isSearching=false">
    <div class="search">
      <input type="text" id="searchBar" placeholder="Search for albums & more" autocomplete="off" v-model="searchedText" @input="loadResearch">
      <div v-if="this.isSearching" class="search_results">
        <p id="albResults">ALBUMS</p>
        <div class="searchedAlbums" v-for="(album, index) in this.albums" :key="index" @click="goToAlbum(album.id_album)">
          <img :src="this.getCover(album)" :alt="album.title + '_cover'" class="searchedAlbumCover">
          <div class="searchedAlbumInfo">
            <h3 class="searchedAlbumTitle">{{album.title}}</h3>
            <p class="searchedAlbumArtist">{{album.name}}</p>
          </div>
        </div>
        <p id="artistResults">ARTISTS</p>
        <div class="searchedArtists" v-for="(artist, index) in this.artists" :key="index" @click="goToArtist(artist.id_artist)">
          <img :src="this.getPicture(artist)" :alt="artist.name + '_picture'" class="searchedArtistPicture">
          <div class="searchedArtistInfo">
            <h3 class="searchedArtistName">{{artist.name}}</h3>
          </div>
        </div>
        <p id="songResults">SONGS</p>
        <div class="searchedSongs" v-for="(song, index) in this.songs" :key="index" @click="goToAlbum(song.album)">
          <img :src="this.getCover(song)" :alt="song.song_title + '_picture'" class="searchedSongCover">
          <div class="searchedSongInfo">
            <h3 class="searchedSongTitle">{{song.song_title}}</h3>
            <p class="searchedSongArtist">{{song.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <h1 id="title" @click="goHome">音楽</h1>
    </div>
    <div class="sign_panel">
      <div>
        <p id="sign_in_butt" @click="signIn" v-if="!this.$store.getters.user.loggedIn">SIGN IN</p>
        <p id="sign_up_butt" @click="signUp" v-if="!this.$store.getters.user.loggedIn">SIGN UP</p>
        <p id="signOut" @click="signOut" v-if="this.$store.getters.user.loggedIn">Disconnect</p>
      </div>
    </div>
  </div>
  <NavBar />
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';
import {auth} from '../firebase-config';

export default {
  components: { NavBar },
  name : "GlobalHeader",
  data(){
    return{
      searchedText : "", //text entered in search field of the header
      url : this.$store.getters.getApiURL, //url to the API
      artists :  [], //artists matching with search
      albums : [], //albums matching with search
      songs: [], //songs matching with search
      isSearching : false //boolean : true if currently searching, else is false
    }
  },
  methods: {
    //get all the matching artist with search input and send the first 3 of them by name order
    async searchThreeArtists(){
      if(this.searchedText.length > 0){ //if text has been entered
        let url = this.url + 'artists/search/' + this.searchedText;
        await axios.get(url).catch(function (error){ //get data or handling error
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){ //sorting data
          if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
          if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.artists = response.slice(0,3)) //put data in this.artists
      }
    },
    //get all the albums matching with search input and send the 3 first ones by title order
    async searchThreeAlbums(){
      if(this.searchedText.length > 0){ //if text has been entered
        let url = this.url + 'albums/search/' + this.searchedText;
        await axios.get(url).catch(function (error){ //get data or handling error
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){ //sorting data
          if(a.title.toLowerCase()<b.title.toLowerCase()){return -1}
          if(a.title.toLowerCase()>b.title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.albums = response.slice(0,3)); //put data in this.albums
      }
    },
    //get all the songs matching with search input and send the 3 first ones by order of title
    async searchThreeSongs(){
      if(this.searchedText.length > 0){ //if text has been entered
        let url = this.url + 'songs/search/' + this.searchedText;
        await axios.get(url).catch(function (error){ //get data or handling error
          console.log(error)
        }).then(response => (response.data.sort(function(a,b){ //sorting data
          if(a.song_title.toLowerCase()<b.song_title.toLowerCase()){return -1}
          if(a.song_title.toLowerCase()>b.song_title.toLowerCase()){return 1}
          return 0;
        }))).then(response => this.songs = response.slice(0,3)); //put data in this.songs
      }
    },
    //load and get all the resources that match with the text entered in search-bar
    async loadResearch(){
      if(this.searchedText.length == 0){ //if no text : no data to fetch -> hide results
        this.isSearching = false;
      }
      else{ //if text has been entered -> show results and fetch matching data
        this.isSearching = true;
        await this.searchThreeAlbums();
        await this.searchThreeArtists();
        await this.searchThreeSongs();
      }
    },
    //change the current page to the album details page of id_album = id
    goToAlbum(id){
      this.isSearching = false; //search results are hide
      this.$router.push({name : 'albumDetails', params: { idAlbum : id}}); //go to album details page
    },
    //change the current page to the artist details page of id_artist = id
    goToArtist(id){
      this.isSearching = false; //search results are hide
      this.$router.push({ name: 'artistDetails', params: { id: id } }); //go to artist details page
    },
    //get the item's cover path or return default cover if path is null or empty
    getCover(item){
      if(item.cover == null || item.cover.length == 0){ //if null or empty
        return require("../assets/covers/default.jpg"); //return default
      }
      else{
        return item.cover; //return full path
      }
    },
    //get the artist's picture path or return default picture id path null/empty
    getPicture(artist){
      if(artist.image == null || artist.image.length == 0){ //if null or empty
        return require("../assets/artists/default.png"); //return default
      }
      else{
        return artist.image; //return full path
      }
    },
    signIn(){
      this.$router.push({name : 'connect', params : {isSignIn : true, currentPage : this.$route.name}})
    },
    signUp(){
      this.$router.push({name : 'connect', params : {isSignIn : false, currentPage : this.$route.name}})
    },
    goHome(){
      this.$router.push({name : 'home'});
    },
    signOut() {
        auth.signOut()
        .then(() => {
          this.$router.push({name: "home"});
        });
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
}

.search_results{
  position: absolute;
  background-color: white;
  top : calc(41px + 1rem);
  left : 1rem;
  padding : 1%;
  padding-right: 2%;
  width : 400px;
  max-height: calc((100vh - 41px) - 4.5rem);
  border-radius: 3px;
  border: 1px solid #A7A7A7;
  margin : 0;
  overflow-y: hidden;
  overflow:scroll;
  z-index: 3;
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
  color : #8A8A8A;
  font-size: 12px;
  margin-bottom: 5%;
}

#albResults{
  margin-top : 0;
  padding-top: 3%;
}

.searchedAlbums, .searchedArtists, .searchedSongs{
  display: flex;
  flex-direction: row;
  margin-left: 1%;
  margin-bottom : 5%;
}

.searchedAlbumCover, .searchedSongCover{
  width :80px;
  height: 80px;
  object-fit: cover;
}

.searchedAlbumTitle, .searchedAlbumArtist, .searchedSongArtist, .searchedSongTitle{
  margin: 0;
}

.searchedAlbumTitle, .searchedSongTitle{
  margin-bottom: 2%;
  font-size: 16px;
}

.searchedAlbumArtist, .searchedSongArtist{
  font-size: 14px;
}

.searchedAlbumInfo, .searchedSongInfo{
  margin-top : 1%;
  margin-left : 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.searchedAlbums:hover, .searchedArtists:hover, .searchedSongs:hover{
  cursor: pointer;
  opacity: 0.8;
}

.searchedArtistPicture{
  height: 60px;
  width : 60px;
  border-radius: 50%;
  object-fit: cover;
}

.searchedArtistInfo{
  margin-left : 5%;
}

.searchedArtistName{
  font-size: 16px;
}

.searchedArtists{
  align-items: center;
}

#signOut{
  border: 1px black solid;
  border-radius: 3px;
  width : 60%;
  font-size: 14px;
  margin-left : 10%;
}

#signOut:hover{
  cursor : pointer;
  opacity: .8;
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
    top : calc(41px + 2rem)
  }

  #signOut{
    margin-left: 60%;
    width : 30%;
  }
}

@media screen and (max-width: 1250px){
    #signOut{
      margin-left: 50%;
      width : 40%;
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
    top : calc(41px + 6rem);
    width: 350px;
  }
  #signOut{
    margin-left: 40%;
    width : 60%;
  }
}

@media screen and (max-width: 450px){
  .search_results{
    width: 300px;
    top : calc(41px + 5rem);
    left : 1%;
  }
  #signOut{
    margin-left: 30%;
    width : 80px;
  }
}

@media screen and (max-width: 350px){
  .search_results{
    width: 275px;
  }
  #signOut{
    margin-left: 15%;
    width : 80px;
  }
}

</style>