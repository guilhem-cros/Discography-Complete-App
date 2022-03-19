<template>
  <h1>{{this.artistDatas.name}}</h1>
  <p>{{this.genre}}</p>
  <p>{{this.albumList}}</p>
</template>

<script>
import axios from 'axios'

export default {
    name : 'ArtistDetails',
    data(){
        return{
            albumList : [],
            genre : {},
        }
    },
    methods : {
        //get all the albums of the artist
        async getAlbums(){
            if(this.albumList.length == 0){
                let url = this.$store.getters.getApiURL + "artists/albums/"+this.artistDatas.id_artist;
                await axios.get(url).catch(function (){ //getting the albums and handling errors
                    this.$emit('artistDetailsError')
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
            await axios.get(url).catch(function (){ //getting genre infos and handling errors
                this.$emit('artistDetailsError')
            }).then(response => this.genre = response.data)
        }
    },
    props :{
        artistDatas : Object,
    },
    mounted(){
        this.getAlbums();
        this.getGenre();
    }
}

</script>