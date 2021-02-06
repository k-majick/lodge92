export default function({
  store,
  redirect
}) {
  if (store.getters['_cart/bookings'].length < 1) {
    return redirect('/');
  }
}
