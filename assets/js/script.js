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
            raceAndClass.textContent = raceName.name + "  " + className.name;
            // calls function to get racial features. passes race and counter
            charRaceFeatures(raceName.index, counter);
            counter++

          })
      })
  }
}

// function to get racial features
var charRaceFeatures = function(race, counter) {
  
  // api for specific race
  var apiRaceUrl = 'https://www.dnd5eapi.co/api/races/' + race;
  fetch(apiRaceUrl).then(function(response) {
    response.json().then(function(data) { 
      // updates race
      var charRace = document.querySelector("[data-char-race='" + counter + "']");
      charRace.innerHTML = "<strong>Race: </strong>" + data.name;

      // updates race speed
      var charSpeed = document.querySelector("[data-char-speed='" + counter + "']");
      charSpeed.innerHTML = "<strong>Speed: </strong>" + data.speed;

      // updates race ability bonues
      var charAbilitiesEl = document.querySelector("[data-char-ability-bonus='" + counter + "']");
      charAbilitiesEl.innerHTML = "<strong>Ability Bonuses: </strong>";
      
        // checks to see if race is a half-elf
        if (data.name === "Half-Elf") {
          for (var i = 0; i < 2; i++) {
            var ability = data.ability_bonus_options.from[Math.floor(Math.random() * data.ability_bonus_options.from.length)].ability_score.name;
            var bonus = data.ability_bonus_options.from[Math.floor(Math.random() * data.ability_bonus_options.from.length)].bonus;
            var abilityEl = document.createElement('p');
            abilityEl.classList = "ability-bonus"
            abilityEl.textContent = "+" + bonus + " " + ability + " ";
            charAbilitiesEl.appendChild(abilityEl);
          }
        }  
        else {
          for (var i = 0; i < data.ability_bonuses.length; i++) {
            var ability = data.ability_bonuses[i].ability_score.name;
            var bonus = data.ability_bonuses[i].bonus;
            var abilityEl = document.createElement('p');
            abilityEl.classList = "ability-bonus"
            abilityEl.textContent = "+" + bonus + " " + ability + " ";
            charAbilitiesEl.appendChild(abilityEl);
          }
        }
      
      // updates race alignment
      var charAlignment = document.querySelector("[data-char-alignment='" + counter + "']");
      charAlignment.innerHTML = "<strong>Alignment: </strong>" + data.alignment;

      // updates race age
      var charAge = document.querySelector("[data-char-age='" + counter + "']");
      charAge.innerHTML = "<strong>Age: </strong>" + data.age;

      // updates race size
      var charSize = document.querySelector("[data-char-size='" + counter + "']");
      var sizeDes = data.size_description.split("Your");
      charSize.innerHTML = "<strong>Size: </strong>" + data.size + ". " + sizeDes[0];

      getRaceProf(data, counter);
      // getRaceTraits(data, counter);
    })
  })
};

var getRaceProf = function(race, counter) {
  console.log(race);
  var charSkillProf = document.querySelector("[data-char-skill-prof='" + counter + "']");
  var charWeapProf = document.querySelector("[data-char-weapon-prof='" + counter + "']");
  var charToolProf = document.querySelector("[data-char-tool-prof='" + counter + "']");
  var charLanguageEl = document.querySelector("[data-char-lang='" + counter + "']");
  charLanguageEl.innerHTML = "<strong>Languages: </strong>";

  if (race.starting_proficiencies.length === 0) {
    charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>" + "-";
    charWeapProf.innerHTML = "<strong>Weapon & Armor Proficiences: </strong>" + "-";
    charToolProf.innerHTML = "<strong>Tool Proficiences: </strong>" + "-";
  }

  for (var i = 0; i < race.languages.length; i++) {
    var language = race.languages[i].name;
    var langEl = document.createElement('p');
    langEl.classList = "proficiency"
    langEl.textContent = language + "   ";
    charLanguageEl.appendChild(langEl);
  }  

  if (race.index === "dragonborn") {
    
  }

  else if (race.index === "dwarf") {
    // dwarf weapon proficiences
    charWeapProf.innerHTML = "<strong>Weapon & Armor Proficiences: </strong>";
    for (var i = 0; i < race.starting_proficiencies.length; i++) {
      var prof = race.starting_proficiencies[i].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charWeapProf.appendChild(profEl);
    } 

    // dwarf tool proficiences
    charToolProf.innerHTML = "<strong>Tool Proficiences: </strong>";
    for (var i = 0; i < race.starting_proficiency_options.choose; i++) {
      var prof = race.starting_proficiency_options.from[Math.floor(Math.random() * race.starting_proficiency_options.from.length)].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charToolProf.appendChild(profEl);
    } 
  }

  else if (race.index === "elf") {
    // elf skill proficiences
    charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>" + "-";
    for (var i = 0; i < race.starting_proficiencies.length; i++) {
      var prof = race.starting_proficiencies[i].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charWeapProf.appendChild(profEl);
    } 

    // dwarf tool proficiences
    charToolProf.innerHTML = "<strong>Tool Proficiences: </strong>";
    for (var i = 0; i < race.starting_proficiency_options.choose; i++) {
      var prof = race.starting_proficiency_options.from[Math.floor(Math.random() * race.starting_proficiency_options.from.length)].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charToolProf.appendChild(profEl);
    } 
  }
  
  
};

// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", function (e){
  e.preventDefault()
  charList.classList.remove("hide");
  generateCharacter();
})