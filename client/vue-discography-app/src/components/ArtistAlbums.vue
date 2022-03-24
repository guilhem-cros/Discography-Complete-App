<template>
  <div class="artistAlbums">
      <div class="allAlbuls">
          <h3 id="ownAlbumHead">Last album released</h3>
          <div class="uniAlbum" v-for="(album, index) in this.listAlbums" :key="index">
              <img :src="this.url + album.cover" class="ownCovers" :alt="album.title + '_cover'" @click="goToAlbum(album.id_album)"/>
              <h3 class="ownAlbumTitle" @click="goToAlbum(album.id_album)">{{album.title.toUpperCase()}}</h3>
              <p class="ownRelease">{{album.release.substring(0,10)}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ArtistAlbums',
     data(){
        return{
            url : this.$store.getters.getApiURL,
            listAlbums : [],
        }
    },
    props:{
        idArtist : String
    },
    methods:{
        //get all the albums of the artist
        async getData(){
            let url = this.url + "artists/albums/" + this.idArtist;
            await axios.get(url).catch(function (error) {
                this.$route.push({name: error, params : {mess: error.message}})
            }).then(response => ( response.data.sort(function(a,b){
              if(a.release < b.release){return -1}
              if(a.release > b.release){return 1}
              return 0;
            }))).then(response => this.listAlbums = response,);
        },
        goToAlbum(id){
          this.$router.push({name : 'albumDetails', params : {idAlbum : id}})
        }
    },
    mounted(){
        this.getData();
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
