import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// 登录时数据存入vuex
function setUserData(commit, data) {
  if (data.token) {
    /* commit('SET_TOKEN', data.token.Authorization)
    setToken(data.token.Authorization) */
    commit('SET_TOKEN', data.token.Authorization)
    setToken(data.token.Authorization)
    commit('SET_REFRESHTOKEN', data.token.refreshAuthorization)
    setRefreshToken(data.token.refreshAuthorization)
    commit('SET_RSAPUBLICKEY', data.token.RSAPublicKey)
  }
  if (data.user && data.user.roleList) {
    const _roles = []
    data.user.roleList.forEach(function(_item) {
      _roles.push(_item)
    })
    commit('SET_ROLES', _roles)
    commit('SET_NAME', data.user.username)
    commit('SET_AVATAR', data.user.userDetail.avatar)
    commit('SET_INTRODUCTION', data.user.createDate)
    /*   if ('resources' in data) {
      setResources(data.resources)
    }
    setUser(data.user)*/
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE', '')
      commit('RESET_STATE', [])
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

