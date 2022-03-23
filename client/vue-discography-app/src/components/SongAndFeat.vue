<template>
    <div class="tracks">
      <p id="titleSong">{{this.songName.toUpperCase()}}</p>
      <div class="song">
        <p v-for="(feat, index) in this.feats" :key="index" @click="showArtist(index)">{{(index==0? "(Ft. " : ", ") + feat.name + (index==this.feats.length-1 ? ")" : "") }} </p>
      </div>
      <div class="updateImg">
        <img src="../assets/updateLogo.png" alt="update_logo" title="Update" class="updLogo" id="updtLogo" @click="openForm">
        <img src="../assets/deleteLogo.png" alt="delete_logo" title="Delete song" class="updLogo" id="delLogo" @click="confirmDelete">
      </div>
    </div>
    <div class="updateSong" v-if="update">
      <SongForm :idAlbum="this.idAlbum" :create="false" :name="this.songName" :idSong="this.idSong" @errorLoading="showError" @formClosed="hideForm"/>
    </div>
</template>

<script>
import axios from "axios";
import SongForm from '../components/SongForm.vue';


export default {
    name : 'SongAndFeat',
    emits : ['loadingError', 'deleted'],
    data(){
        return {
            feats : [],
            update : false
        }
    },
    components: {SongForm},
    props:{
        idSong : Number,
        songName : String,
        index : Number, 
        idAlbum : String
    },
    methods: {
        async getFeats(){
            let url = this.$store.getters.getApiURL + "songs/feats/" + this.idSong;
            await axios.get(url).catch(function (error){
                this.$emit('loadingError', error.message);
            }).then(response => this.feats = response.data);
        },
        showArtist(index){
            this.$router.push({name: 'artistDetails', params: { id : this.feats[index].id_artist}});
        },
        confirmDelete(){
          if(window.confirm("Remove " + this.songName + " from the album ?")){
            this.delete()
          }
        },
        async delete(){
          let url = this.$store.getters.getApiURL + "songs/" + this.idSong;
          await axios.delete(url).catch(function (error){
            this.$emit("loadingError", error.message);
          }).then(this.$emit('deleted', this.index));
        },
        openForm(){
          this.update = true;
        },
        showError(message){
          this.$emit('loadingError', message);
        },
        hideForm(){
          this.update = false;
        }
    },
    mounted() {
        this.getFeats();
    },
}

</script>

<style>

.tracks{
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0;
  color : #1C1C1C;
  margin-left : 30%;
}
.song{
    display: flex;
  }

.song{
  margin-left: 1%;
  text-align: left;
}

.song>p:hover{
  cursor: pointer;
  opacity: .8;
}

.updLogo{
  width: 22px;
  height: 22px;
  padding: 5%;
  border-radius: 3px;
  margin-left: 30%;
}

.updLogo:hover{
  cursor: pointer;
  opacity: 0.7;
}

#delLogo{
  background-color: rgba(253, 0, 30, 0.8);
}

.updateImg{
  display: flex;
}


@media screen and (max-width: 900px) {
    .tracks{
      margin-left : 15%;
    }
}

@media screen and (max-width: 700px) {
    .tracks{
      margin-left : 25%;
    }
    .updLogo{
      width: 20px;
      height: 20px;
      margin-left: 15%;
    }
}

@media screen and (max-width: 500px) {
  .tracks{
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2%;
    padding-bottom: 1%;
    border-bottom: solid lightgray 1px;
  }
  .song>p{
    margin-top : 0;
  }
}

</style>