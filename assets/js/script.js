var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateCharacter = document.querySelector('#generate')

function searchRace() {
  fetch('https://www.dnd5eapi.co/api/races')

    .then(function (response) {
      return response.json();
    })

    .then(function (race) {
      console.log(race.results[0].name)

    });
}
searchRace()

function searchClass() {
  fetch('https://www.dnd5eapi.co/api/classes')

    .then(function (response) {
      return response.json();
    })

    .then(function (classes) {
      console.log(classes.results[0].name)

    });
}
searchClass()


//when the generate character button is clicked it generates random information
generateCharacter.addEventListener("click", function (e) {
  e.preventDefault();
  searchRace();
  console.log("this worked!")
});