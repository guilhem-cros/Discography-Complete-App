<template>
    <div class="tracks">
      <p id="titleSong">{{this.songName.toUpperCase()}}</p>
      <div class="song">
        <p v-for="(feat, index) in this.feats" :key="index" @click="showArtist(index)">{{(index==0? "(Ft. " : ", ") + feat.name + (index==this.feats.length-1 ? ")" : "") }} </p>
      </div>
    </div>
</template>

<script>import axios from "axios";


export default {
    name : 'SongAndFeat',
    emits : ['loadingError'],
    data(){
        return {
            feats : [],
        }
    },
    props:{
        idSong : Number,
        songName : String,
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


@media screen and (max-width: 900px) {
    .tracks{
      margin-left : 15%;
    }
}

@media screen and (max-width: 700px) {
    .tracks{
      margin-left : 25%;
    }
}

@media screen and (max-width: 500px) {
  .tracks{
    flex-direction: column;
    align-items: flex-start;
  }
  .song>p{
    margin-top : 0;
  }
}

</style>