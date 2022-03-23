<template>
    <div class="songForm">
      <div class="newSong">
          <input type="text" class="newSongInput" placeholder="Song title" v-model="songName">
      </div>
      <div v-if="!takeFeats">
          <p class="takeFeatsBtn" @click="openFeaturings">Add featurings</p>
      </div>
      <div class="songFeats" v-if="takeFeats">
          <p id="featsPreview">{{this.printFeat}}</p>
          <p class="removeAllBtn" @click="removeFeats">Remove all feats</p>
          <div class="feat form-group" v-for="(feat, index) in feats" :key="index">
            <v-select label="name" class="select form-control" :options="this.listArtists" v-model="feats[index].id" :reduce="name => name.id_artist" required placeholder="Search for an artist"></v-select>
            <span>
                <i class="removeBtn inputBtn fas fa-minus-circle" @click="remove(index)" v-show="index || (!index && feats.length>1)"> remove </i>
                <i class="addBtn inputBtn fas fa-plus-circle" @click="add" v-show="index == feats.length-1"> add </i>
            </span>
          </div>
      </div>
      <div class="finalBtn">
        <div class="addSongBtn" @click="submitSong">Save</div>
        <div class="cancelBtn" @click="closeForm">Cancel</div>
      </div>
      <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
    </div>

</template>

<script>
import vSelect from "vue-select";
import AlertBox from '../components/AlertBox.vue';
import axios from 'axios';

export default {
    name: 'SongForm',
    data(){
        return {
            songName : "",
            feats : [{ id : ''}],
            id : 0,
            listArtists : [],
            takeFeats : false,
            printFeat : "Feats : ",
            alertIndex : 0,
            message : ''
        }
    },
    components: {vSelect, AlertBox},
    props : {
        idAlbum : String
    },
    methods:{
        async getArtists(){
            let url = this.$store.getters.getApiURL + "artists";
            await axios.get(url).catch(function (error){
                this.$emit('errorLoading', error.message);
            }).then(response => response.data.sort(function(a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                return 0;
            })).then(response => this.listArtists = response);
        },
        async submitSong(){
            if(this.songName.length > 0){
                let url = this.$store.getters.getApiURL + "songs";
                let datas = {title : this.songName, album : this.idAlbum, feats : this.getFeatsArray()};
                await axios.post(url, datas).catch(function (error){
                    this.alertIndex = 4;
                    this.message = error.message
                }).then(this.alertIndex = 0, this.message = "Song has been added");
            }
        },
        add(){
            this.feats.push({id : ''});
        },
        remove(index){
            this.feats.splice(index, 1);
        },
        openFeaturings(){
            this.takeFeats = true;
        },
        removeFeats(){
            this.takeFeats = false;
            this.feats = [{id : ''}];
        },
        showFeat(){
            this.printFeat = "Feats : "
            for(let f of this.feats){
                let name = this.getArtistName(f.id)
                if(name !== undefined && name != null && name.length>0 ){
                    this.printFeat += name + ", "
                }
            }
        },
        getArtistName(id){
            for(let artist of this.listArtists){
                if(artist.id_artist == id){
                    return artist.name
                }
            }
            return "";
        },
        closeForm(){
            this.$emit('formClosed')
        },
        getFeatsArray(){
            let featArray = [];
            for(let feat of this.feats){
                if(feat.id != ''){
                    featArray.push(feat.id);
                }
            }
            return featArray;
        },
        //reset the parameters for the next alert to show
        resetAlert(){
            this.alertIndex = 0;
            this.message ="";
        },
    },
    watch:{
        feats : {
            deep : true,
            handler(){
                this.showFeat();
            }
        }
    },
    mounted(){
        this.getArtists();
    },
    beforeCreate(){
      let script1 = document.createElement('script')
      script1.setAttribute('src', "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js")
      document.head.appendChild(script1)
    },
}
</script>

<style>
@import url("https://unpkg.com/vue-select@latest/dist/vue-select.css");

.select{
  width: 400px;
}

.inputBtn{
  border-radius: 5px;
  font-size: 12px;
  color : white;
  font-style : normal;
  text-align: center;
}

.removeBtn{
  background-color: #F62222;
}

.addBtn, .submitSongBtn{
  background-color: #1F9911;
}

.addBtn, .removeBtn{
  padding-left: 4px;
  padding-right: 4px;
  margin: 1%;
}

.addBtn:hover, .removeBtn:hover, .removeAllBtn:hover, .takeFeatsBtn:hover, .cancelBtn, .addSongBtn{
  cursor: pointer;
  opacity: 0.8;
}

.takeFeatsBtn, .removeAllBtn{
  text-decoration: underline;
  font-size: 14px
}

.takeFeatsBtn{
  color: #1F9911;
}
.removeAllBtn{
  color: #E7891F
}

.cancelBtn{
  font-size: 16px;
  text-decoration: underline;
  color: #7E4300;
}

.cancelBtn{
  font-size: 14px;
}
.finalBtn{
  display: flex;
}

</style>