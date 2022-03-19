<template>
  <ErrorComponent v-if="error" :mess="this.errMessage"/>
  <div class="artistList" v-if="this.displayIndex==0">
  <div class="titleDiv">
    <h2 id="artistTitle">All artists : </h2>
    <div class="addButt">Add new</div>
  </div>
  <div class="listArtists">
    <div v-for="(artist, index) in this.listArtists" :key="artist.id_artist" class="artist" :class="'col_' + index%4" @click="showDetails(index)">
      <img :src="this.makePfp(artist.id_artist)" :alt="artist.name + '_picture'" width="100" class="pfp">
      <p class="artistName">{{ artist.name }}</p>
    </div>
  </div>
  </div>
  <ArtistDetails :artistDatas="this.currentArtist" v-if="this.displayIndex == 1"/>
  <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import AlertBox from '../components/AlertBox.vue';
import ErrorComponent from '../components/RequestError.vue'
import ArtistDetails from '../components/ArtistDetails.vue'
import axios from 'axios';

export default ({
    name : 'ArtistView',
    components: {AlertBox, ErrorComponent, ArtistDetails},
    data(){
        return{
            listArtists : [], //list of all artists
            displayIndex : 0, //index of what is currently displayed in the view
            alertIndex : 0, //index of the alert notif : 0 = hide alerts
            message : "", //message for the alerts notifications
            error : false, //boolean : true if and error happens during loading datas,
            errMessage : "",//message send during the error
            currentArtist : {}
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

      },
      showDetails(id){
        this.currentArtist = this.listArtists[id];
        console.log(this.currentArtist)
        this.displayIndex = 1;
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

.artistButton{
  font-size : 15px;
  font-weight: bold;
}

.artistButton:hover{
  cursor: pointer;
}

.listArtists{
  padding : 2%;
  padding-bottom: 1%;
  border-radius: 5px;
  display : grid;
}

.col_0{
  grid-column: 1;
}

.col_1{
  grid-column : 2;
}

.col_2{
  grid-column: 3;
}

.col_3{
  grid-column: 4;
}
.artistList{
  margin-left : 10%;
  margin-right: 10%;
}

#artistTitle{
  color : white;
  text-align: left;
}

.artist{
  background-color: white;
  margin: 4%;
  border-radius: 4px;
  padding : 1%;
}

.artist:hover{
  cursor: pointer;
  opacity: 0.9;
  margin: 1%;
  padding: 0;
  zoom : 101%;
}

.artistName{
  font-weight: bold;
}

.pfp{
  margin : 1%;
  border-radius: 50px;
}

</style>