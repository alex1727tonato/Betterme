export default async function ({ store, route, redirect }) {
  const { path } = route
  if (path.startsWith('/administrator')) {
    if (await store.dispatch('session/checkAdministratorToken')) {
      if (path.includes('/login')) {
        redirect('/administrator')
      }
    } else if (!path.includes('/login')) {
      redirect('/administrator/login')
    }
  } else if (path.startsWith('/')) {
    if (await store.dispatch('session/checkClientToken')) {
      if (path.includes('/login')) {
        redirect('/')
      }
    } else if (!path.includes('/login')) {
      redirect('/login')
    }
  }
}
