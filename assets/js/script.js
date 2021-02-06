var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateBtn = document.querySelector('#generate');
var randomRace = 'https://www.dnd5eapi.co/api/races';
var randomClass = 'https://www.dnd5eapi.co/api/classes';
var charList = document.querySelector(".character-results")

//pulls random race and class
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
            console.log('https://www.dnd5eapi.co/api/classes/barbarian')
            return fetch('https://www.dnd5eapi.co/api/classes/barbarian')
          })
          .then(function (data) {
            return data.json();
          })
          .then(function (classDetails) {
            var hitDie = document.querySelector("[data-char-hit-die='" + counter + "']")
            hitDie.textContent = "Hit Die: " + classDetails.hit_die;
            counter++
          })
      })

  }
}

// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", function (e) {
  e.preventDefault()
  charList.classList.remove("hide");
  generateCharacter();
})
