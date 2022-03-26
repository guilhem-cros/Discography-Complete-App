<template>
  <div class="connectPage" v-if="!this.$store.getters.user.loggedIn">
    <form class="signForm" @submit.prevent="sign">
        <h2 id="connectTitle">{{this.formTitle}}</h2>
        <div id="fields">
            <label class="connectLabel" id="mailLab" for="email">E-mail : </label>
            <input id="email" type="text" name="email" placeholder="mail@here.com" required v-model="username">
            <label class="connectLabel" id="passwordLab" for="password">Password : </label>
            <input type="password" id="password" name="password" minlength="6" required placeholder="Password" v-model="password">
            <label class="connectLabel" id="passwordCLab" for="passwordC" v-if="this.isSignIn!='true'">Password : </label>
            <input type="password" id="passwordC" name="passwordC" required v-if="this.isSignIn!='true'" placeholder="Confirm password" v-model="password2">
            <div class="empty"></div>
        </div>
        <p v-if="connectError" class="connectErr">Error : Invalid password or e-mail</p>
        <p v-if="createError" class="connectErr">{{this.message}}</p>
        <button id="signButt">{{this.actionTitle}}</button>
    </form>
    <p id="redirText" @click="redirect">{{this.redirectText}}</p>
  </div>
  <h2 v-else id="loggedIn">You are already logged !</h2>
</template>

<script>

import {auth} from "../firebase-config"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"


export default{
    name : 'SignForm',
    data(){
        return{
            username : '',
            password : '',
            password2 : '',
            connectError : false,
            createError : false,
            message : '',
        }
    },
    props :{
        isSignIn : String, //true if it's a sign form, false it's signup
    },
    methods : {
        async signIn(){
            await signInWithEmailAndPassword(auth, this.username, this.password
            ).catch(this.connectError=true);
            this.$router.replace({name : 'home'});
        },
        async signUp(){
            if(this.password != this.password2 || this.password.length < 6){
                this.createError = true;
                this.message = "Passwords must be the same and must contains at least 6 characters"
            }
            else{
                await createUserWithEmailAndPassword(auth, this.username, this.password
                ).catch((this.createError = true, this.message = "Enter a valid e-email / If it is valid -> account already registered"));
                this.$router.replace({name : 'home'});
            }
        },
        sign(){
            if(this.isSignIn == 'true'){
                this.signIn()
            }
            else{
                this.signUp()
            }
        },
        redirect(){
            let bool = this.isSignIn=='true'
            this.$router.push({name : 'connect', params : {isSignIn : !bool}})
        }
    },
    computed:{
        actionTitle(){
            if(this.isSignIn == 'true'){
                return "Sign In";
            }
            else{
                return "Sign Up";
            }
        },
        formTitle(){
            if(this.isSignIn == 'true'){
                return "Welcome back !";
            }
            else{
                return "Create your account !";
            }
        },
        redirectText(){
            if(!this.signIn){
                return "No account ? Sign up here"
            }
            else{
                return "Already registered ? Sign in here"
            }
        }
    },

}
</script>

<style>

.connectPage{
  text-align: center;
  margin-top : 5%;
}

.signForm{
  margin : auto;
  background-color: #1B1B19;
  width: 500px;
  border-radius: 3px;
  padding : 1%;
}

#password, #email, #passwordC{
  font-size: 18px;
  height: 2em;
  grid-column: 2;
  width: 250px;
  outline: none;
}

#password, #passwordLab{
  grid-row: 2;
  margin-top : 50px;
}

#passwordCLab, #passwordC{
  grid-row: 3;
  margin-top : 50px;
}
.empty{
  grid-column: 3;
}
#passwordLab, #mailLab, #passwordCLab{
  font-weight: bold;
  grid-column: 1;
  color : #FFE469;
}

#fields{
  display: grid;
  align-items: center;
  margin-bottom : 10%;
  grid-auto-rows: minmax(0, 1fr);
  align-items: end
}

#connectTitle{
  padding-top : 2%;
  margin-bottom: 5%;
  color : #FFE469;
}

#signButt{
  margin-bottom : 3%;
  background-color : #FFE469;
  font-weight: bold;
  font-size: 14px;
  border : 0;
  outline: none;
  width : 80px;
  height: 2.5em;
}

.connectLabel{
  padding-bottom : 10px
}

#signButt:hover{
  opacity: 0.8;
  cursor: pointer;
}

.connectErr{
  color : white;
  width: 70%;
  border : 1px white solid;
  margin : auto;
  margin-bottom : 2%;
  border-radius : 3px;
}

#redirText{
  text-decoration: underline;
  width: 30%;
  margin-left : auto;
  margin-right : auto;
}
#redirText:hover{
  cursor : pointer;
}
#loggedIn{
  margin-top : 5%;
}

@media screen and (max-width: 900px)  {
  .connectPage{
    margin-top : 8%;
  }
}

@media screen and (max-width: 550px)  {
  .signForm{
    width: 90%;
  }
  #redirText{
    width : 60%;
  }
}

@media screen and (max-width: 450px)  {
  #password, #email, #passwordC, #passwordLab, #mailLab, #passwordCLab{
    width : 90%;
    padding : 1%;
    margin-top: 0;
    margin-bottom : 2%;
  }
  #passwordLab, #mailLab, #passwordCLab{
    margin-top : 7%;
    margin-bottom : 5%;
  }
  #fields{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center
  }
  #signButt{
    margin-bottom: 10%;
  }

}

</style>