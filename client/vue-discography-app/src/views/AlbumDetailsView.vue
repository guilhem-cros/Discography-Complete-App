<template>
  <ErrorComponent v-if="error" :mess="this.errMessage"/>
  <div class="albumDetails" v-else>
  <div class="albumBanner" :style="'background-image: url(' + this.getCover() + ')'">
    <div class="modifLogos">
        <img src="../assets/updateLogo.png" alt="updateLogo" id="updateLogo" title = "Update" @click="openForm">
        <img src="../assets/deleteLogo.png" alt="deleteLogo" id="deleteLogo" title="Delete" @click="deleteConfirm">
    </div>
    <div class="bannerContent">
        <div class="cover">
          <img :src="getCover()" :alt="this.albumData.title + '_cover'" class="albumCover">
        </div>
        <div class="albumInfo">
          <h4 class="albLabel">ALBUM</h4>
          <h1 id="albumTitle">{{this.upperTitle}}</h1>
          <h2 id="author" @click="showArtist">{{this.artist.name}}</h2>
          <p id="releaseDate">{{"Released " + this.monthNames[Number(this.date[1])-1] + " " + (Number(this.date[2])+1) + ", " + this.date[0]}}</p>
        </div>
    </div>
  </div>
  <div class="albumContent">
    <h3 id="tracklistTitle">{{this.upperTitle + " TRACKLIST"}}</h3>
    <div class="tracklist">
        <div v-for="(song) in this.albumSongs" :key="song.id_song" class="track">
            <SongAndFeat :idSong="song.id_song" :songName="song.song_title" @loadingError="showError"/>
        </div>
    </div>
    <h3 id="commentsTitle">LAST COMMENTS FROM LISTENERS</h3>
    <div class="coms">
        <div v-for="(com) in this.lastComments" :key="com.id_comment" class="comment">
            <p class="pseudo">{{com.author}}</p>
            <p class="comContent">{{com.content}}</p>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import SongAndFeat from '../components/SongAndFeat.vue';
import ErrorComponent from '../components/RequestError.vue';

export default {
    name: 'AlbumView',
    data(){
        return {
            idAlbum : 1,
            albumData : {},
            albumSongs : [],
            error : false,
            errMessage: "",
            artist : {},
            lastComments : [],
            monthNames : ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ],
        }
    },
    props:{
        //idAlbum : String,
    },
    components:{SongAndFeat, ErrorComponent},
    methods:{
        async getAlbumDetails(){
            let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
            await axios.get(url).catch(function (error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response => (this.albumData = response.data));
        },
        async getSongsOfAlbum(){
            let url = this.$store.getters.getApiURL + "songs/onAlbum/" + this.idAlbum;
            await axios.get(url).catch(function (error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response => this.albumSongs = response.data);
        },
        async getMainArtist(){
            let url = this.$store.getters.getApiURL + "artists/" + this.albumData.artist;
            await axios.get(url).catch(function(error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response=> (this.artist = response.data));
        },
        async getLastComs(){
            let url = this.$store.getters.getApiURL + "comments/last/" + this.idAlbum;
            await axios.get(url).catch(function(error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response=> (this.lastComments = response.data));
        },
        async loadAll(){
            await this.getAlbumDetails();
            await this.getSongsOfAlbum();
            await this.getMainArtist();
            await this.getLastComs();
        },
        showError(value){
            this.error = true;
            this.errMessage = value;
        },
        getCover(){
            if(this.albumData.cover === undefined || this.albumData.cover == null || this.albumData.cover.length == 0){
                return require("../assets/covers/default.jpg");
            }
            else{
                return this.$store.getters.getApiURL + this.albumData.cover;
            }
        },
        showArtist(){
            this.$router.push({name: 'artistDetails', params: { id : this.artist.id_artist}});
        },
        openForm(){
            this.$router.push({name : 'album', params : {idAlbum : this.idAlbum}});
        }
    },
    mounted(){
        this.loadAll();
    },
    computed:{
        date(){
            if(this.albumData.release !==undefined){
                let newDate = this.albumData.release.replace(/ /g, '-')
                newDate = this.albumData.release.replace(/T/g, '-')
                return newDate.split('-');
            }
            else return 0
        },
        upperTitle(){
            if(this.albumData.title !== undefined){
                let albumTitle = this.albumData.title.toUpperCase();
                return albumTitle;
            }
            else{
                return "";
            }
        }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:white')
    },
    beforeUnmount () {
      document.querySelector('body').setAttribute('style', '')
    },
}
</script>

<style>

.albumBanner{
    display: grid;
  background-position: center;
  background-size: cover;
  margin : 0;
  width: 100%;
  height: 350px;
  background-color: black;
  z-index: -1;
}

.albLabel, #albumTitle, #author{
  font-weight: bold;
}

.bannerContent{
  grid-row: 1;
  grid-column: 1/3;
  margin-right :0;
  height: 100%;
  display : grid;
  text-align : center;
  background-color : rgba(0, 0, 0, 0.7)
}

.cover{
  text-align: right;
  margin-top : 4%;
  margin-right: 2%;
  grid-column : 1;
  grid-row: 1;
}

.albumInfo{
  margin-top : 7%;
  display: flex;
  flex-direction: column;
  grid-column: 2;
}

#author, #albumTitle, .albLabel, #releaseDate{
  text-align: left;
  margin-top: 1%;
  margin-bottom: 0;
}

#releaseDate{
  color : #B2AEAE;
  font-size: 16px;
  font-weight: bold;
}

#author, #albumTitle{
  color : white
}

#author{
  margin-top: 1%;
  margin-bottom: 2%;
}

#author:hover{
  cursor: pointer;
  opacity: 0.5;
}

.albLabel{
  color : gold;
  margin-bottom: 1%;
  font-size: 14px;
}


.albumCover {
    width : 300px;
    height: 300px;
    border: solid 2px #B2AEAE;
}

.tracklist{
  text-align: center;
  grid-column: 1/4;
  grid-row: 2;
}

#tracklistTitle, #commentsTitle{
  color : grey;
  font-weight: lighter;
  font-size: 16px;
  margin-bottom: 1%;
  text-align: left;
}
.track{
  padding-left: 1%;
  border-left: solid 1px #FFE469;
}

.albumContent{
  display : grid;
  margin-left: 5%;
  margin-left: 1%;
}

#tracklistTitle{
  grid-column: 2;
  grid-row : 1;
}
#commentsTitle{
  grid-column: 4;
  grid-row : 1;
}

.coms{
  grid-column: 4;
  grid-row: 2;
  text-align: left;
}

.comment{
  margin-bottom: 10%;
}

.pseudo{
  font-weight: bold;
}

#deleteLogo, #updateLogo{
  height: 3vh;
  border: solid 1px black;
  border-top : none;
  border-right: none;
  text-align: right;
  margin-top : 25%;
  padding : 1%;
}

.modifLogos{
    grid-row: 1;
    grid-column: 3;
  display: grid;
  justify-content: end;
  margin-right : 1%;
  height: 10%;
}

#updateLogo{
  grid-row : 2;
}

#deleteLogo{
  grid-row : 1;
}

#deleteLogo:hover, #updateLogo:hover{
  cursor: pointer;
  opacity: 0.8;
}

@media screen and (max-width: 1050px) {
    .albumBanner{
      height: 300px;
    }
    .albumCover{
      height: 250px;
      width: 250px;
    }
}

@media screen and (max-width: 900px) {

    #tracklistTitle{
      grid-column: 1;
      text-align: center;
    }

    #commentsTitle{
      grid-column: 3;
      text-align: center;
    }

    .coms{
      grid-column: 3;
      margin-left : 15%
    }

    .tracklist{
      text-align: center;
      grid-column: 1/3;
    }
}

@media screen and (max-width: 700px) {

    .albumBanner{
      height: 200px;
    }
    .albumCover{
      height: 150px;
      width: 150px;
    }

    #tracklistTitle{
      grid-column: 1;
      grid-row: 1;
    }

    #commentsTitle{
      grid-column: 1;
      grid-row: 3;
    }

    .coms{
      grid-column: 1;
      grid-row: 4;
      text-align: center;
      margin-left: 0;
    }

    .comment{
      margin-bottom: 5%;
    }

    .tracklist{
      grid-column: 1;
      grid-row: 2;
      margin-bottom: 3%;
    }

}
@media screen and (max-width: 500px) {
    .albumBanner{
      height: 150px;
    }
    .albumCover{
      height: 125px;
      width: 125px;
    }
    .bannerContent{
      margin-right: 0;
    }
}

@media screen and (max-width: 350px) {
    .albumBanner{
      height: 200px;
    }
}

</style>