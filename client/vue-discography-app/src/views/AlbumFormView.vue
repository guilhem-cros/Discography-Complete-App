<template>
    <ErrorComponent v-if="error" :mess="this.errMessage"/>
    <div class="form">
        <h2>{{ this.pageTitle }}</h2>
        <p id="reqInfo">* required</p>
        <form class="albumForm" @submit.prevent="submitDatas">
            <label id="albumTitleLab" for="albumTitle">*Title :</label>
            <input id="titleInput" type="text" name="albumTitle" v-model="this.album.title" placeholder="Title of the album"  minlength="1" required>
            <label id="albumReleaseLab" for="albumRelease">*Release :</label>
            <input id="albumRelease" name="albumRelease" type="date" v-model="this.date"/>
            <label id="artistLab" for="searchArtist">*By :</label>
            <div class="searchArtist">
              <input list="artists" name="searchArtist" id="searchArtist" v-model="this.album.artist">
              <datalist id="artists">
                <option v-for="(artist) in this.listArtists" :key="artist.id_artist" :value="artist.id_artist">{{artist.name}}</option>
              </datalist>
            </div>
            <div id="coverInput">
              <label id="coverLab" for="albumCover">Cover of the album :</label>
              <input type="file" name="albumCover" id="albumCover" accept="image/png, image/jpeg, image/jpg" @change="showPreview">
            </div>
            <div name="fade" tag="div" v-if="!this.picture" id="artistPic" >
                <img class="cover" :src="currImg" :alt="this.album.title + '_picture'"/>
            </div>
            <img class="cover" src="../assets/covers/default.jpg" alt="default_cover" v-else/>
            <button class="submitAlbum" type="button" @click="submitData">Submit</button>
      </form>
      <div class="backB" @click="goBack">
        <p id="backText">Back</p>
      </div>
    </div>
    <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import axios from 'axios';
import AlertBox from '../components/AlertBox.vue';
import ErrorComponent from '../components/RequestError.vue'

export default{
    name: 'AlbumForm',
    data(){
        return{
            create : this.idAlbum == -1,
            listArtists : [],
            album : {title : " ", release : null, artist: null, cover : null},
            updates : false,
            picture : this.create,
            currImg : "",
            alertIndex : 0,
            message : "",
            errMessage : "",
            error : false,
            albumCover : null,
            date : "",
        }
    },
    props:{
        idAlbum : String
    },
    components: {AlertBox, ErrorComponent},
    methods : {
        async getArtists(){
            let url = this.$store.getters.getApiURL + "artists";
            await axios.get(url).catch(function (error){
                this.error=true;
                this.errMessage = error.message;
            }).then(response => response.data.sort(function(a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            })).then(response => this.listArtists = response);
        },
        async getAlbum(){
            let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
            await axios.get(url).catch(function (error){
                this.error=true;
                this.errMessage = error.message;
            }).then(response => this.album = response.data);
        },
        async getCurrAlbum(){
            if(!this.create){
                await this.getAlbum();
                this.setCurrImg();
                this.date = this.album.release.substring(0, 10);
            }
            else{
                this.setCurrImg();
            }
        },
        //reset the parameters for the next alert to show
        resetAlert(){
            this.alertIndex = 0;
            this.message ="";
        },
        setCurrImg(){
            if(this.album.cover === undefined || this.album.cover == null || this.album.cover.length == 0){
                this.currImg =  require("../assets/covers/default.jpg");
            }
            else{
                this.currImg =  this.$store.getters.getApiURL +  this.album.cover;
            }
        },
        showPreview(e){
            this.picture = false;
            const file = e.target.files[0];
            this.currImg = URL.createObjectURL(file);
            this.albumCover = file;
        },
        async submitData(){
            const datas = new FormData()
            datas.append('title', this.album.title)
            datas.append('release', this.date)
            datas.append('artist', this.album.artist);
            if(this.albumCover != null){
                datas.append('albumCover', this.albumCover, this.albumCover.name);
            }
            if(this.album.title.length >=1){
                let url = this.$store.getters.getApiURL + "albums";
                if(this.create){
                    await axios.post(url, datas).catch(function (){
                        this.message = "An error occurred, please try again";
                        this.alertIndex = 4; //emit error to display alert
                    }).then(
                        this.message = "Album " + this.album.title + " has been created",
                        this.alertIndex = 1
                    );
                }
                else{
                    await axios.put(url + '/' +  this.idAlbum, datas).catch(function (){
                        this.message = "An error occurred, please try again";
                        this.alertIndex = 4;
                    }).then(
                        this.message = "Album " + this.album.title + " has been updated",
                        this.alertIndex = 1
                    );
                }
                this.updates = true;
                this.title = "";
                this.artist = null;
                this.release=null;
                this.picture = this.create;
            }
        },
    },
    computed : {
        //title of the page : depends if it's a creation or update form
        pageTitle(){
            return this.create ? "Add an album :" : "Update the album :"
        },
    },
    mounted(){
        this.getArtists();
        this.getCurrAlbum();
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:#111110')
    },
    beforeUnmount () {
      document.querySelector('body').setAttribute('style', '')
    },
    created() {
    this.$watch(
      () => this.$route.params,
      () => {
        location.reload()
      }
    )
  },
}
</script>