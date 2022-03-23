<template>
  <ErrorComponent v-if="error" :mess="this.errMessage"/>
  <div class="artistDetails" v-if="!updating">
    <div class="banner" :style="'background-image: url(' + this.getImg() + ')'"></div>
    <div class="modifLogos">
      <img src="../assets/updateLogo.png" alt="updateLogo" id="updateLogo" title = "Update" @click="openForm">
      <img src="../assets/deleteLogo.png" alt="deleteLogo" id="deleteLogo" title="Delete" @click="deleteConfirm">
    </div>
    <img :src="this.getImg()" :alt="this.artistDatas.name + '_picture'" class="detailPfp">
    <div class="artistInfos">
      <h1>{{this.artistDatas.name}}</h1>
      <p>{{this.artistDatas.genre}}</p>
      <p>{{this.albumList}}</p>
    </div>
  </div>
  <ArtistForm :artist="artistDatas" :create="false" v-else @goBack="showDetails" @update="reloadDetails" @updated="showSuccess" @error="showError"/>
  <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import axios from 'axios'
import ArtistForm from '../components/ArtistForm.vue';
import AlertBox from '../components/AlertBox.vue';
import ErrorComponent from '../components/RequestError.vue';

export default {
    name : 'ArtistDetails',
    components: {ArtistForm, AlertBox, ErrorComponent},
    data(){
        return{
            artistDatas : {},
            message : "", //message for the alerts notifications
            alertIndex : 0,
            albumList : [],
            genre : {},
            imgSrc : this.$store.getters.getApiURL,
            updating : false,
            error : false,
            errMessage : "",

        }
    },
    methods : {
        //get artist data
        async getDatas(){
            let url = this.$store.getters.getApiURL + "artists/"+this.id;
            await axios.get(url).catch(function (error){ //getting the albums and handling errors
                this.error = true;
                this.errMessage = error.message;
            }).then(response => (this.artistDatas = response.data));
        },
        //get all the albums of the artist
        async getAlbums(){
            if(this.albumList.length == 0){
                let url = this.$store.getters.getApiURL + "artists/albums/"+this.id;
                await axios.get(url).catch(function (error){ //getting the albums and handling errors
                    this.error = true;
                    this.errMessage = error.message;
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
            await axios.get(url).catch(function (error){ //getting genre infos and handling errors
                this.error = true;
                this.errMessage = error.message;
            }).then(response => this.genre = response.data)
        },
        async loadAll(){
            await this.getDatas().then(
            this.getAlbums()),
            this.getGenre();
        },
        getImg(){
          if(this.artistDatas.image === undefined || this.artistDatas.image == null || this.artistDatas.image.length == 0){
            return require("../assets/artists/default.png");
          }
          else{
            return this.imgSrc +  this.artistDatas.image;
          }
        },
        openForm(){
          this.updating=true;
        },
        async reloadDetails(){
          location.reload();
        },
        showSuccess(values){
        this.message = "The artist " + values.name + " has been " + values.message + "."
        this.alertIndex = 1;
        },
        //display an alert "error" showing 'message'
        showError(message){
          this.message = message;
          this.alertIndex = 4;
        },
        showDetails(){
          document.querySelector('body').setAttribute('style', 'background:white')
          this.updating=false;
        },
         //reset the parameters for the next alert to show
        resetAlert(){
          this.alertIndex = 0;
          this.message ="";
        },
        //confirmation for removing an artist
        deleteConfirm(){
          if (window.confirm('Delete the artist ' + this.artistDatas.name + ' ?')){
              this.delete()
          }
      },
      async delete(){
          let url = this.$store.getters.getApiURL + "artists/" + this.id;
          await axios.delete(url).catch(function (error) { //delete the genre in the DB
            let message = error.message;
            this.showError(message)
          }).then(
          this.$emit('success', this.artistDatas.name),
          this.$router.push({ name: 'artists' }));
      },
    },
    props :{
        id : String,
    },
    mounted(){
        document.querySelector('body').setAttribute('style', 'background:white')
        this.loadAll();
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

.detailPfp{
  width: 250px;
  border-radius: 50%;
  border : 3px solid #38ef51;
  display: flex;
  margin-left : 25%;
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


@media screen and (max-width: 1050px){
  .detailPfp{
    width: 25%;
    margin-left: 15%;
    max-height: 25vw;
  }

  .banner{
    height : 24vw;
  }
}
@media screen and (max-width: 800px){
  .detailPfp{
    margin-left: 5%;
  }

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
}
</style>