<template>
  <div class="artistDetails" v-if="!updating">
    <div class="banner" :style="'background-image: url(' + this.getImg() + ')'"></div>
    <div class="modifLogos" v-if="this.$store.getters.adminState">
      <img src="../assets/updateLogo.png" alt="updateLogo" id="updateLogo" title = "Update" @click="openForm">
      <img src="../assets/deleteLogo.png" alt="deleteLogo" id="deleteLogo" title="Delete" @click="deleteConfirm">
    </div>
    <div v-else class="modifLogos">
      <h1></h1><h1></h1>
    </div>
    <div class="artistContent">
      <div class="contentPicture">
        <img :src="this.getImg()" :alt="this.artistDatas.name + '_picture'" class="detailPfp">
      </div>
      <div class="artistInfos">
        <div class="names">
          <h2 id="mainName">{{this.artistDatas.name}}</h2>
          <p id="alias">{{'AKA : ' + this.toStringAlias}}</p>
        </div>
        <div class="genreInfo">
          <p id="mainGenreLab">Main genre</p>
          <p id="mainGenre">{{this.genre.genre}}</p>
        </div>
      </div>
      <ArtistFeats :idArtist="this.id" class="more"/>
      <ArtistAlbums :idArtist="this.id" class="a_albums"/>
    </div>
  </div>
  <ArtistForm :artist="artistDatas" :create="false" v-else @goBack="showDetails" @update="reloadDetails" @updated="showSuccess" @error="showError"/>
</template>

<script>
import axios from 'axios'
import ArtistForm from '../components/ArtistForm.vue';
import ArtistFeats from '../components/ArtistFeats.vue'
import ArtistAlbums from '@/components/ArtistAlbums.vue';
import Notiflix from 'notiflix';


export default {
    name : 'ArtistDetails',
    components: { ArtistForm, ArtistFeats, ArtistAlbums },
    data(){
        return{
            artistDatas : {},
            genre : {},
            imgSrc : this.$store.getters.getApiURL,
            updating : false,
            listAlbum : [{}]
        }
    },
    methods : {
        //get artist data
        async getDatas(){
            let url = this.$store.getters.getApiURL + "artists/"+this.id;
            await axios.get(url).catch(function (error){ //getting the albums and handling errors
                Notiflix.Notify.failure(error.message)
            }).then(response => (this.artistDatas = response.data)); //put date in this.artistDatas
        },
        //get the genre infos of the artist
        async getGenre(){
            let url = this.$store.getters.getApiURL + "genres/" + this.artistDatas.genre;
            await axios.get(url).catch(function (error){ //getting genre infos and handling errors
                Notiflix.Notify.failure(error.message)
            }).then(response => this.genre = response.data)//put data in this.genre
        },
        //load/get all needed data
        async loadAll(){
            await this.getDatas();
            this.getGenre();
        },
        //get artist's picture path
        getImg(){
          //if no picture path saved
          if(this.artistDatas.image === undefined || this.artistDatas.image == null || this.artistDatas.image.length == 0){
            return require("../assets/artists/default.png"); //return default picture path
          }
          else{
            return this.imgSrc +  this.artistDatas.image; //return complete artist picture path
          }
        },
        //display artist form
        openForm(){
          this.updating=true;
        },
        //reload page
        async reloadDetails(){
          location.reload();
        },
        //show success notification
        showSuccess(values){
        let message = "The artist " + values.name + " has been " + values.message + "."
        Notiflix.Notify.success(message, {closeButton : true})
        },
        //display an alert "error" showing 'message'
        showError(message){
          Notiflix.Notify.failure(message, {closeButton : true})
        },
        //change bg color of page and hide artis form
        showDetails(){
          document.querySelector('body').setAttribute('style', 'background:white')
          this.updating=false;
        },
        deleteConfirm(){
          if (window.confirm('Delete the artist ' + this.artistDatas.name + ' ?')){
              this.delete()
          }
      },
      //delete current artist
      async delete(){
          let url = this.$store.getters.getApiURL + "artists/" + this.id;
          await axios.delete(url).catch(function (error) { //delete the genre in the DB
            let message = error.message;
            this.showError(message)
          }).then(
          this.$emit('success', this.artistDatas.name), //success notification
          this.$router.push({ name: 'artists' })); //redirect to artist list page
      },
    },
    props :{
        id : String, //id of the artist
    },
    computed:{
      //to string other names of the artist (array -> string)
      toStringAlias(){
        if(this.artistDatas.other_names !== undefined || this.artistDatas.other_names != null){
          return this.artistDatas.other_names.join()
        }
        else{
          return "";
        }
      },
    },
    async mounted(){
        await this.loadAll(); //get data when mounted
    },
    beforeCreate () { //set bg color before creating
      document.querySelector('body').setAttribute('style', 'background:white')
    },
    beforeUnmount () { //set bg color to empty before creating
      document.querySelector('body').setAttribute('style', '')
    },
    created(){ //watch router params 
      this.$watch(
        () => this.$route.params,//if params modified
        () =>
          location.reload() //reload page -> redirect to page with new params
      )
    }
}

</script>

<style>

.contentPicture{
  grid-column: 1;
  grid-row: 1;
  text-align: center;
}

.detailPfp{
  width: 250px;
  border-radius: 50%;
  border : 3px solid #38ef51;
  background-color: white;
  object-fit: cover;
  height: 250px;
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
  z-index: -1;
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
  display: grid;
  justify-content: end;
  margin-right : 1%
}

#updateLogo{
  grid-row : 2;
  padding : 5%;
  background-color : rgba(65, 127, 197, 0.7);
  border-radius : 2px;
}

#deleteLogo{
  grid-row : 1;
  margin-bottom: 15%;
  background-color : rgba(196, 48, 48, 0.7);
  padding : 5%;
  border-radius : 2px;
}

#deleteLogo:hover, #updateLogo:hover{
  cursor: pointer;
  opacity: 0.8;
}

.artistContent{
  display: grid;
  margin-left: 5%;
}

.artistInfos{
  grid-column: 1;
  grid-row : 2;
  border-bottom: 1px solid lightgrey;
}

.more{
  grid-column: 2;
  grid-row : 2/4;
}

.a_albums{
  margin-top: 2%;
  grid-column: 1;
}

.names{
  margin-top : 2%;
  margin-bottom : 2%;
  text-align: center;
}

#mainName, #alias{
  margin: 0;
  margin-bottom: 5px;
  padding : 0;
}

#mainName{
  color : #272727;
}

#alias{
  font-size:14px;
  color : #222;
}

.a_albums{
  grid-column: 1;
  grid-row: 3;
}

#mainGenreLab{
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 14px;
}
#mainGenre{
  padding-top: 0;
  margin-top: 1%;
  font-weight: bold;
  font-size: 14px;
}

@media screen and (max-width: 1050px){
  .detailPfp{
    width: 25vw;
    max-height: 25vw;
  }
  .banner{
    height : 24vw;
  }
}

@media screen and (max-width: 800px){

  .modifLogos{
    display: inline-flex;
    margin-left: 90%;
  }
  #deleteLogo, #updateLogo{
    margin-top: 5%;
    margin-right: 10%;
  }
}

@media screen and (max-width: 520px){
  .modifLogos{
    margin-left: 85%;;
  }
  #deleteLogo, #updateLogo{
    height: 2.5vh;
  }
  .artistContent{
    margin-left : 1%;
    margin-right: 1%;
  }
}
</style>