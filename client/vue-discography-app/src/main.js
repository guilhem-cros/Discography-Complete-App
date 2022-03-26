
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth} from './firebase-config'



//get current user
auth.onAuthStateChanged(user =>  {
   {store.dispatch("fetchUser", user)}
});

createApp(App).use(router).use(store).mount('#app');

