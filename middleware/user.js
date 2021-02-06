export default function({
  store,
  redirect
}) {
  if (!store.getters['_user/isLogged']) {
    return redirect('/');
  }
}
