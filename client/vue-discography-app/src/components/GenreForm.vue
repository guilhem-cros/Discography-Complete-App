<template>
    <div class="form" v-if="this.$store.getters.adminState">
        <h2>{{ this.title }}</h2>
        <p id="reqInfo">* required</p>
        <form class="genreForm" @submit.prevent="submitDatas">
            <label id="genreNameLab" for="genreName">*Name of the genre :</label>
            <input id="genreName" type="text" name="genreName" v-model="name" placeholder="Name of the genre"  minlength="3" required>
            <label id="genreDescLab" for="genreDesc" placeholder="A little description of the genre">Description for the genre : </label>
            <textarea id="genreDesc" name="genreDesc" v-model="desc"></textarea>
            <CoversSlideshow id="slideshow"/>
            <button class="submitButt">Submit</button>
      </form>
      <div class="backButt" @click="goBack">
        <p id="backText">Back</p>
      </div>
    </div>
    <div v-else>
      <h2 id="nonAdmin">Error : you don't have the permission to access this page.</h2>
    </div>
</template>

<script>
import CoversSlideshow from './CoversSlideshow.vue';
import axios from 'axios';

export default {
  name: 'GenreForm',
  data(){
    return {
      name : this.genre.name, //name of the current genre : empty if it's a creation
      desc : this.genre.desc, //desc of the current genre : empty if it's a creation
    }
  },
  components: { CoversSlideshow},
  methods: {
    //push the datas on the db : create if it's a creation, update if it's an update
    async submitDatas(){
      let datas = { name : this.name, description : this.desc};
      if(this.name.length >= 3){
        let url = this.$store.getters.getApiURL + "genres";
        if(this.creation){
          await axios.post(url, datas).catch(function (error) { //request and error handling during request
            let message = error.message;
            this.$emit('error', message); //emit error to display and alert
          })
          this.$emit("updated", {name : this.name, message : "created"});
        }
        else{
          await axios.put(url + '/' + this.genre.id, datas).catch(function (error) { // request and error handling during request
            let message = error.message
            this.$emit('error', message); //emit error to dispay an alert
          })
          this.$emit("updated", {name : this.name, message : "updated"}); //emit updated to display a success alert
          this.$emit('goBackAndUpdate')
        }
        //resetting values
        this.name = "";
        this.desc = "";

        location.reload();
      }
    },
    //emit a message to hide form and display list
    goBack(){
      this.$emit('goBack');
    }
  },
  props : {
    genre : Object, //empty if it's a create, the genre updating if it's an update
    creation : Boolean, //true if creating, false if updating
  },
  computed : {
    //title of the page : depends if it's a creation or an update form
    title() {
      return this.creation ? "Add a genre of music :" : "Update the genre :";
    },
  }
}

</script>

<style>

.form{
  color : white;
  margin-left : 10%;
  margin-right : 10%;
  margin-top : 2%;
  text-align: left;
}

#reqInfo{
  color: grey;
  font-size : 12px;
  font-weight: bold;
}

.genreForm{
  margin-left : 5%;
  display : grid;
  grid-auto-columns: minmax(0, 1fr);
}

#genreNameLab{
  grid-row : 1;
}

#genreName{
  grid-row: 2;
  width : 80%;
  height:2.4em;
}

#slideshow{
  grid-column: 2;
  grid-row: 1/5;
  text-align: center;
}

#genreDescLab{
  grid-row: 3;
}

#genreDesc{
  grid-row: 4;
  width : 80%;
  height: 7em;
}

#genreName, #genreDesc, #genreNameLab, #genreDescLab{
  font-size : 14px;
  line-height: 1.4em;
  font-weight: bold;
  border-radius : 3px;
  margin: 1%;
  margin-top: 0;
}

#genreDescLab, #genreNameLab{
  margin-top: 2%;
}

#genreName, #genreDesc{
  outline: none;
  color : black;
}

.submitButt{
  grid-row : 5;
  grid-column: 1;
  background-color: #3f3f3c;
  border-radius: 4px;
  border: rgb(104, 99, 99) 1px solid;
  color: white;
  margin-top: 2%;
  padding-left : 0;
  padding-right : 0;
  padding-bottom: 1%;
  padding-top: 1%;
  width: 17%;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.submitButt:hover{
  cursor: pointer;
  opacity: 0.8;
}

.backButt{
  margin-top : 5%;
  text-align: center;
  font-size : 18px;
  padding-bottom :0px;
  border : solid, 1px, grey;
  color : #FFE469;
  text-decoration: underline;
}

.backButt:hover{
  cursor: pointer;
  color : gold;
}

#nonAdmin {
  color : white;
  margin-top : 5%;
}

#genreName::placeholder, #genreDesc::placeholder{
  color: grey;
}

@media screen and (max-width: 900px){
  .form{
    margin-left: 2%;
    margin-right: 2%;
  }
}

@media screen and (max-width: 650px){
  #genreNameLab{
    grid-row : 1;
    grid-column: 1;
  }
  #genreName{
    grid-row: 2;
    grid-column: 1;
    width : 90%
  }
  #slideshow{
    grid-column: 1;
    grid-row: 6;
    margin-top: 10%;
    margin-bottom : 5%;
  }
  #genreDescLab{
    grid-row: 3;
    grid-column: 1;
  }
  .genreForm{
    margin-left : 2%;
    margin-right: 2%;
  }
  #genreDesc{
    grid-row: 4;
    grid-column: 1;
    width : 90%;
  }
}

</style>