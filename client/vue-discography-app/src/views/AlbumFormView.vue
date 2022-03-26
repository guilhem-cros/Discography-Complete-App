<template>
    <div class="form" v-if="this.$store.getters.adminState">
        <h2>{{ this.pageTitle }}</h2>
        <p id="reqInfo">* required</p>
        <form class="albumForm" @submit.prevent="submitDatas">
            <label id="albumTitleLab" for="albumTitle">*Title :</label>
            <input id="titleInput" type="text" name="albumTitle" v-model="this.title" placeholder="Title of the album"  minlength="1" required/>
            <div id="artistLab" for="searchArtist">*By :</div>
            <div class="selectBox">
                <v-select label="name" class="select" :options="this.listArtists" v-model="this.idArtist" :reduce="name => name.id_artist" placeholder="Search for an artist"></v-select>
            </div>
            <label id="albumReleaseLab" for="albumRelease">**Release :</label>
            <input id="albumRelease" name="albumRelease" type="date" v-model="this.date" required/>
            <p id="releaseInfo">**Please add one day to the release date</p>
            <div id="coverInput">
              <label id="coverLab" for="albumCover">Cover of the album :</label>
              <input type="file" name="albumCover" id="albumCover" accept="image/png, image/jpeg, image/jpg" @change="showPreview" placeholder="Chose an image">
            </div>
            <div name="fade" tag="div" v-if="!this.picture" id="albumCover">
                <img class="cover" :src="currImg" :alt="this.title + '_picture'"/>
            </div>
            <img class="cover" src="../assets/covers/default.jpg" alt="default_cover" v-else/>
            <button class="submitAlbum" @click="submitData">Submit</button>
      </form>
      <div class="backB" @click="goBack">
        <p id="backText">Back</p>
      </div>
    </div>
    <div v-else>
      <h2 id="nonAdmin">Error : you don't have the permission to access this page.</h2>
    </div>
    <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import axios from 'axios';
import AlertBox from '../components/AlertBox.vue';
import vSelect from "vue-select";



export default{
    name: 'AlbumForm',
    data(){
        return{
            create : this.idAlbum == -1, //true if creation, false if update
            album : {title : "", release : null, artist : null, cover : ""}, //the updating album of empty if create
            listArtists : [],//all artists list
            title : "", //title of the album
            updates : false, 
            picture : this.create, //true if there is a picture to show, false if not
            name : this.artistName, //name of the album's artist
            idArtist : null, //id of the album artist
            currImg : "", //current image displayed
            alertIndex : 0, //index of thez alert
            message : "", //message of the alert (notif)
            errMessage : "", //error page's message
            error : false, //true if showing error page, false if not
            albumCover : null, //path to the album cover
            date : "", //date of release of the album
        }
    },
    props:{
        idAlbum : String, //id of the album -> -1 id creating
        artistName : String, //name of the album's artist -> empty if creating
    },
    components: {AlertBox, vSelect},
    methods : {
      //get all artists
        async getArtists(){
            let url = this.$store.getters.getApiURL + "artists";
            await axios.get(url).catch(function (error){ //get artists or handle erroe
                this.error=true;
                this.errMessage = error.message;
            }).then(response => response.data.sort(function(a,b){ //sort artists by name
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            })).then(response => this.listArtists = response);
        },
        //get album data
        async getAlbum(){
            let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
            await axios.get(url).catch(function (error){ //get data or handle error
                this.error=true;
                this.errMessage = error.message;
            }).then(response => this.album = response.data); //put data in this .album
        },
        //prepare album to be displayed in form
        async getCurrAlbum(){
            if(!this.create){ //if it's an update form
                await this.getAlbum(); //get album data
                //prepare ans assign data
                this.date = this.album.release.substring(0, 10);
                this.idArtist = this.album.artist;
                this.title = this.album.title;
            }
            this.setCurrImg(); //set img to display

        },
        //reset the parameters for the next alert to show
        resetAlert(){
            this.alertIndex = 0;
            this.message ="";
        },
        //set this.currImg to the path to album img if it exists, if not  -> default image's path
        setCurrImg(){
            if(this.album.cover === undefined || this.album.cover == null || this.album.cover.length == 0){
                this.currImg = require("../assets/covers/default.jpg");
            }
            else{
                this.currImg=  this.$store.getters.getApiURL +  this.album.cover;
            }
        },
        //show the preview of an image uploaded in input by user
        showPreview(e){
            this.picture = false;
            const file = e.target.files[0];
            this.currImg = URL.createObjectURL(file);
            this.albumCover = file;
        },
        //submit data
        async submitData(){
            if(this.title.length >= 1 && this.date.length > 1 && this.idArtist != null){
                const datas = new FormData()
                datas.append('title', this.title)
                datas.append('release', this.date)
                datas.append('artist', this.idArtist);
                if(this.albumCover != null){ //if an image has been passed
                    datas.append('albumCover', this.albumCover, this.albumCover.name); //add image to data
                }
                if(this.title.length >=1){
                    let url = this.$store.getters.getApiURL + "albums";
                    if(this.create){ //if create
                        await axios.post(url, datas).catch(function (){ //post data and handling errors
                            this.message = "An error occurred, please try again";
                            this.alertIndex = 4; //emit error to display alert
                        }).then( response =>
                            this.$router.push({name : 'albumDetails', params: {idAlbum : response.data.id_album}}) //redirect to this new albums details page
                        );
                    }
                    else{
                        await axios.put(url + '/' +  this.idAlbum, datas).catch(function (){ //put data or handling error
                            this.message = "An error occurred, please try again";
                            this.alertIndex = 4;
                        }).then(
                            this.$router.push({name : 'albumDetails', params : {idAlbum : this.idAlbum}}) //redirect to this album details page
                        );
                    }
                    this.picture = this.create //reinit this.picture
                }
            }
        },
        //go back to precedent page
        goBack(){
            if(this.create){ //if create
                this.$router.push({name : 'home'}); //back to homepage
            }
            else{ //if update
                this.$router.push({name: 'albumDetails', params: { id: this.idAlbum}}) //back to details page
            }
        }
    },
    computed : {
        //title of the page : depends if it's a creation or update form
        pageTitle(){
            return this.create ? "Add an album :" : "Update the album :"
        },
    },
    mounted(){
        //importing some scripts for search bar
        this.getArtists();
        this.getCurrAlbum();
    },
    beforeCreate () { //set bg color before creating
      document.querySelector('body').setAttribute('style', 'background:#111110');
    },
    beforeUnmount () { //set bg color empty before unmounting
      document.querySelector('body').setAttribute('style', '')
    },
    created() {
    this.$watch( //watch router params
      () => this.$route.params, //if params are modified -> redirect to new page
      () => {
        location.reload() //reload -> redirect to params's linked page
      }
    )
  },
}
</script>

<style>
@import url("https://unpkg.com/vue-select@latest/dist/vue-select.css");

.form{
  color : white;
  margin-left : 10%;
  margin-right : 10%;
  margin-top : 2%;
  text-align: left;
  font-weight : bold;
}

.albumForm{
  margin-left : 5%;
  margin-top : 2%;
  display : grid;
  grid-auto-columns: minmax(0, 1fr);
}

#albumTitleLab{
  grid-row: 1;
  line-height: 1.4em;
}

#titleInput{
  grid-row : 2;
  width : 80%;
  height:2.4em;
  font-size : 14px;
  font-weight: bold;
  outline: none;
  border : 2px grey solid;
  border-radius : 3px;
}

#artistLab{
  grid-row : 3;
  line-height: 1.4em;
}

.selectBox{
  grid-row : 4;
  width : 80%;
}

.select{
  background-color: white;
  border-radius: 3px;
  line-height:1.6em;
  color : black;
  font-weight: bold;
  font-size : 14px;
  border : 2px grey solid;
  border-radius : 3px;
}

#albumReleaseLab{
  line-height: 1.4em;
  grid-row : 5;
}

#albumRelease{
  grid-row : 6;
  width : 80%;
  height:2.2em;
  font-size : 14px;
  outline: none;
  border : 2px grey solid;
  border-radius : 3px;
}

#albumCover{
  grid-column: 2;
  grid-row: 1/6;
  text-align: center;
}

#titleInput, #albumRelease, .select{
  margin-bottom: 3%;
}

.submitAlbum{
  grid-row : 8;
  grid-column: 1;
  background-color: #3f3f3c;
  border-radius: 4px;
  border: rgb(104, 99, 99) 1px solid;
  color: white;
  margin-top: 2%;
  padding-left : 0;
  padding-right : 0;
  padding-bottom: 1%;
  padding-top: 1%;
  width: 17%;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.submitAlbum:hover{
  cursor: pointer;
  opacity: 0.8;
}

.cover{
  background-position: center;
  background-size: cover;
  width : 300px;
  height: 300px;
  object-fit: cover;
  padding: 1%;
  background-color: #FFE469;
}

#coverInput{
  text-align: center;
  grid-row : 6;
  grid-column : 2;
  display: inline-flex;
  flex-direction: column;
}

#coverInput > *{
    margin: 0 auto;
}

.backB{
  margin-top : 5%;
  text-align: center;
  font-size : 18px;
  padding-bottom :0px;
  border : solid, 1px, grey;
  color : #FFE469;
  text-decoration: underline;
}

.backB:hover{
  cursor: pointer;
  color : gold;
}

#reqInfo, #releaseInfo{
  color: grey;
  font-size : 12px;
  font-weight: bold;
}

#nonAdmin {
  color : white;
  margin-top : 5%;
}

@media screen and (max-width: 1050px){
  .cover{
    width: 250px;
    height: 250px;
  }
  .form{
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 800px){
  .form{
    margin-left: 1%;
    margin-right: 1%;
  }
}

@media screen and (max-width: 700px){
  .form{
    margin-bottom : 5%
  }
  #releaseInfo{
    grid-row: 7;
  }
  #albumCover{
    grid-column: 1;
    grid-row: 8;
  }
  #coverInput{
    grid-row: 9;
    grid-column: 1;
    margin-bottom: 5%;
  }
  .submitAlbum{
    grid-row: 11;
  }
  #titleInput, #albumRelease, .selectBox{
    width : 90%;
  }
}
</style>