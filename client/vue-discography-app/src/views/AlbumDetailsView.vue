<template>
  <div class="albumDetails">
  <div class="albumBanner" :style="'background-image: url(' + this.getCover() + ')'">
    <div class="modifLogos">
        <img src="../assets/updateLogo.png" alt="updateLogo" id="updateLogo" title = "Update" @click="openForm" v-if="this.$store.getters.adminState">
        <img src="../assets/deleteLogo.png" alt="deleteLogo" id="deleteLogo" title="Delete" @click="deleteConfirm" v-if="this.$store.getters.adminState">
    </div>
    <div class="bannerContent">
        <div class="cover">
          <img :src="getCover()" :alt="this.albumData.title + '_cover'" class="albumCover">
        </div>
        <div class="albumInfo">
          <h4 class="albLabel">ALBUM</h4>
          <h1 id="albumTitle">{{this.upperTitle}}</h1>
          <h2 id="author" @click="showArtist">{{this.artist.name}}</h2>
          <p id="releaseDate">{{"Released " + this.monthNames[Number(this.date[1])-1] + " " + (Number(this.date[2])) + ", " + this.date[0]}}</p>
        </div>
    </div>
  </div>
  <div class="albumContent">
    <h3 id="tracklistTitle">{{this.upperTitle + " TRACKLIST"}}</h3>
    <div class="tracklist">
        <div v-for="(song, index) in this.albumSongs" :key="song.id_song" class="track">
            <SongAndFeat :idAlbum="idAlbum" :index="index" :idSong="song.id_song" :songName="song.song_title" :idArtist="this.artist.id_artist" @loadingError="showError" @deleted="updateList"/>
        </div>
        <div v-if="this.$store.getters.adminState">
          <p class="addSongBtn" v-if="!isAddingSong" @click="openSongForm">Add a song</p>
          <div class="addSong" v-else>
            <SongForm :idAlbum="this.idAlbum" :create="true" :idSong="-1" :name="''" :featurings="[]" :idArtist="this.artist.id_artist" @errorLoading="showError" @formClosed="hideForm"/>
          </div>
        </div>
    </div>
    <h3 id="commentsTitle">LAST COMMENTS FROM LISTENERS</h3>
    <div class="coms">
        <div v-for="(com) in this.lastComments" :key="com.id_comment" class="comment">
            <p class="pseudo">{{com.author}}</p>
            <p class="comContent">{{com.content}}</p>
        </div>
        <CommentForm :idAlbum="this.idAlbum"/>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import SongAndFeat from '../components/SongAndFeat.vue';
import SongForm from '../components/SongForm.vue';
import CommentForm from '@/components/CommentForm.vue';
import Notiflix from 'notiflix';

export default {
    name: 'AlbumDetailsView',
    data(){
        return {
            albumData : {}, //album data
            albumSongs : [], //songs in the album
            errMessage: "", //error message
            artist : {}, //artist of the album
            lastComments : [], //last 5 comments (or less if not 5 in db) of the album
            monthNames : ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ],
            alertIndex : 0, //index of notification
            isAddingSong : false, //true if must show song's form, false if not
        }
    },
    props:{
        idAlbum : String //id of the album
    },
    components:{ SongForm, SongAndFeat, CommentForm },
    methods:{
      //get data of the album
        async getAlbumDetails(){
            let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
            const response = await axios.get(url).catch(function (error){ //get data or handling error
                Notiflix.Notify.failure(error.message)
            })
            this.albumData = response.data //put data in this.albumData
        },
        //get all song in the album
        async getSongsOfAlbum(){
            let url = this.$store.getters.getApiURL + "songs/onAlbum/" + this.idAlbum;
            await axios.get(url).catch(function (error){ //get data or handling error
                Notiflix.Notify.failure(error.message)
            }).then(response => ( response.data.sort(function(a,b){ //sort songs by id
              if(a.id_song < b.id_song){return -1}
              if(a.id_song > b.id_song){return 1}
              return 0;
            }))).then(response => this.albumSongs = response);//put data in this.albumSongs
        },
        //get data of the album's artist
        async getMainArtist(){
            let url = this.$store.getters.getApiURL + "artists/" + this.albumData.artist;
            const response = await axios.get(url).catch(function(error){ //get data or handling error
                Notiflix.Notify.failure(error.message)
            })
            this.artist = response.data;//put data in this artist
        },
        //get last comments of this album
        async getLastComs(){
            let url = this.$store.getters.getApiURL + "comments/last/" + this.idAlbum;
            const response = await axios.get(url).catch(function(error){ //get data or handling error
                Notiflix.Notify.failure(error.message)
            })
            this.lastComments = response.data; //put data in this.lastComments
        },
        //load and get all data needed to the view
        async loadAll(){
            await this.getAlbumDetails();
            await this.getSongsOfAlbum();
            await this.getMainArtist();
            await this.getLastComs();
        },
        //display error page with message value
        showError(value){
            this.error = true;
            this.errMessage = value;
        },
        //get the cover of the album
        getCover(){
            if(this.albumData.cover === undefined || this.albumData.cover == null || this.albumData.cover.length == 0){ //has a cover
                return require("../assets/covers/default.jpg");
            }
            else{ //has no cover -> show default cover
                return this.albumData.cover;
            }
        },
        //redirect to artist details page
        showArtist(){
            this.$router.push({name: 'artistDetails', params: { id : this.artist.id_artist}});
        },
        //redirect to album form page
        openForm(){
            this.$router.push({name : 'album', params : {idAlbum : this.idAlbum, artistName : this.artist.name}});
        },
        //open a confirm pop asking to delete the album
        deleteConfirm(){
          if (window.confirm('Delete the album ' + this.albumData.title + ' ?')){
              this.delete()
          }
        },
        //delete the album
        async delete(){
          let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
          await axios.delete(url).catch(function (error) { //delete the album or handling error
            let message = error.message;
            this.showError(message)
          })
          this.$router.push({ name: 'artistDetails', params: {id : this.artist.id_artist}}); //redirect to home page
      },
      //show the song form
      openSongForm(){
        this.isAddingSong=true;
      },
      //hide the song form
      hideForm(){
        this.isAddingSong=false;
      },
      //remove song of index : index in album's songs list
      updateList(index){
        Notiflix.Notify.success("Song deleted", {closeButton : true});
        this.albumSongs.splice(index, 1)
      }
    },
    mounted(){ //get all data when mounted
        this.loadAll();
    },
    computed:{
      //return the album release as an array
        date(){
            if(this.albumData.release !==undefined){
                let newDate = this.albumData.release.replace(/ /g, '-')
                newDate = this.albumData.release.replace(/T/g, '-')
                return newDate.split('-');
            }
            else return 0
        },
        //return the title of the album in caps
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
    beforeCreate () { //set bg color tho whitte before create
      document.querySelector('body').setAttribute('style', 'background:white')
    },
    beforeUnmount () { //set background color to empty before unmount
      document.querySelector('body').setAttribute('style', '')
    },
    created(){ //watch router params to redirect to the good page in case of changes
      this.$watch(
        ()=> this.$route.params,
        () =>
          location.reload() //reloading page -> redirecting
      )
    }
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
    border: solid 2px #222;
    object-fit: cover;
}

.tracklist{
  text-align: center;
  grid-column: 1/3;
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
  margin-left: 1%;
  grid-auto-columns: minmax(0, 1fr);
}

#tracklistTitle{
  text-align: center;
  margin-right: 10%;
  grid-column: 1/3;
  grid-row : 1;
}

#commentsTitle{
  grid-column: 3;
  grid-row : 1;
}

.coms{
  grid-column: 3;
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
  margin-right : 2%;
  height: 10%;
}

#updateLogo{
  grid-row : 2;
  padding : 5%;
  background-color : rgba(65, 127, 197, 0.7);
  border-radius : 2px;
}

#deleteLogo{
  grid-row : 1;
  background-color : rgba(196, 48, 48, 0.7);
  padding : 5%;
  border-radius : 2px;
}

#deleteLogo:hover, #updateLogo:hover{
  cursor: pointer;
  opacity: 0.8;
}

.addSongBtn{
  font-size: 14px;
  padding : 5px;
  padding-left : 0;
  padding-right : 0;
  width : 100px;
  border-radius: 5px;
  background-color: #1F9911;
  color : white;
  margin-left : 30%;
}

.addSongBtn:hover{
  cursor : pointer;
  opacity: .8;
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
  .addSongBtn{
    margin-left: 15%;
  }
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
  .addSongBtn{
    margin-left: 25%;
  }
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
      margin-right: 1%;
      margin-left: 1%;
    }
    .bannerContent{
      margin-right: 0;
      grid-column: 1/6;
    }
    .modifLogos{
      grid-column: 6;
    }
    #deleteLogo{
      margin-top: 10%;
    }
    #updateLogo{
      margin-top: 15%;
    }
}

@media screen and (max-width: 350px) {
    .albumBanner{
      height: 200px;
    }
}

</style>