const Cookies = {
  Administrator: 'sfs34',
  Client: 'gdsd4'
}

const Administrator = {
  endpoint: '/api/administrators/auth',
  type: 'Administrator'
}

const Client = {
  endpoint: '/api/clients/auth',
  type: 'Client'
}

export const state = () => ({
  AdministratorToken: undefined,
  AdministratorData: undefined,
  ClientToken: undefined,
  ClientData: undefined
})

export const mutations = {
  setToken (state, { type, token }) {
    this.$axios.setToken(token)
    state[`${type}Token`] = token
  },
  setData (state, { type, data }) {
    state[`${type}Data`] = data
  },
  loadClient (state, data) {
    state.ClientData = data
  }
}

export const actions = {
  checkToken ({ commit }, { type }) {
    if (!state[`${type}Token`]) {
      const token = this.$cookies.get(Cookies[type])
      if (!token) { return false }
      commit('setToken', { type, token })
    }
    return true
  },
  async loadData ({ commit }, { endpoint, type }) {
    try {
      console.log('entro a load data', endpoint)
      const data = await this.$axios.$get(endpoint)
      console.log('data: ', data)
      commit('setData', { type, data })
      return true
    } catch (error) {
      console.log(error)
      commit('setToken', { type })
      commit('setData', { type })
      return false
    }
  },
  async login ({ commit, dispatch, state }, { endpoint, type, data }) {
    const endPoint = endpoint
    const token = await this.$axios.$post(endPoint, data)
    this.$cookies.set(Cookies[type], token)
    commit('setToken', { type, token })
  },
  logout ({ commit }, { type }) {
    commit('setData', { type })
    commit('setToken', { type })
    this.$cookies.remove(Cookies[type])
  },
  // administrator
  administratorLogin ({ dispatch }, data) {
    return dispatch('login', { ...Administrator, data })
  },
  administratorLogout ({ dispatch }) {
    return dispatch('logout', { type: 'Administrator' })
  },
  loadAdministratorData ({ dispatch }) {
    return dispatch('loadData', Administrator)
  },
  async checkAdministratorToken ({ dispatch }) {
    let response = await dispatch('checkToken', { type: 'Administrator' })
    if (response === true) {
      response = await dispatch('loadAdministratorData')
      return response
    } else {
      return false
    }
  },
  // client
  clientLogin ({ dispatch }, data) {
    return dispatch('login', { ...Client, data })
  },
  clientLogout ({ dispatch }) {
    return dispatch('logout', { type: 'Client' })
  },
  loadClientData ({ dispatch }) {
    return dispatch('loadData', Client)
  },
  async checkClientToken ({ dispatch }) {
    let response = await dispatch('checkToken', { type: 'Client' })
    if (response === true) {
      response = await dispatch('loadClientData')
      return response
    } else {
      return false
    }
  },

  // init
  async init ({ dispatch }) {
    if (await dispatch('checkAdministratorToken')) {
      await dispatch('loadAdministratorData')
    }
  }
}
