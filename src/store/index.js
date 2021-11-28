import  Vue from 'vue'
import  Vuex from 'vuex'



Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        routes:[],
        token:'',
        // token:{
        //     access_token:"",
        //     token_type:"",
        //     refresh_token:"",
        //     expires_in:"",
        //     scope:""
        // }
    },
    mutations:{
        initRoutes(state,data){
            state.routes=data;


        },
        newToken(state,data){
            sessionStorage.setItem('token',data)
            state.token=data;
        }
    },
    actions:{

    }
})