export default ({ store: { state }, app: { $axios }, route: { path } }) => {
  const token = ((path) => {
    if (path.startsWith('/administrator')) {
      return state.session.AdministratorToken
    } else {
      return state.session.ClientToken
    }
  })(path)
  $axios.setToken(token)
}
