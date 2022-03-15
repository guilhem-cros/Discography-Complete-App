<template>
  <div class="head">
    <div class="search">
      <input type="text" id="searchBar" placeholder="Search for albums & more">
      <img src="../assets/search.png" width="auto" height="24px" alt="research button" id="research_butt">
    </div>
    <div class="title">
      <h1 id="title">Title</h1>
    </div>
    <div class="sign_panel">
      <div>
        <p id="sign_in_butt">SIGN IN</p>
        <p id="sign_up_butt">SIGN UP</p>
      </div>
    </div>
  </div>
  <NavBar />
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  setup() {
    
  },
  components: { NavBar }
}

</script>


<style scoped>
.head{
  display: grid;
  background-color: #FFE469;
  grid-auto-columns: minmax(0, 1fr);
  margin : 0;
  align-items: center;
}

.search{
  text-align: left;
  grid-column: 1;
  display: inline-flex;
  align-items: center;
}

.title{
  text-align: center;
  grid-column: 2;
}

#title{
  margin: 0;

}

.sign_panel{
  grid-column: 3;
  text-align: right;
}

.sign_panel > div{
  display: inline-flex;
  margin : 1%;
  width : 30%;
  margin-right: 1rem;
  text-align: center;
}

.sign_panel > div > p{
  font-size: 12px;
  margin-left: 1%;
  width : 100%;
  font-weight: bold;
}

.search > input {
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  font-weight: 600;
  outline: none;
  font-size: 16px;
  line-height: 32px;
  margin : 1%;
}

.search > input::placeholder{
  color: #151515;
}

.search > input:focus::placeholder{
  color: grey;
}

#sign_in_butt:hover, #sign_up_butt:hover{
  cursor: pointer;
  opacity: 0.7;
}

#research_butt:hover{
  cursor: pointer;
  zoom: 110%;
}

#title:hover{
  cursor: pointer;
}

/*Under 1250 px*/
@media screen and (max-width: 1250px){
  .sign_panel > div{
    display: inline;
    margin : 0;
    width : 30%;
  }

  .sign_panel > div > p{
    margin: 5%;
  }

}

/*Under 680 px*/
@media screen and (max-width: 650px){
  .title{
    margin-left: 1%;
    grid-column: 1;
    grid-row: 1;
    text-align: left;
  }

  .search{
    grid-column: 1;
    grid-row :2;
  }

  .sign_panel{
    text-align: right;
  }

  .sign_panel>div{
    display: inline;
    margin : 0;
    text-align: center;
  }

  .sign_panel > div > p{
    margin: 10%;
  }

  .head{
    padding: 2%;
    padding-top : 0;
  }
}
</style>