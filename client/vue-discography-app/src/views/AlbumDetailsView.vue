<template>
  <ErrorComponent v-if="error" :mess="this.errMessage"/>
  <div v-else>
  <h1>Albums</h1>
  <img :src="getCover">
  <div v-for="(song) in this.albumSongs" :key="song.id_song">
    <SongAndFeat :idSong="song.id_song" :mainArtist="this.artist.name" :songName="song.song_title" @loadingError="showError"/>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import SongAndFeat from '../components/SongAndFeat.vue';
import ErrorComponent from '../components/RequestError.vue'
export default {
    name: 'AlbumView',
    data(){
        return {
            
            idAlbum : 1,
            albumData : {},
            albumSongs : [],
            error : false,
            errMessage: "",
            artist : {}
        }
    },
    props:{
        //idAlbum : String,
    },
    components:{SongAndFeat, ErrorComponent},
    methods:{
        async getAlbumDetails(){
            let url = this.$store.getters.getApiURL + "albums/" + this.idAlbum;
            await axios.get(url).catch(function (error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response => (this.albumData = response.data));
        },
        async getSongsOfAlbum(){
            let url = this.$store.getters.getApiURL + "songs/onAlbum/" + this.idAlbum;
            await axios.get(url).catch(function (error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response => this.albumSongs = response.data);
        },
        async getMainArtist(){
            let url = this.$store.getters.getApiURL + "artists/" + this.albumData.artist;
            await axios.get(url).catch(function(error){
                this.error = true;
                this.errMessage = error.message;
            }).then(response=> (this.artist = response.data));
        },
        async loadAll(){
            await this.getAlbumDetails();
            await this.getSongsOfAlbum();
            await this.getMainArtist();
            
        },
        showError(value){
            this.error = true;
            this.errMessage = value;
        }
    },
    mounted(){
        this.loadAll();
    }
}
</script>