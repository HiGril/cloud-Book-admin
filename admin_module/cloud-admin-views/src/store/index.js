import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store  = new Vuex.Store({
    state:{
        fromData:{
            avatar:"",
            desc:"",
            email:"",
            nickname:"",
            username:""
        },
    },
    mutations:{
        CHANGE_FORMDATA(state,userinfo){
            state.fromData = userinfo
        }

    },
    actions:{},
    plugins:[
        createPersistedState({
            storage: {
                getItem: key => sessionStorage.getItem(key),
                setItem: (key, value) =>
                    sessionStorage.setItem(key, value, { expires: 3, secure: true }),
                removeItem: key => sessionStorage.removeItem(key),
            },
        }),
    ]

})
export default store