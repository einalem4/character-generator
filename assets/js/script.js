var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateCharacter = document.querySelector('#generate')



function getRandomRace() {
  fetch('https://www.dnd5eapi.co/api/races')

    .then(function (response) {
      return response.json();
    })

    .then(function (races) {
      for (var i = 0; i < 5; i++) {
        var raceName = races.results[Math.floor(Math.random() * races.results.length)]
        var randomRace = document.querySelector("[data-char-header='" + i + "']");
        randomRace.textContent = raceName.name;
      }
      console.log(races.name)
    });
}
getRandomRace()

function getRandomClass() {
  fetch('https://www.dnd5eapi.co/api/classes')

    .then(function (response) {
      return response.json();
    })

    .then(function (classes) {
      var classes = classes.results[[Math.floor(Math.random() * classes.results.length)]]
      console.log(classes.name)
      return classes.name

    });
}
getRandomClass()



//when the generate character button is clicked it generates random information
generateCharacter.addEventListener("click", function (e) {
  e.preventDefault();
  getRandomRace();
  getRandomClass();
  console.log("this worked!")
});