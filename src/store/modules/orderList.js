import Vue from 'vue'

//存放页面数据，需要通过getters才能拿到
const state = {
    orderList: [],
    params: {}
}

//页面只有通过getters才能拿到state的数据
const getters = {
    getOrderList: state => state.orderList
}

//异步操作
const actions = {
    fetchOrderList ({commit,state}) {
        Vue.http.post('/api/getOrderList',state.params)
        .then((res) => {
            commit('updateOrderList',res.data.list)
        },(err) => {

        })        
    }
}

//同步操作
const mutations = {
    updateOrderList (state, payload) {
        state.orderList = payload
    },
    updateParams (state,{key,val}) {
        state.params[key] = val        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}