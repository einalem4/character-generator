var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateBtn = document.querySelector('#generate');
var randomRace = 'https://www.dnd5eapi.co/api/races';
var randomClass = 'https://www.dnd5eapi.co/api/classes';
var charList = document.querySelector(".character-results");
var raceList;
var classList;
var imgList;



//pulls random race and class
function generateCharacter() {
  raceList = [];
  classList = [];
  imgList = [];
  for (var j = 0; j < 5; j++) {
    var counter = 0
    fetch(randomRace)
      .then(function (response) {
        return response.json();
      })
      .then(function (races) {
        var raceName = races.results[Math.floor(Math.random() * races.results.length)]
        raceList.push(raceName.index);
        return fetch(randomClass)
          .then(function (response) {
            return response.json();
          })
          .then(function (classes) {
            var className = classes.results[Math.floor(Math.random() * classes.results.length)]
            classFeatures(className, counter);
            classList.push(className.index);
            var raceAndClass = document.querySelector("[data-char-header='" + counter + "']");
            raceAndClass.textContent = raceName.name + "  " + className.name;
            // calls function to get racial features. passes race and counter
            charRaceFeatures(raceName.index, counter);
            counter++
            generateImages()
          })
      })
  }
}


function classFeatures(className, counter) {
  // fetch the random class details
  fetch(randomClass + "/" + className.index)
    .then(function (response) {
      return response.json();
    })
    .then(function (classDetails) {
      //calls hit die information
      var hitDie = document.querySelector("[data-char-hit-die='" + counter + "']")
      hitDie.innerHTML = "<strong>Hit Die: </strong>"
      var classEl = document.createElement('p');
      classEl.classList = "class features"
      classEl.textContent = "1d" + classDetails.hit_die;
      hitDie.appendChild(classEl);

      //calls saving throw
      var saveThrow = document.querySelector("[data-char-saving-throw='" + counter + "']")
      saveThrow.innerHTML = "<strong>Saving Throw: </strong>"
      for (var j = 0; j < classDetails.saving_throws.length; j++) {
        var throwEl = document.createElement('p');
        var saveEl = classDetails.saving_throws[j].name;
        throwEl.classList = "class features"
        throwEl.textContent = saveEl
        saveThrow.appendChild(throwEl);
      }

      //calls skill proficiency
      var proficSkill = document.querySelector("[data-char-class-skill-prof='" + counter + "']")
      proficSkill.innerHTML = "<strong>Skill Proficiences: </strong>"
      for (var j = 0; j < classDetails.proficiency_choices.length; j++) {
        for (var k = 0; k < classDetails.proficiency_choices[j].choose; k++) {
          var randomProf = classDetails.proficiency_choices[j].from[Math.floor(Math.random() * classDetails.proficiency_choices[j].from.length)].name;
          var profEl = document.createElement('p');
          profEl.classList = "proficiency"
          profEl.textContent = randomProf + " ";
          proficSkill.appendChild(profEl);
        }
      }
      //calls weapon & armor proficiences
      var wepAndArmor = document.querySelector("[data-char-class-weap-prof='" + counter + "']")
      wepAndArmor.innerHTML = "<strong>Weapon & Armor Proficiences: </strong>"
      for (var j = 0; j < classDetails.proficiencies.length; j++) {
        var wepArmEl = classDetails.proficiencies[j].name
        var wepEl = document.createElement('p');
        wepEl.classList = "proficiency"
        wepEl.textContent = wepArmEl + " ";
        wepAndArmor.appendChild(wepEl);
      }
      //fetch starter equipment
      return fetch('https://www.dnd5eapi.co/api/starting-equipment/' + className.index)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (starterEquip) {
      //starting equipment
      var equip = document.querySelector("[data-char-equip='" + counter + "']")
      equip.innerHTML = "<h4>Starting Equipment</h4>"
      for (var j = 0; j < starterEquip.starting_equipment.length; j++) {
        var equipEl = starterEquip.starting_equipment[j].equipment.name
        var amount = starterEquip.starting_equipment[j].quantity
        var starterEl = document.createElement('p');
        starterEl.classList = "equipment"
        starterEl.textContent = equipEl + " (" + amount + ")"
        equip.appendChild(starterEl);
      }
    })
}

//checks if race and class list are filled before running the fetch function
function generateImages() {
  if (classList.length < 5) {
    return;
  }
  for (j = 0; j < 5; j++) {
    imgFetch(j);
  }
}

  //fetch function grabs and places images for their respective class and race
  function imgFetch(j) {
    fetch(
      'https://api.serpstack.com/search' +
      '?access_key=7eaf47eac7faae1474915a4711ffb864' + 
      '&type=images' + 
      '&num=5' + 
      '&query=' + 
      raceList[j] + 
      '+' + 
      classList[j]
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var charImg = response.image_results[0].image_url;
        imgList.push(charImg);
        var charImgEl = document.querySelector("[data-char-img='" + j + "']");
        charImgEl.setAttribute('src', response.image_results[0].image_url);
        charImgEl.setAttribute('width', '300px');
      })
  }


// function to get racial features
var charRaceFeatures = function (race, counter) {

  // api for specific race
  var apiRaceUrl = 'https://www.dnd5eapi.co/api/races/' + race;
  fetch(apiRaceUrl).then(function (response) {
    response.json().then(function (data) {
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
      getRaceTraits(data, counter);
    })
  })
};

var getRaceProf = function (race, counter) {
  var charSkillProf = document.querySelector("[data-char-race-skill-prof='" + counter + "']");
  var charWeapProf = document.querySelector("[data-char-race-weapon-prof='" + counter + "']");
  var charToolProf = document.querySelector("[data-char-race-tool-prof='" + counter + "']");
  var charLanguageEl = document.querySelector("[data-char-race-lang='" + counter + "']");

  charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>" + "-";
  charWeapProf.innerHTML = "<strong>Weapon & Armor Proficiences: </strong>" + "-";
  charToolProf.innerHTML = "<strong>Tool Proficiences: </strong>" + "-";
  charLanguageEl.innerHTML = "<strong>Languages: </strong>";

  for (var i = 0; i < race.languages.length; i++) {
    var language = race.languages[i].name;
    var langEl = document.createElement('p');
    langEl.classList = "proficiency"
    langEl.textContent = language + "   ";
    charLanguageEl.appendChild(langEl);
  }

  if (race.index === "dwarf") {
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
    charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>";
    var prof = race.starting_proficiencies[0].name;
    prof = prof.split(":");
    var profEl = document.createElement('p');
    profEl.classList = "proficiency"
    profEl.textContent = prof[1] + "   ";
    charSkillProf.appendChild(profEl);
  }

  else if (race.index === "half-elf") {
    // half-elf skill proficiences
    charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>";
    for (var i = 0; i < race.starting_proficiency_options.choose; i++) {
      var prof = race.starting_proficiency_options.from[Math.floor(Math.random() * race.starting_proficiency_options.from.length)].name;
      prof = prof.split(":");
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof[1] + "   ";
      charSkillProf.appendChild(profEl);
    }

    // half-elf language options
    for (var i = 0; i < race.language_options.choose; i++) {
      var prof = race.language_options.from[Math.floor(Math.random() * race.language_options.from.length)].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charLanguageEl.appendChild(profEl);
    }
  }

  else if (race.index === "half-orc") {
    // half-orc skill proficiences
    charSkillProf.innerHTML = "<strong>Skill Proficiences: </strong>";
    var prof = race.starting_proficiencies[0].name;
    prof = prof.split(":");
    var profEl = document.createElement('p');
    profEl.classList = "proficiency"
    profEl.textContent = prof[1] + "   ";
    charSkillProf.appendChild(profEl);
  }

  else if (race.index === "human") {
    // human language options
    for (var i = 0; i < race.language_options.choose; i++) {
      var prof = race.language_options.from[Math.floor(Math.random() * race.language_options.from.length)].name;
      var profEl = document.createElement('p');
      profEl.classList = "proficiency"
      profEl.textContent = prof + "   ";
      charLanguageEl.appendChild(profEl);
    }
  }
};

var getRaceTraits = function (race, counter) {
  var charRaceTrait = document.querySelector("[data-char-race-trait='" + counter + "']");
  charRaceTrait.innerHTML = "<strong>" + race.traits[0].name + "</strong>";
}

// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", function (e) {
  e.preventDefault()
  charList.classList.remove("hide");
  generateCharacter();
})