<template>
  <div class="banner"></div>
  <img src="../assets/artists/6_pfp.jpg" alt="e" class="detailPfp">
  <div class="artistInfos">
    <h1>{{this.artistDatas.name}}</h1>
    <p>{{this.artistDatas.genre}}</p>
    <p>{{this.albumList}}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'ArtistDetails',
    data(){
        return{
            artistDatas : {},
            albumList : [],
            genre : {},
        }
    },
    methods : {
        //get artist data
        async getDatas(){
            let url = this.$store.getters.getApiURL + "artists/"+this.id;
            await axios.get(url).catch(function (){ //getting the albums and handling errors
                this.$emit('artistDetailsError')
            }).then(response => (this.artistDatas = response.data));
        },
        //get all the albums of the artist
        async getAlbums(){
            if(this.albumList.length == 0){
                let url = this.$store.getters.getApiURL + "artists/albums/"+this.id;
                await axios.get(url).catch(function (){ //getting the albums and handling errors
                    this.$emit('artistDetailsError')
                }).then(response => (response.data.sort(function(a,b){
                    if(a.release < b.release){return -1}
                    if(a.release > b.release){return 1}
                    return 0;
                }))).then(response => this.albumList = response);
            }
        },
        //get the genre infos of the artist
        async getGenre(){
            let url = this.$store.getters.getApiURL + "genres/" + this.artistDatas.genre;
            await axios.get(url).catch(function (){ //getting genre infos and handling errors
                this.$emit('artistDetailsError')
            }).then(response => this.genre = response.data)
        },
        async loadAll(){
            await this.getDatas().then(
            this.getAlbums()),
            this.getGenre();
        }
    },
    props :{
        id : String,
    },
    mounted(){
        this.loadAll();
    }
}

</script>

<style>

.detailPfp{
  width: 250px;
  border-radius: 50%;
  border : 3px solid #38ef51;
  display: flex;
  margin-left : 25%;
  margin-top : 3%;
}

.artistMenu{
  margin-top: 1%;
}

.banner{
  background-position: center;
  background-size: cover;
  position : absolute;
  margin : 0;
  filter : blur(2px);
  width: 100%;
  height: 30%;
  opacity: .8;
  background-image: url("../assets/artists/6_pfp.jpg");
  z-index: -1;
}

@media screen and (max-width: 1050px){
  .detailPfp{
    width: 25%;
    margin-left: 15%;
  }

  .banner{
    height : 24vw;
  }
}
@media screen and (max-width: 800px){
  .detailPfp{
    margin-left: 5%;
  }
}
</style>