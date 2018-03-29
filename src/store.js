import Vuex from 'vuex'
import vue from 'vue'


vue.use(Vuex)

let options = {
  //全局数据管理
  state: {
    userInfo: {
      userName: '',
      userId: '',
      avatarUrl: '',
      menuList: []
    }
  },
  actions: {

  },
  mutations: {
    CLEAR_USER_INFO: (state) => {
      state.userInfo.userName = '';
      state.userInfo.userid = '';
      state.userInfo.avatarUrl = '';
      state.userInfo.menuList = [];
    },
    STORE_USER_INFO: (state, {userInfo}) => {
      state.userInfo = userInfo;
    }
  },
  getters: {
      ApplicationUserInfo : state => {
        if(state.userInfo.userName){
          return state.userInfo;
        }else{
          state.userInfo = localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : state.userInfo;
          return state.userInfo;
        }
      }
  }
}

const store = new Vuex.Store(options);
export default store
