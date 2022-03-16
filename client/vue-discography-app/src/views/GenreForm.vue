<template>
    <div class="form">
        <h2>Add a genre of a music :</h2>
        <p id="reqInfo">* required</p>
        <form class="genreForm">
            <label id="genreNameLab" for="genreName">Name of the genre : </label>
            <input id="genreName" type="text" name="genreName" placeholder="Name of the genre">
            <label id="genreDescLab" for="genreDesc" placeholder="A little description of the genre">Description for the genre : </label>
            <textarea id="genreDesc" name="genreDesc"></textarea> 
            <img src="" alt="randomCover" id="randomCover">
    </form>
    </div>
</template>

<script>
export default {
  setup(){

  },
  name: 'GenreFormView',
  components: {

  }
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
}

#genreNameLab{
  grid-row : 1;
}

#genreName{
  grid-row: 2;
  width : 80%
}

#randomCover{
  grid-column: 2;
  grid-row: 2/4;
}

#genreDescLab{
  grid-row: 3;
}

#genreDesc{
  grid-row: 4;
  width : 80%;
}

#genreName, #genreDesc, #genreNameLab, #genreDescLab{
  font-size : 14px;
  line-height: 1.6em;
  font-weight: bold;
  border-radius : 3px;
  margin: 1%;
  margin-top: 0;
}

#genreDescLab, #genreNameLab{
  margin-top: 2%;
  outline: none;
}

#genreName::placeholder, #genreDesc::placeholder{
  color: grey;
}

</style>