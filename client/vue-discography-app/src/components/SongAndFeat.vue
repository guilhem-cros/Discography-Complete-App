<template>
    <p>{{this.mainArtist}}</p>
    <p>{{this.songName}}</p>
    <p v-for="(feat, index) in this.feats" :key="index">{{feat}}</p>
</template>

<script>import axios from "axios";


export default {
    name : 'SongAndFeat',
    data(){
        return {
            feats : [],
        }
    },
    props:{
        idSong : Number,
        mainArtist : String,
        songName : String
    },
    methods: {
        async getFeats(){
            let url = this.$store.getter.getApiURL + "songs/feats/" + this.idSong;
            await axios.get(url).catch(function (error){
                this.$emit('loadingError', error.message);
            }).then(response => this.feats = response.data);
        }
    },
    mounted() {
        this.getFeats();
    },
}

</script>