let currentCity = '南京'

try {
  if (localStorage.currentCity) {
    currentCity = localStorage.currentCity
    console.log(currentCity)
  }
} catch (e) {

}

export default {
  currentCity: currentCity
}
