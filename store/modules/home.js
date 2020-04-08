const state = () => ({
  hotPlace: []
})

const mutations = {
  setHotPlace (state, val) {
    state.hotPlace = val
  }
}

const actions = {
  setHotPlace (ctx, hotPlace) {
    ctx.commit('')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
