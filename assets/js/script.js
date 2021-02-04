var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateCharacter = document.querySelector('#generate')

function searchRace() {
  fetch('https://www.dnd5eapi.co/api/races')

    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      console.log(response.results[0].name)

    });
}
searchRace()


//when the generate character button is clicked it generates random information
generateCharacter.addEventListener("click", function (e) {
  e.preventDefault();
  searchRace();
  console.log("this worked!")
});