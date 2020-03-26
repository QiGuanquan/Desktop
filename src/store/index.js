import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false
  },
  mutations: {
    SET_IS_SHOW_LOADING (state, isShow) {
      state.isShowLoading = isShow
    }
  },
  actions: {

  }
})
