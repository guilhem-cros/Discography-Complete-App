<template>
    <div class="songForm">
      <form>
      <p id="formSongTitle">New song :</p>
      <div class="newSong">
          <input type="text" class="newSongInput" placeholder="Song title" v-model="songName" minlength="1" required>
      </div>
      <div v-if="!takeFeats" class="showFeats">
          <p class="takeFeatsBtn" @click="openFeaturings">Add featurings</p>
      </div>
      <div class="songFeats" v-if="takeFeats">
          <p id="featsPreview">{{this.printFeat}}</p>
          <p class="removeAllBtn" @click="removeFeats">Remove all feats</p>
          <div class="feat form-group" v-for="(feat, index) in feats" :key="index">
            <v-select label="name" class="selectA form-control" :options="this.listArtists" v-model="feats[index].id" :reduce="name => name.id_artist" placeholder="Search for an artist"></v-select>
            <span>
                <p class="removeBtn inputBtn fas fa-minus-circle" @click="remove(index)" v-show="index || (!index && feats.length>1)"> - </p>
                <p class="addBtn inputBtn fas fa-plus-circle" @click="add" v-show="index == feats.length-1"> + </p>
            </span>
          </div>
      </div>
      <div class="finalBtn">
        <button class="submitSongBtn" @click="submitSong">Save</button>
        <div class="cancelBtn" @click="closeForm">Cancel</div>
      </div>
    </form>
    </div>
    <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>

</template>

<script>
import vSelect from "vue-select";
import AlertBox from '../components/AlertBox.vue';
import axios from 'axios';

export default {
    name: 'SongForm',
    data(){
        return {
            songName : this.name, //name of the song
            feats : [{ id : ''}], //id of the artist in featuring on this song
            id : 0, //id of the song : 0-> no song
            listArtists : [], //list of all the artists
            takeFeats : !this.create, //pre-open feats form if true, hide it if false
            printFeat : "Feats : ", //string of featurings
            alertIndex : 0, //index of an alert send
            message : '', //message of alerts
            song : {} //data of the song : empty if it's a create
        }
    },
    components: {vSelect, AlertBox},
    props : {
        idAlbum : String, //id of the songs album
        idSong : Number, //id of the song
        name : String, //name of the song
        create : Boolean, //true if create form, false if update form
        featurings : Array, //list of feats on the song
        idArtist : Number, //id of the song's artist
    },
    emits : ['formClosed', 'errorLoading'],
    methods:{
      //get all the artists in db
        async getArtists(){
            let url = this.$store.getters.getApiURL + "artists";
            await axios.get(url).catch(function (error){ //get data or handling errors
                this.$emit('errorLoading', error.message);
            }).then(response => response.data.sort(function(a,b){ //sort data by artist.name
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            })).then(response => this.listArtists = response); //put data in this.listArtists
            this.removeArtistFromList(); //remove the song's author of list
        },
        //post or put song in the db
        async submitSong(){
            let datas = {title : this.songName, album : this.idAlbum, feats : this.getFeatsArray()};
            if(this.songName.length > 0){ //if the song title input isn't empty
                if(this.create){ //if creation
                    let url = this.$store.getters.getApiURL + "songs";
                    await axios.post(url, datas).catch(function (error){//post data or hanfdling error
                        this.alertIndex = 4;
                        this.message = error.message
                    }).then(this.alertIndex = 1, this.message = "Song has been added");//show success notif
                }
                else{ //if update
                    let url = this.$store.getters.getApiURL + "songs/" + this.idSong;
                    await axios.put(url, datas).catch(function (error){ //post data or handling error
                        this.alertIndex = 4;
                        this.message = error.message;
                    }).then(this.alertIndex = 1, this.message = 'Song has been updated');//showSuccesNotif
                }
                location.reload() //reload page to reload the album tracklisk
            }
        },
        //add a song id to feat's list
        add(){
            this.feats.push({id : ''});
        },
        //remove a song's id thos feat's list
        remove(index){
            this.feats.splice(index, 1);
        },
        //show a featuring form
        openFeaturings(){
            this.takeFeats = true;
        },
        //remove all feats of feat's list
        removeFeats(){
            this.takeFeats = false;
            this.feats = [{id : ''}];
        },
        //to string feat's list
        showFeat(){
            this.printFeat = "Feats : "
            for(let f of this.feats){
                let name = this.getArtistName(f.id)
                if(name !== undefined && name != null && name.length>0 ){
                    this.printFeat += name + ", "
                }
            }
        },
        //set feat's list to a compatible array with data submitting 
        setFeats(){
            if(this.featurings.length>0){
                this.feats = []
            }
            for(let f of this.featurings){
                this.feats.push({id : f.id_artist});
            }
        },
        //get the name of the artist with id_artist = id
        getArtistName(id){
            for(let artist of this.listArtists){
                if(artist.id_artist == id){
                    return artist.name
                }
            }
            return "";
        },
        //hide song's form
        closeForm(){
            this.$emit('formClosed')
        },
        getFeatsArray(){
            let featArray = [];
            for(let feat of this.feats){
                if(feat.id != '' && feat.id!=null && feat.id!==undefined){
                    featArray.push(feat.id);
                }
            }
            if(featArray[0] == null && featArray.length==1){
                return []
            }
            return featArray;
        },
        //reset the parameters for the next alert to show
        resetAlert(){
            this.alertIndex = 0;
            this.message ="";
        },
        //remove the song's artist of this.listArtists
        removeArtistFromList(){
            let deleted = false
            let i = 0;
            while(i<this.listArtists.length && !deleted){ //while list hasnt been entirely red or the song artist hasn't been removed
                if(this.listArtists[i].id_artist == this.idArtist){ 
                    this.listArtists.splice(i, 1);
                    deleted = true;
                }
                i++;
            }
        }
    },
    watch:{
        feats : { //watching this.feats -> if updated -> update the string display of the list
            deep : true,
            handler(){
                this.showFeat();
            }
        }
    },
    mounted(){ //get data and set form when mounted
        this.getArtists();
        this.setFeats();
    },
    beforeCreate(){
      let script1 = document.createElement('script')
      script1.setAttribute('src', "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js")
      document.head.appendChild(script1);
    },
}
</script>

<style>
@import url("https://unpkg.com/vue-select@latest/dist/vue-select.css");

.selectA{
  width: 100%;
  grid-column: 1;
  text-align: center;
}

.inputBtn{
  border-radius: 5px;
  font-size: 14px;
  color : white;
  font-style : normal;
  text-align: center;
  display: inline-flex;
}

.submitSongBtn{
  color : white;
  font-size: 14px;
  font-weight: lighter;
  padding : 5px;
  padding-left : 0;
  padding-right : 0;
  border-radius: 5px;
  margin-bottom: 10%;
  border : none;
}

.addBtn, .submitSongBtn{
  background-color: #1F9911;
}

.addBtn, .removeBtn{
  margin: 1%;
}

.addBtn{
  width: 15px;
  padding-left: 6px;
}

.removeBtn{
  width: 12px;
  padding-left : 7px;
  background-color: #F62222;
  margin-right: 5%;
}

.addBtn:hover, .removeBtn:hover, .removeAllBtn:hover, .takeFeatsBtn:hover, .cancelBtn:hover, .submitSongBtn:hover{
  cursor: pointer;
  opacity: 0.8;
}

.takeFeatsBtn, .removeAllBtn{
  text-decoration: underline;
  font-size: 14px
}

.takeFeatsBtn{
  color: #1F9911;
  text-align: left;
  width: 100px;
}

.removeAllBtn{
  color: #E7891F;
  margin-bottom: 2%;
  margin-top: 0;
}

.cancelBtn{
  font-size: 14px;
  text-decoration: underline;
  color: #7E4300;
  width: 45px;
}

.finalBtn{
  display: flex;
  flex-direction: column;
  width: 100px;
  text-align: center;
  margin-bottom: 0;
}

.songForm{
  text-align: center;
  width: 40%;
  margin-left: 25%;
  border: 1px solid lightgray;
  text-align: left;
  padding: 1%;
  margin-bottom: 2%;
}

.newSongInput{
  border-radius: 3px;
  font-size: 16px;
  line-height: 2em;
  border: 1px lightgrey solid;
  border-radius: 2px;
  outline: none;
  width: 80%;
  font-weight: bold;
}

.feat{
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  margin-bottom: 2%;
}

.feat>span{
  grid-column: 2;
  text-align: left;
  margin-left: 5%;
}

.songFeats{
  margin-bottom: 5%;
}

.songFeats > p{
  text-align: left;
}

#featsPreview{
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
}

#formSongTitle{
  padding: 0;
  margin : 0;
  margin-bottom: 2%;
  font-weight: bold;
  font-size: 16px;
  margin-left: 1%;
}

@media screen and (max-width: 1100px){
  .songForm{
    width: 60%;
    margin-left: 20%;
  }
}

@media screen and (max-width: 900px){
  .songForm{
    margin-left: 10%;
    width: 70%;
  }
}

@media screen and (max-width: 700px){
  .songForm{
    margin-left: 20%;
    width: 60%;
  }
}

@media screen and (max-width: 500px){
  .songForm{
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
  }
}

</style>