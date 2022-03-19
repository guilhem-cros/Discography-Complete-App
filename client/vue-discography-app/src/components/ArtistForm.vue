<template>
    <div class="form">
        <h2>{{ this.title }}</h2>
        <p id="reqInfo">* required</p>
        <form class="artistForm" @submit.prevent="submitDatas">
            <label id="artistNameLab" for="artistName">*Name :</label>
            <input id="artistName" type="text" name="artistName" v-model="name" placeholder="The name of the artist"  minlength="3" required>
            <label id="artistOthersLab" for="artistOthersDesc">Description for the genre : </label>
            <input id="artistOthers" name="artistOthers" placeholder="Some other names of the artist, separated by a coma" v-model="other_names"/>
            <CoversSlideshow id="slideshow"/>
            <button class="submitButt">Submit</button>
      </form>
      <div class="backButt" @click="goBack">
        <p id="backText">Back</p>
      </div>
    </div>
</template>

<script>
import CoversSlideshow from './CoversSlideshow.vue';
export default {
    name: 'ArtistForm',
    data(){
        return {
            name : this.artist.name,
            other_names : this.artist.other_names,
            genre : this.artist.genre,
            updates : false //boolean describing if updates has been made on the db using the form
        }
    },
    components: { CoversSlideshow},
    props: {
        artist : Object,
        create : Boolean
    },
    computed : {
        //title of the page : depends if it's a creation or update form
        title(){
            return this.create ? "Add an artist :" : "Update the artist :"
        }
    }
}

</script>