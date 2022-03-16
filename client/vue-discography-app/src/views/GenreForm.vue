<template>
    <div class="form">
        <h2>Add a genre of a music :</h2>
        <p id="reqInfo">* required</p>
        <form class="genreForm">
            <label id="genreNameLab" for="genreName">Name of the genre : </label>
            <input id="genreName" type="text" name="genreName" placeholder="Name of the genre">
            <label id="genreDescLab" for="genreDesc" placeholder="A little description of the genre">Description for the genre : </label>
            <textarea id="genreDesc" name="genreDesc"></textarea>
            <CoversSlideshow id="slideshow"/> 
            <button class="submitButt">Submit</button>
    </form>
    </div>
</template>

<script>
import CoversSlideshow from '../components/CoversSlideshow.vue';

export default {
  setup(){

  },
  name: 'GenreFormView',
  components: { CoversSlideshow }
}

</script>

<style>

body{
  background-color: #111110;
}


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
  height: 5em;
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