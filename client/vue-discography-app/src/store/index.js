
import Vuex from "vuex";

export default new Vuex.Store({
    state : {
        apiURL : process.env.VUE_APP_API_PATH,
        user : {
            loggedIn : false,
            data : null,
        },
        adminList : {data : null}
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
        }
    },
    actions:  {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                uid : user.uid
                });
            } else {
                commit("SET_USER", null);
            }
        },
        /*
        fetchDB({commit}, db){
            if (db){
                commit("SET_LIST_ADMINS", {
                    id: db.
                })
            }
        }
        //setAdminList
        */
    },
    modules : {},
    getters : {
        getApiURL: state => state.apiURL,
        user(state){
            return state.user
        }
    }
});