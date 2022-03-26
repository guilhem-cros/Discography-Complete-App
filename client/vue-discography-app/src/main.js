
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth/*, database*/} from './firebase-config'
//import {ref, child, get } from "firebase/database";


auth.onAuthStateChanged(user =>  {
   {store.dispatch("fetchUser", user)}
});

//const dbRef = ref(getDatabase());


createApp(App).use(router).use(store).mount('#app');

