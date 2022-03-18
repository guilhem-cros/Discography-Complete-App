<template>
  <div class="genreList" v-if="this.displayIndex==0">
        <div v-for="(genre, index) in this.listGenres" :key="genre.id_genre" class="genre"> 
            <p class="genreName">{{genre.genre}}</p>
            <p class="genreDesc">{{genre.description}}</p>
            <div class="updateButt genreButton" @click="callUpdate(genre.id_genre, genre.genre, genre.description)">Update</div>
            <div class="deleteButt genreButton" @click="deleteConfirm(genre.genre, genre.id_genre, index)">Delete</div>
        </div>
        <div class="addButt" @click="create">Add new</div>
  </div>
  <GenreForm :genre="{}" :creation="true" v-if="this.displayIndex==1" @goBack="showList" @goBackAndUpdate="showUpdatedList" @updated="showSuccess"/>
  <GenreForm :genre="currentGenre" :creation="false" v-if="this.displayIndex==2"  @goBack="showList" @goBackAndUpdate="showUpdatedList" @updated="showSuccess"/>
  <AlertBox :alertIndex="alertIndex" :message="message"/>
</template>

<script>
import GenreForm from '../components/GenreForm.vue';
import AlertBox from '../components/AlertBox.vue';
import axios from 'axios';

export default {
  name: 'GenreView',
  components: { GenreForm, AlertBox},
  data(){
      return{
        listGenres : [], //list of all the genres
        displayIndex : 0, //index of what is currently displayed in the view
        currentGenre : {id : -1, name : "", desc : ""},
        message : "",
        alertIndex : 0,
      }
  },
  methods:{
      //get all the genre in the DB and all their values : launch when the page is opened
      async getListGenre(){
        if(this.listGenres.length == 0){
            let url = this.$store.getters.getApiURL + "genres";
            try{
            let res = await axios.get(url)
            this.listGenres = res.data;
            } catch (error) {
                if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                }
            }
        }
      },
      //send the id of the genre that will be update and call the update method
      callUpdate(idGenre, name, desc){
          this.currentGenre.id = idGenre;
          this.currentGenre.name = name;
          this.currentGenre.desc = desc;
          this.update();
      },
      //open (display) the form to update a genre
      update(){
          this.displayIndex = 2;
      },
      //open (display) the form to create a genre
      create(){
          this.displayIndex = 1;
      },
      //confirmation for removing a genre
      deleteConfirm(name, idGenre, tabIndex){
          if (window.confirm('Delete the genre ' + name + ' ?')){
              this.delete(name, idGenre, tabIndex)
          }
      },
      //remove a genre
      async delete(name, idGenre, tabIndex){
          let url = this.$store.getters.getApiURL + "genres/" + idGenre;
          await axios.delete(url).catch(function (error) { //delete the genre in the DB
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }}).then(
          this.listGenres.splice(tabIndex, 1)).then( //delete the genre in listGenre -> avoid to fetch again the datas we alrdy have
          this.showSuccess({message : "deleted", name : name}));
      },
      //display an alert "success"
      showSuccess(values){
          console.log(values)
        this.message = "The genre " + values.name + " has been " + values.message + "."
        this.alertIndex = 1;
      },
      showList(){
          this.displayIndex=0;
      },
      async showUpdatedList(){
          this.listGenres = [];
          await this.getListGenre();
          this.showList();
      }
  },
  mounted(){
      this.getListGenre();
  },
  computed:{
  }
}
</script>