
import Vuex from "vuex";
import {database} from '../firebase-config'
import {ref, child, get } from "firebase/database";

export default new Vuex.Store({
    state : {
        apiURL : process.env.VUE_APP_API_PATH,
        user : {
            loggedIn : false,
            data : null,
        },
        adminList : {data : null},
        isAdmin : false,
    },
    mutations :{
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        SET_LIST_ADMINS(state, data) {
            state.adminList.data = data;
        },
        SET_IS_ADMIN(state, bool){
            state.isAdmin = bool;
        }
    },
    actions:  {
        //set user state
        async fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                uid : user.uid
                });
                await this.dispatch("getDB")
                if(this.getters.admins.data != null || this.getters.admins.length > 0){
                    let found = false;
                    for(let member of this.getters.admins.data.id){
                        if(member.id == user.uid){
                            commit("SET_IS_ADMIN", true)
                            found = true;
                        }
                    }
                    if(!found){commit("SET_IS_ADMIN", false);}
                }
            } else {
                commit("SET_USER", null);
                commit("SET_IS_ADMIN", false)
            }
        },
        //setAdminList
        fetchDB({commit}, db){
            if (db){
                commit("SET_LIST_ADMINS", {
                    id: db
                })
            }
        },
        async getDB(){
            if( this.getters.admins.data == null || this.getters.admins.data.length == 0){
                const dbRef = ref(database);
                await get(child(dbRef, '/admins')).then((snapshot) =>{
                   if(snapshot.exists()){
                      this.dispatch("fetchDB", snapshot.val())
                   } else{
                      console.log('no data')
                   }
                   }).catch((error) => {console.log(error);
                });
             }
        }
    },
    getters : {
        getApiURL: state => state.apiURL,
        user(state){
            return state.user
        },
        adminState: state => state.isAdmin,
        admins : state => state.adminList,
    },
});