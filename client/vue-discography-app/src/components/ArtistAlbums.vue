<template>
  <div class="artistAlbums">
      <div class="allAlbuls">
          <h3 id="ownAlbumHead">Last albums released</h3>
          <div class="uniAlbum" v-for="(album, index) in this.listAlbums" :key="index">
              <img :src="this.getCover(album)" class="ownCovers" :alt="album.title + '_cover'" @click="goToAlbum(album.id_album)"/>
              <h3 class="ownAlbumTitle" @click="goToAlbum(album.id_album)">{{album.title.toUpperCase()}}</h3>
              <p class="ownRelease">{{album.release.substring(0,10)}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';

export default {
    name: 'ArtistAlbums',
     data(){
        return{
            url : this.$store.getters.getApiURL, //url to the API
            listAlbums : [], //all albums made by the artist
        }
    },
    props:{
        idArtist : String //id of the artist
    },
    methods:{
        //get all the albums of the artist
        async getData(){
            let url = this.url + "artists/albums/" + this.idArtist;
            await axios.get(url).catch(function (error) { //get data or handlling error
                Notiflix.Notify.failure(error.message, {closeButton:true});
            }).then(response => ( response.data.sort(function(a,b){ //sort data by release date of albums
              if(a.release < b.release){return 1}
              if(a.release > b.release){return -1}
              return 0;
            }))).then(response => this.listAlbums = response,); //put data in this.listAlbums
        },
        //redirect to album details page of the album with id_album = id
        goToAlbum(id){
          this.$router.push({name : 'albumDetails', params : {idAlbum : id}})
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
    },
    mounted(){
        this.getData(); //getting data when page's mounted
    }
}
</script>

<style>
.artistAlbums{
  margin-top: 0;
}

.uniAlbum{
  margin-bottom:1%;
}

.ownCovers{
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 2px;
  padding: 1px;
  background-color: #222;
}

.ownAlbumTitle{
  margin-top : 0;
  margin-bottom: 0;
  color:#2E2E2E;
}

.ownRelease{
  margin-top : 1%;
  color : #222;
  font-weight: lighter;
}

#ownAlbumHead{
  margin-top: 0;
  color : #272727;
}

.ownCovers:hover, .ownAlbumTitle:hover{
  cursor: pointer;
  opacity: 0.8;
}

@media screen and (max-width: 800px){
  .ownCovers{
    width: 30vw;
    height: 30vw;
  }
}
</style>
