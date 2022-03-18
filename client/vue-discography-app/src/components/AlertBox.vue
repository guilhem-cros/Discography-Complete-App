<template>
  <div class="container">
    <div class="alert alert-success alert-dismissable fade in" v-if="this.alertIndex==1">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Success!</strong> {{this.message}}
    </div>
    <div class="alert alert-info alert-dismissable fade in" v-else-if="this.alertIndex==2">
      <a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a>
      <strong>Info!</strong> {{this.message}}
    </div>
    <div class="alert alert-warning alert-dismissable fade in" v-else-if="this.alertIndex==3">
      <a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a>
      <strong>Warning!</strong> {{this.message}}
    </div>
    <div class="alert alert-danger alert-dismissable fade in" v-else-if="this.alertIndex==4">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Danger!</strong> {{this.message}}
    </div>
  </div>
</template>

<script>
export default {
    setup(){

    },
    data(){
        return{}
    },
    name: "CoversSlideshow",
    mounted() {
      let script1 = document.createElement('script')
      script1.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js')
      document.head.appendChild(script1).then
      let script2 = document.createElement('script')
      script2.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      document.head.appendChild(script2)
    },
    methods:{
    },
    props:{
        alertIndex: Number, //index of the alert to display (0 = none)
        message : String //message of the alert
    }
}
</script>

<style>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
.container{
    position: fixed;
    bottom: 0;
    right: 0;
    width : 40%;
}

.alert {
    background-color:#969F9E ;
}

.alert-dismissable .close{
    color : black;
    opacity: 0.6;
}

</style>