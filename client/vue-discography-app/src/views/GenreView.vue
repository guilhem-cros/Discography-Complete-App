<template>
  <div class="genreList" v-if="this.displayIndex==0">
      <div class="titleDiv">
        <h2 id="genreTitle">All genres of music : </h2>
        <div class="addButt" @click="create">Add new</div>
      </div>
      <div class="list">
        <div v-for="(genre, index) in this.listGenres" :key="genre.id_genre" class="genre"> 
            <img src="../assets/genreLogo.jpg" class="genreLogo" alt="genre_logo">
            <p class="genreName">{{"Name : " + genre.genre}}</p>
            <div class="updateButt genreButton" @click="callUpdate(genre.id_genre, genre.genre, genre.description)">Update</div>
            <div class="deleteButt genreButton" @click="deleteConfirm(genre.genre, genre.id_genre, index)">Delete</div>
            <p class="genreDesc">{{"Description : "  + (genre.description==null ? " " : genre.description)}}</p>
        </div>
      </div>
  </div>
  <GenreForm :genre="{}" :creation="true" v-if="this.displayIndex==1" @goBack="showList" @updated="showSuccess" @error="showError"/>
  <GenreForm :genre="currentGenre" :creation="false" v-if="this.displayIndex==2"  @goBack="showList" @updated="showSuccess" @error="showError"/>
  <AlertBox :alertIndex="alertIndex" :message="message" @alertClosed="resetAlert"/>
</template>

<script>
import GenreForm from '../components/GenreForm.vue';
import AlertBox from '../components/AlertBox.vue';
import axios from 'axios';

export default {
  name: 'GenreView',
  components: { GenreForm, AlertBox },
  data(){
      return{
        listGenres : [], //list of all the genres
        displayIndex : 0, //index of what is currently displayed in the view
        currentGenre : {id : -1, name : "", desc : ""}, //pointing a genre when one of his buttons (update / delete) has been clicked
        message : "", //message for the alerts notifications
        alertIndex : 0, //index of the alert notification : 0 = hide alerts
        error : false, //boolean : true if an error happens when loading datas, false if no error
        errMessage : "" //message send during the error
      }
  },
  methods:{
      //get all the genre in the DB and all their values : launch when the page is opened
      async getListGenre(){
        if(this.listGenres.length == 0){
            let url = this.$store.getters.getApiURL + "genres";  //url to te request datas
            await axios.get(url).catch(function (error){ //getting datas and handling errors
                this.error = true;
                this.errMessage = error.message;
            }).then(response => (response.data.sort(function(a,b){ //sort the returned list by name of genre
                if(a.genre.toLowerCase() < b.genre.toLowerCase()){return -1}
                if(a.genre.toLowerCase() > b.genre.toLowerCase()){return 1}
                return 0;
            }))).then(response => this.listGenres = response); //associate sorted data to listGenres
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
            let message = error.message;
            this.showError(message);
          }).then(
          this.listGenres.splice(tabIndex, 1)).then( //delete the genre in listGenre -> avoid to fetch again the datas we alrdy have
          this.showSuccess({message : "deleted", name : name}));
      },
      //display an alert "success" with message using 'values'
      showSuccess(values){
        this.message = "The genre " + values.name + " has been " + values.message + "."
        this.alertIndex = 1;
      },
      //display an alert "error" showing 'message'
      showError(message){
          this.message = message;
          this.alertIndex = 4;
      },
      showList(){
          this.displayIndex=0;
      },
      //reset the parameters for the next alert to show
      resetAlert(){
          this.alertIndex = 0;
          this.message ="";
      }
  },
  beforeCreate () { //set bg color when creating
    document.querySelector('body').setAttribute('style', 'background:#111110')
  },
  beforeUnmount () { //unset bg color when unmounting
    document.querySelector('body').setAttribute('style', '')
  },
  mounted(){
      this.getListGenre();
  },
  computed:{
  }
}
</script>

<style>

.genreList {
  margin-left : 10%;
  margin-right: 10%;
}

.list{
  padding : 2%;
  padding-bottom: 1%;
  background-color: white;
  border-radius: 5px;
}

.genreName{
  grid-column: 2/11;
  font-weight: bold;
  margin : 0;
}

.genreDesc{
  grid-column: 2/11;
  margin-top : 2%;
  max-height: none;
}

.deleteButt{
  grid-column: 12;
}

.updateButt{
  grid-column: 11;
}

.genre{
  display : grid;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  text-align: left;
  border-bottom : solid 1px grey;
  margin-bottom : 2%;
}

.genreButton{
  text-align: center;
  width : 80px;
  margin-left : 1%;
  margin-right : 1%;
  font-size : 15px;
  font-weight: bold;
}

.updateButt{
  color : #0963D0;
}

.deleteButt{
  color : #D0092C;
}

.genreLogo {
  grid-column: 1;
  height : 25px;
}

.genreButton:hover, .addButt:hover{
  cursor: pointer;
  opacity: 0.8;
}

.addButt{
  background-color: white;
  width : 10%;
  color: #1F9911;
  font-size : 16px;
  font-weight: bold;
  padding : 10px;
  border-radius: 3px;
  margin-left : 85%;
}

.titleDiv{
  margin-top : 2%;
  margin-bottom: 1%;
}

#genreTitle{
  color : white;
  text-align: left;
}

@media screen and (max-width: 1100px){
  .genreName{
    grid-column: 2/8;
  }

  .genreDesc{
    grid-column: 2/8;
    grid-row: 2;
  }

  .deleteButt{
    grid-column: 8;
  }

  .updateButt{
    grid-column: 8;
  }

  .genre{
    align-items: baseline;
  }

  .addButt{
    width : 15%;
    margin-left: 80%;
  }
}

@media screen and (max-width: 800px){
  .genreName{
    grid-column: 1/4;
  }

  .genreDesc{
    font-size: 12px;
    grid-column: 1/4;
    grid-row: 3;
  }

  .deleteButt{
    grid-column: 4;
    grid-row: 3;
  }

  .genreButton{
    text-align : right;
    width : auto;
  }

  .updateButt{
    grid-column: 4;
    grid-row: 1;
  }

  .genreLogo{
    margin-bottom: 2%;
  }

  .addButt{
    width : 35%;
    margin-left: 55%;
  }
}
</style>