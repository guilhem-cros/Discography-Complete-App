<template>
    <div class="form" v-if="this.$store.getters.adminState">
        <h2>{{ this.title }}</h2>
        <p id="reqInfo">* required</p>
        <form class="artistForm" @submit.prevent="submitDatas">
            <label id="artistNameLab" for="artistName">*Name :</label>
            <input id="artistName" type="text" name="artistName" v-model="name" placeholder="Name of the artist"  minlength="3" required>
            <label id="artistOthersLab" for="artistOthers">AKA : </label>
            <input id="artistOthers" type="text" name="artistOthers" placeholder="Separate names by commas" v-model="other_names"/>
            <label id="genreLab">*Main genre :</label>
            <div class="genresRadios">
              <div v-for="(item, index) in this.allGenres" :key="item.id_genre" class="radioB" :class="'radio' + index%6">
                <label class="genreChoiceLab" id="artistGenre" :for="item.id_genre+'radio'" @click="selectGenre">{{item.genre}}</label>
                <input class="genreChoice" name="genre" :id="item.id_genre+'radio'" type="radio" v-model="this.genre" :value="item.id_genre" @click="selectGenre" required/>
              </div>
            </div>
            <div id="picInput">
              <label id="pictureLab" for="artistImage">Add a picture of the artist :</label>
              <input type="file" name="artistImage" id="artistImage" accept="image/png, image/jpeg, image/jpg" @change="showPreview">
            </div>
            <div name="fade" tag="div" v-if="!this.picture" id="artistPic" >
                <img class="pic" :src="currImg" :alt="this.artist.name + '_picture'"/>
            </div>
            <CoversSlideshow class="slideshow" v-else/>
            <button class="submitB" @click="submitData">Submit</button>
      </form>
      <div class="backB" @click="goBack">
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
import Notiflix from 'notiflix';

export default {
    name: 'ArtistForm',
    data(){
        return {
            allGenres : [], //list of all genres in db
            name : this.artist.name, //name of the artist
            other_names : this.artist.other_names==null ? "" : this.artist.other_names.toString(), //others names of the artist
            genre : this.artist.genre, //genre of the artist
            updates : false, //boolean describing if updates has been made on the db using the form
            picture : this.create, //boolean : true if picture must be show, false instead
            currImg : this.setCurrImg(),
            artistPicture : null,
        }
    },
    components: { CoversSlideshow},
    props: {
        artist : Object, //current artist if it's an update, empty instead
        create : Boolean //true = creation from, false = update form
    },
    methods: {
        //get all the genres in the db and sort them
        async getGenres(){
            let url = this.$store.getters.getApiURL + "genres";  //url to te request datas
            await axios.get(url).catch(function (error){ //getting datas and handling errors
                Notiflix.Notify.failure(error.message, {closeButton:true});
            }).then(response => (response.data.sort(function(a,b){ //sort the returned list by name of genre
                if(a.genre.toLowerCase() < b.genre.toLowerCase()){return -1}
                if(a.genre.toLowerCase() > b.genre.toLowerCase()){return 1}
                return 0;
            }))).then(response => this.allGenres = response); //associate sorted data to listGenres
        },
        //update the selected genre when a radio button is hitted
        selectGenre(event){
            this.genre=event.target.value;
        },
        //post or update data on the db
        async submitData(){
            const datas = new FormData() //form of data pushed
            datas.append('name', this.name)
            datas.append('other_names', this.setOtherNames)
            datas.append('genre', this.genre);
            if(this.artistPicture != null){ //if a picture has been provide -> add it to the data of submit
                datas.append('artistImage', this.artistPicture, this.artistPicture.name);
            }
            if(this.name !== undefined && this.genre !==undefined && this.genre!=null){ if(this.name.length>=3){ //if the name and genre entered are not empty
                let url = this.$store.getters.getApiURL + "artists";
                if(this.create){//if it's a creation
                    await axios.post(url, datas).catch(function (error){//create or handling error
                        let message = error.message;
                        this.$emit("error", message);//emit error to display an alert
                    })
                    this.$emit("updated", {name : this.name, message : "created"})

                }
                else{//updating form
                    await axios.put(url + '/' +  this.artist.id_artist, datas).catch(function (error){//update or handling error
                        let message = error.message;
                        this.$emit("error", message);//emit error to display an alert
                    });
                    this.$emit("updated", {name : this.name, message : "updated"}),
                    this.$emit("update");
                }
                //update has been made -> true
                this.updates = true;
                //reseting values
                this.name = "";
                this.genre = null;
                this.other_names=null;
                this.picture = this.create;
                this.artistPicture = null;
            }}
        },
        //set the img displayed depending of it url is saved in date or not
        setCurrImg(){
            if(this.artist.image === undefined || this.artist.image == null || this.artist.image.length == 0){
                return require("../assets/artists/default.png");
            }
            else{
                return this.artist.image;
            }
        },
        //change the preview of the image of the artist
        showPreview(e){
            this.picture = false;
            const file = e.target.files[0];
            this.currImg = URL.createObjectURL(file);
            this.artistPicture = file;
        },
        //hide form and show list of artists or artist details (depends of it's create or update)
        goBack(){
            if(this.updates){
                this.$emit('updateList')
            }
            else{
                this.$emit('goBack')
            }
        }
    },
    computed : {
        //title of the page : depends if it's a creation or update form
        title(){
            return this.create ? "Add an artist :" : "Update the artist :"
        },
        //set the alias of the artist in an acceptable list form submit
        setOtherNames(){
            return '{' + this.other_names + '}';
        },
    },
    mounted(){
        this.getGenres(); //get genres data when mounted
    },
    beforeCreate () { //set bg color before creating and displaying
      document.querySelector('body').setAttribute('style', 'background:#111110')
    },
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

.artistForm{
  margin-left : 5%;
  display : grid;
  grid-auto-columns: minmax(0, 1fr);
}

#artistNameLab{
  grid-row : 1;
}

#artistName{
  grid-row: 2;
  width : 80%;
  height:2.4em;
  outline: none
}

.slideshow, #artistPic{
  grid-column: 2;
  grid-row: 1/5;
  text-align: center;
}

#artistOthersLab{
  grid-row: 3;
}

#artistOthers{
  grid-row: 4;
  width : 80%;
  outline: none
}

#picInput{
  text-align: center;
  grid-row : 5;
  grid-column : 2;
  display: inline-flex;
  flex-direction: column;
}

#picInput > *{
    margin: 0 auto;
}
#genreLab{
  grid-column: 1;
  grid-row: 5;
}

.genresRadios{
  grid-row : 6;
  display: grid;
  margin : 1%;
  margin-top : 3%;
}

.radio0{
  grid-column: 1;
}
.radio1{
  grid-column: 2;
}
.radio2{
  grid-column: 3;
}
.radio3{
  grid-column: 4;
}
.radio4{
  grid-column: 5;
}
.radio5{
  grid-column: 6;
}

.radioB{
  margin-bottom: 15%;
}

#artistName, #artistOthers, #artistNameLab, #artistOthersLab, #genreChoiceLab, #pictureLab, #genreLab{
  font-size : 14px;
  line-height: 1.4em;
  font-weight: bold;
  border-radius : 3px;
  margin: 1%;
  margin-top: 0;
}

#artistName, #artistOthers{
  height: 2.4em;
}

#artistNameLab, #artistOthersLab, #genreLab{
  margin-top: 2%;
}

.submitB{
  grid-row : 8;
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

.submitB:hover{
  cursor: pointer;
  opacity: 0.8;
}

.pic{
  background-position: center;
  background-size: cover;
  width : 250px;
  height: 250px;
  object-fit: cover;
  padding: 1%;
  background-color: #FFE469;
}

.backB{
  margin-top : 5%;
  text-align: center;
  font-size : 18px;
  padding-bottom :0px;
  border : solid, 1px, grey;
  color : #FFE469;
  text-decoration: underline;
}

.backB:hover{
  cursor: pointer;
  color : gold;
}

#reqInfo{
  color: grey;
  font-size : 12px;
  font-weight: bold;
}

#nonAdmin {
  color : white;
  margin-top : 5%;
}

@media screen and (max-width: 1100px){
  .radio3{
    grid-column: 1;
  }
  .radio4{
    grid-column: 2;
  }
  .radio5{
    grid-column: 3;
  }
}

@media screen and (max-width: 900px){
  .form{
    margin-left: 2%;
    margin-right: 2%;
  }
}

@media screen and (max-width: 650px){
  .form{
    margin-bottom: 5%;
  }
  #artistNameLab{
    grid-row : 1;
    grid-column: 1;
  }
  #artistName{
    grid-row : 2;
    grid-column : 1;
    width : 90%;
  }
  #artistPic{
    grid-column: 1;
    grid-row: 7;
    text-align: center;
  }
  .slideshow{
    grid-column: 1;
    grid-row: 7;
  }
  #artistOthersLab{
    grid-row: 3;
    grid-column : 1;
  }
  #artistOthers{
    grid-row: 4;
    grid-column: 1;
    width : 90%;
  }
  #genreLab{
    grid-column: 1;
    grid-row: 5;
  }
  #picInput{
    grid-column : 1;
    grid-row: 8;
  }
  .submitB{
    margin-top : 5%;
    grid-row: 9;
  }
}

</style>