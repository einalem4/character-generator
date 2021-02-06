var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateBtn = document.querySelector('#generate');
var randomRace = 'https://www.dnd5eapi.co/api/races';
var randomClass = 'https://www.dnd5eapi.co/api/classes';


function generateCharacter() {
  for (var j = 0; j < 5; j++) {
    var counter = 0
    fetch(randomRace)
      .then(function (response) {
        return response.json();
      })
      .then(function (races) {
        var raceName = races.results[Math.floor(Math.random() * races.results.length)]

        return fetch(randomClass)
          .then(function (response) {
            return response.json();
          })
          .then(function (classes) {
            var className = classes.results[Math.floor(Math.random() * classes.results.length)]
            var raceAndClass = document.querySelector("[data-char-header='" + counter + "']");
            raceAndClass.textContent = raceName.name + "  " + className.name
            counter++
          })
      })
  }
}

// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", generateCharacter);
