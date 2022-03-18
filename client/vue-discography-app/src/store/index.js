
import Vuex from "vuex";

export default new Vuex.Store({
    state : {
        apiURL : "http://localhost:5000/"
    },
    mutations :{

    },
    actions:  {
    },
    modules : {},
    getters : {
        getApiURL: state => state.apiURL,
    }
});