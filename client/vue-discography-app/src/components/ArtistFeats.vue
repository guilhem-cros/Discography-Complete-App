<template>
    <div class="artistPresence">
        <h3 id="featInfoTitle">Is present on </h3>
        <div class="artistFeats">
            <div v-for="(data, index) in this.featsData" :key="index" class="featDesc" :class="'featCol_'+index%2">
                <div class="coverDiv">
                  <img :src="this.url + data.cover" :alt="data.title + '_cover'" class="featCover" @click="openAlbum(data.id_album)"/>
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
        idArtist : String
    },
    data(){
        return{
            featsData : [],
            url : this.$store.getters.getApiURL,
        }
    },
    methods:{
        async getData(){
            let url = this.url + "artists/albums/whereArtist/" + this.idArtist;
            await axios.get(url).catch(function (error) {
                this.$route.push({name: error, params : {mess: error.message}})
            }).then(response => ( response.data.sort(function(a,b){
              if(a.release < b.release){return -1}
              if(a.release > b.release){return 1}
              return 0;
            }))).then(response => this.featsData = response,);
        },
        openAlbum(idAlb){
            this.$router.push({name : "albumDetails", params : {idAlbum : idAlb}})
        }
    },
    computed:{
    },
    mounted(){
        this.getData();
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
  grid-row: 1/3;
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
}

@media screen and (max-width: 500px){
  .featCover{
    width: 50px;
    height: 50px;
  }

  .featRelease, .featTitle, .featAlbum{
    margin-top:0;
  }
}

</style>
