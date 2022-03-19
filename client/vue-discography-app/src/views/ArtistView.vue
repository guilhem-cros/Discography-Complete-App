<template>
  <ErrorComponent v-if="error" :mess="this.errMessage"/>
  <div class="titleDiv">
    <h2 id="artistTitle">All artists</h2>
    <div class="addButt">Add new</div>
  </div>
  <div class="list">
    <div v-for="(artist, index) in this.listArtists" :key="artist.id_artist" class="artist">
      <img :src="this.makePfp(artist.id_artist)" :alt="artist.name + '_picture'" width="50">
      <p class="artistName">{{ artist.name }}</p>
      <div class="updateButt artistButton" @click="callUpdate(artist.name, artist.other_names, artist.genre)">Update</div>
      <div class="deleteButt artistButton" @click="deleteConfirm(artist.name, artist.id_artist, index)">Delete</div>
    </div>
  </div>

  <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import AlertBox from '../components/AlertBox.vue';
import ErrorComponent from '../components/RequestError.vue'
import axios from 'axios';

export default ({
    name : 'ArtistView',
    components: {AlertBox, ErrorComponent},
    data(){
        return{
            listArtists : [], //list of all artists
            displayIndex : 0, //index of what is currently displayed in the view
            currentArtist : {id : -1, name : "", other_names : [], genre : -1},
            alertIndex : 0, //index of the alert notif : 0 = hide alerts
            message : "", //message for the alerts notifications
            error : false, //boolean : true if and error happens during loading datas,
            errMessage : ""//message send during the error
        }
    },
    methods:{
    //get all the artists in the DB and all their values : launch when the page is opened
      async getListArtists(){
        if(this.listArtists.length == 0){
            let url = this.$store.getters.getApiURL + "artists";  //url to te request datas
            await axios.get(url).catch(function (error){ //getting datas and handling errors
                this.error = true;
                this.errMessage = error.message;
            }).then(response => (response.data.sort(function(a,b){ //sort the returned list by name of artist
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            }))).then(response => this.listArtists = response); //associate sorted data to listArtists
        }
      },
      //reset the parameters for the next alert to show
      resetAlert(){
          this.alertIndex = 0;
          this.message ="";
      },
      //get the image at src if it exists, get the default pfp instead
      makePfp(id){
        try{
            return require("../assets/artists/"+id+"_pfp.jpg"); //search a .jpg file
        } catch (err){
            try{
                return require("../assets/artists/"+id+"_pfp.png"); //search a .png file
            } catch (error){
                return require("../assets/artists/default.png"); //get the default pfp file
            }
        }

      }
    },
    mounted(){
      this.getListArtists();
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:#111110')
    },
    beforeUnmount () {
      document.querySelector('body').setAttribute('style', '')
    },
})
</script>

<style>

</style>