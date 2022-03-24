<template>
    <div class="artistPresence">
        <h3 id="featInfoTitle">Is present on </h3>
        <div class="artistFeats">
            <div v-for="(data, index) in this.featsData" :key="index" class="featDesc" :class="'featCol_'+index%2">
                <div class="coverDiv">
                  <img :src="getCover(data)" :alt="data.title + '_cover'" class="featCover" @click="openAlbum(data.id_album)"/>
                </div>
                <div class="feat_info">
                    <p class="featAlbum" @click="openAlbum(data.id_album)">{{data.title.toUpperCase()}}</p>
                    <p class="featTitle">{{data.song_title.toUpperCase()}}</p>
                    <p class="featRelease">{{data.release.substring(0,10)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name :'ArtistFeats',
    props : {
        idArtist : String //id of the artist
    },
    data(){
        return{
            featsData : [], //list of all the songs where appears the artist
            url : this.$store.getters.getApiURL, //url to the API
        }
    },
    methods:{
        //get all the songs where the artist of id_artist = this.idArtist appears
        async getData(){
            let url = this.url + "artists/albums/whereArtist/" + this.idArtist;
            await axios.get(url).catch(function (error) { //get data or handling error
                this.$route.push({name: error, params : {mess: error.message}})
            }).then(response => ( response.data.sort(function(a,b){ //sort data by release data of the song (*song's album release)
              if(a.release < b.release){return 1}
              if(a.release > b.release){return -1}
              return 0;
            }))).then(response => this.featsData = response,); //put data in this.feats
        },
        //push to album details page
        openAlbum(idAlb){
            this.$router.push({name : "albumDetails", params : {idAlbum : idAlb}})
        },
        //get the item's cover path or return default cover if path is null or empty
        getCover(item){
          if(item.cover == null || item.cover.length == 0){ //if null or empty
            return require("../assets/covers/default.jpg"); //return default
          }
          else{
            return this.url +  item.cover; //return full path
          }
        },
    },
    mounted(){
        this.getData();//get data when mounted
    }
}
</script>

<style>

.artistPresence{
  text-align: center;
}

.artistFeats{
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  justify-items: start;
  margin-left: 5%;
}

.featCol_0{
  grid-column: 1;
}

.featCol_1{
  grid-column: 2;
}

.featDesc{
  display: grid;
  text-align: left;
  align-items: center;
}

.featTitle{
  font-size: 14px;
}

.feat_info{
  grid-column: 2;
  margin-top: 1%;
}

.featTitle, .featAlbum{
  font-weight: bold;
  padding: 0;
  margin : 2%;
}

.featRelease{
  font-weight: lighter;
  font-size: 14px;
  margin-left: 2%;
}

.coverDiv{
  grid-column: 1;
  grid-row: 1;
  text-align: right;
}

.featCover{
  width: 75px;
  height: 75px;
  object-fit: cover;
  padding: 3px;
  background-color: #FFE469;
}

.featCover:hover, .featAlbum:hover{
  cursor: pointer;
  opacity: 0.8;
}

#featInfoTitle{
  margin-bottom: 10%;
  color: #272727
}

@media screen and (max-width: 800px){
    .featCol_1{
      grid-column: 1;
    }
    .artistFeats{
      justify-items: start;
      margin-left : 25%;
    }
    .feat_info{
      margin-left :0
    }
    .feat_info>p{
      margin : 0;
      margin-left : 1%;
      width : 100%;
    }
    .featDesc{
      width : 100%;
      justify-content: start;
      align-items: normal;
    }
}

@media screen and (max-width: 500px){
  .featCover{
    width: 50px;
    height: 50px;
  }
  .featRelease, .featTitle, .featAlbum{
    margin-top:0;
  }
  .featRelease{
    display: none;
  }
  .artistFeats{
    margin-right: 1%;
    margin-left: 5%;
    padding-left: 3%;
    border-left : solid 1px black
  }
}

</style>
