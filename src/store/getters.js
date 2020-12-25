const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  access_token: state => state.user.access_token,
  admin_name: state => state.user.admin_name,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes
}
export default getters
