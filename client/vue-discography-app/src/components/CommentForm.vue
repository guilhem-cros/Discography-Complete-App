<template>
  <div>
    <div v-if="this.$store.getters.user.loggedIn">
        <textarea placeholder="Write a comment about this album" id="newComment" v-model="comContent" minlength="3"></textarea>
        <p id="commentButt" @click="submit">Send</p>
    </div>
    <p v-else @click="goToSignUp" id="comInfo">Sign up to add a comment !</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'CommentForm',
    data(){
        return{
            comContent : ''
        }
    },
    methods:{
        goToSignUp(){
            this.$router.push({name : 'connect', params:{isSignIn : 'false'}})
        },
        async submit(){ //post comment on db
        console.log(this.$store.getters.user)
            if(this.comContent.length >= 3){
                let author_mail = this.$store.getters.user.data.email;
                let author = this.makePseudo(author_mail);
                let data = {album : this.idAlbum, content : this.comContent, author : author};
                let url = this.$store.getters.getApiURL + "comments";
                await axios.post(url, data).catch(function (error){
                    console.log(error.message)
                })
                location.reload();
            }
        },
        makePseudo(name){
            let result = name.substring(0, name.indexOf('@'));
            return result
        }
    },
    props:{
        idAlbum : String
    }
}

</script>

<style>

#comInfo{
  text-align: center;
  margin : auto;
  margin-right: calc(1rem + 30px);
  margin-top : 15%;
  text-decoration: underline;
}

#newComment{
  width : 90%;
  font-size: 16px;
  line-height: 1.4em;
  height: 5em;
  font-family: Avenir, Helvetica, Arial, sans-serif;;
  resize: none;
}

#commentButt{
  margin: auto;
  text-align: center;
  color :white;
  padding-top : 1%;
  padding-bottom: 1%;
  border-radius: 3px;
  margin-top: 2%;
  margin-right: 100%;
  background-color: #1B1B19;
  width : 60px;
  font-size: 14px;
}

#commentButt:hover{
  cursor:pointer;
  opacity: 0.8;
}

@media screen and (max-width: 700px){
  #comInfo{
    margin-right: 0;
    margin-top : 5%;
    margin-bottom : 8%;
  }
  #newComment{
    margin-top : 5%;
  }
  #commentButt{
    margin-right: auto;
    margin-top: 1%;
    margin-bottom: 5%;
  }
}
</style>