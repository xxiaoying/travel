export default {
  changCurrent (state, city) {
    state.currentCity = city
    try {
      if (localStorage) {
        localStorage.currentCity = city
      }
    } catch (e) {

    }
  }
}
