import { login, logout, getInfo } from '@/api/user'
import { getAccessToken, setAccessToken, removeToken } from '@/utils/auth'

const state = {
  access_token: getAccessToken(),
  admin_name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
  },
  SET_NAME: (state, admin_name) => {
    state.admin_name = admin_name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_ACCESS_TOKEN', response.access_token)
        setAccessToken(response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.access_token).then(response => {
        const { data } = response
        data.roles = ['admin']
        data.avatar = require('@/assets/avatars/phper.png')
        commit('SET_AVATAR', '')
        commit('SET_ROLES', ['admin'])
        commit('SET_NAME', data.admin_name)
        commit('SET_AVATAR', data.avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
