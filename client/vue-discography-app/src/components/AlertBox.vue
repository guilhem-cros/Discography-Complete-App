<template>
  <div class="container">
    <div class="alert alert-success alert-dismissable fade in" v-if="this.alertIndex==1">
      <strong>Success!</strong> {{this.message}}
      <a href="#" class="close" data-dismiss="alert" aria-label="close" @click="close">&times;</a>
    </div>
    <div class="alert alert-info alert-dismissable fade in" v-else-if="this.alertIndex==2">
      <strong>Info!</strong> {{this.message}}
      <a href="#" class="close" data-dismiss="alert" aria-label="close" @click="close">&times;</a>
    </div>
    <div class="alert alert-warning alert-dismissable fade in" v-else-if="this.alertIndex==3">
      <strong>Warning!</strong> {{this.message}}
      <a href="#" class="close" data-dismiss="alert" aria-label="close" @click="close">&times;</a>
    </div>
    <div class="alert alert-danger alert-dismissable fade in" v-else-if="this.alertIndex==4">
      <strong>Error !</strong> {{this.message}}
      <a href="#" class="close" data-dismiss="alert" aria-label="close" @click="close">&times;</a>
    </div>
  </div>
</template>

<script scoped>
export default {
    data(){
        return{
        }
    },
    name: "CoversSlideshow",
    mounted() {
      //import scripts from bootstrap
      let script1 = document.createElement('script')
      script1.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js')
      document.head.appendChild(script1)
      let script2 = document.createElement('script')
      script2.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      document.head.appendChild(script2)
    },
    methods:{
      //called when alert is close : emit an event 'alertClosed'
      close(){
        this.$emit('alertClosed');
      }
    },
    props:{
        alertIndex: Number, //index of the alert to display (0 = none)
        message : String //message of the alert
    },
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#111110')
    },
    beforeUnmount () {
      document.querySelector('body').setAttribute('style', '')
    },
}
</script>

<style>

.container{
    position: fixed;
    bottom: 2%;
    right: 2%;
    width : 40%;
}

.alert {
    background-color:#969F9E ;
    height: 10%;
    padding-bottom : 3%;
    padding-top : 3%;
    border-radius: 8px;
}

.alert-dismissable .close{
    color : black;
    opacity: 0.6;
}

.close{
  text-decoration: none;
  color : black;
  font-weight: bold;
  font-size: 20px;
  opacity : 0.8;
  margin-left : 3%;
}

.alert-success{
  color: #19760F;
}

.alert-danger{
  color : #B70C0F;
}

@media screen and (max-width: 1000px){
  .container{
    width: 50%;
  }
}

@media screen and (max-width: 750px){
  .container{
    width: 60%;
  }
}

@media screen and (max-width: 600px){
  .container{
    width: 80%;
    right: 10%;
  }
}

@media screen and (max-width : 450px) {
  .container{
    width: 98%;
    right: 1%;
  }
}

</style>