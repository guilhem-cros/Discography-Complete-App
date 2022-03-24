<template>
  <div class="loadError">
    <h1>Error</h1>
    <p>An error occurred during loading the data.</p>
    <p>Please, try to reload the page (F5 key). If the error persists, contact an administrator.</p>
    <p id="errMess">Error message : {{this.mess}}</p>
  </div>
</template>

<script>

export default ({
    name:"ErrorComponent",
    props:{
        mess : String //message send by the error
    }
})
</script>


<style>
.loadError{
  margin-right: 20%;
  margin-left : 20%;
  margin-top : 5%;
  margin-bottom : 5%;
  padding-bottom : 1%;
  border-radius: 3px;
  background-color: white;
  border-style: solid;
  border-color: orange;
  border-width: 2px;
}
.loadError>p{
  font-size: 14px;
}
.loadError>h1{
  font-weight: bold;
}
#errMess{
  font-size : 12px;
}

@media screen and (max-width: 750px){
  .loadError{
    margin-left: 5%;
    margin-right: 5%;
  }
}


</style>