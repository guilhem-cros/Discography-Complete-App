<template>
  <div class="artistList" v-if="this.displayList">
  <div class="titleDiv">
    <h2 id="artistTitle">All the artists : </h2>
    <div class="addB" @click="openForm" v-if="this.$store.getters.adminState">Add new</div>
  </div>
  <div class="listArtists">
    <div v-for="(artist, index) in this.listArtists" :key="artist.id_artist" class="artist" :class="'col_' + index%6" @click="showDetails(index)">
      <img :src="this.getImg(artist)" :alt="artist.name + '_picture'" class="pfp">
      <p class="artistName">{{ artist.name }}</p>
    </div>
  </div>
  </div>
  <ArtistForm :artist="{}" :create="true" v-else @goBack="showList" @updateList="updateList" @updated="showSuccess" @error="showError"/>
</template>

<script>

import ArtistForm from '../components/ArtistForm.vue'
import axios from 'axios';
import Notiflix from 'notiflix';

export default ({
    name : 'ArtistView',
    components: {ArtistForm},
    data(){
        return{
            listArtists : [], //list of all artists
            displayList : true, //index of what is currently displayed in the view
            currentArtist : {},
            imgSrc : this.$store.getters.getApiURL,
        }
    },
    methods:{
    //get all the artists in the DB and all their values : launch when the page is opened
      async getListArtists(){
        if(this.listArtists.length == 0){
            let url = this.$store.getters.getApiURL + "artists";  //url to te request datas
            await axios.get(url).catch(function (error){ //getting datas and handling errors
                Notiflix.Notify.failure(error.message)
            }).then(response => (response.data.sort(function(a,b){ //sort the returned list by name of artist
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            }))).then(response => this.listArtists = response); //associate sorted data to listArtists
        }
      },
      //redirect to artist details page
      showDetails(id){
        this.currentArtist = this.listArtists[id];
        this.$router.push({ name: 'artistDetails', params: { id: this.currentArtist.id_artist } })
      },
      //get the image at src if it exists, get the default pfp instead
      getImg(a){
        if(a.image === undefined || a.image == null || a.image.length == 0){
          return require("../assets/artists/default.png");
        }
        else{
          return a.image;
        }
      },
      //show artist form and hide list
      openForm(){
        this.displayList=false;
      },
      //show list and hide form
      showList(){
        this.displayList=true;
      },
      //update the artist list calling the db
      async updateList(){
        this.listArtists = [];
        await this.getListArtists()
        this.displayList = true;
      },
      //display success alert
      showSuccess(values){
        let message = "The artist " + values.name + " has been " + values.message + "."
        Notiflix.Notify.success(message, {closeButton : true})
      },
      //display an alert "error" showing 'message'
      showError(message){
          Notiflix.Notify.failure(message, {closeButton : true})
      },
    },
    mounted(){ //get all artists when mounted
      this.getListArtists();
    },
    beforeCreate () { //set gb color when creating
      document.querySelector('body').setAttribute('style', 'background:#111110')
    },
    beforeUnmount () { //reset bg color when unmounting
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
  grid-auto-columns: minmax(0, 1fr);
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
.col_4{
  grid-column: 5;
}
.col_5{
  grid-column: 6;
}

.artistList{
  margin-left : 10%;
  margin-right: 10%;
  margin-bottom: 5%;
}

#artistTitle{
  color : white;
  text-align: left;
}

.artist{
  color : white;
  margin: 4%;
  border-radius: 4px;
  padding : 1%;
  max-height: none;
  text-align: center;
}

.artist:hover{
  cursor: pointer;
  opacity: 0.8;
}

.artistName{
  font-weight: bold;
  font-size : 16px;
  max-width: 100%;
  max-height: none;
}

.pfp{
  background-position: center;
  background-size: cover;
  margin : 1%;
  border-radius: 50%;
  border : 3px solid white;
  width: 100px;
  object-fit: cover;
  height: 100px;
  background-color: whitesmoke;
}

.addB:hover{
  cursor: pointer;
  opacity: 0.8;
}

.addB{
  background-color: white;
  width : 10%;
  color: #1F9911;
  font-size : 16px;
  font-weight: bold;
  padding : 10px;
  border-radius: 3px;
  margin-left : 85%;
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

@media screen and (max-width: 1300px){
  .listArtists{
    padding :0;
  }
  .artist{
    margin-left : 3%;
    margin-right: 3%;
  }
  .artistList{
    margin-left : 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 1050px) {
  .artistList{
    margin-left : 1%;
    margin-right: 1%;
  }
  .artistName{
    padding : 0;
  }
  .addB{
    width : 15%;
    margin-left: 80%;
  }
}

@media screen and (max-width: 800px) {
  .col_3{
    grid-column: 1;
  }
  .col_4{
    grid-column: 2;
  }
  .col_5{
    grid-column: 3;
  }
  .addB{
    width : 35%;
    margin-left: 55%;
  }
}

@media screen and (max-width: 350px) {
  .col_2{
    grid-column: 1;
  }
  .col_3{
    grid-column: 2;
  }
  .col_4{
    grid-column: 1;
  }
  .col_5{
    grid-column: 2;
  }
  .artistList{
    margin-left : 5%;
    margin-right: 5%;
  }
  .listArtists{
    padding-right: 2%;
    padding-left: 2%;
  }
  .artist{
    margin: 2%;
  }
}
</style>