const state = () => {
  return {
    province: '',
    city: ''
  }
}

const mutations = {
  setPosition: (state, { city, province }) => {
    state.city = city
    state.province = province
  }
}

const actions = {
  setPosition (context, position) {
    context.commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
