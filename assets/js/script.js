var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, { accordion: false });
var generateBtn = document.querySelector('#generate');
var randomRace = 'https://www.dnd5eapi.co/api/races';
var randomClass = 'https://www.dnd5eapi.co/api/classes';
var charList = document.querySelector(".character-results");
var raceList = [];
var classList = [];
var imgList = [];

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
        raceList.push(raceName.index);
        return fetch(randomClass)
          .then(function (response) {
            return response.json();
          })
          .then(function (classes) {
            var className = classes.results[Math.floor(Math.random() * classes.results.length)]
            classList.push(className.index);
            var raceAndClass = document.querySelector("[data-char-header='" + counter + "']");
            raceAndClass.textContent = raceName.name + "  " + className.name
            counter++
            generateImages()
          })
      })
  }
}

//checks if race and class list are filled before running the fetch function
function generateImages() {
  if (classList.length < 5) {
    return;
  }
  for (j=0; j<5; j++) {
    imgFetch(j);
}

//fetch function grabs and places images for their respective class and race
function imgFetch(j) {
    fetch(
      'http://api.serpstack.com/search' +
      '?access_key=35320024a8400cca6f311123b3fce677' + 
      '&type=images' + 
      '&num=5' + 
      '&query=' + 
      raceList[j] + 
      '+' + 
      classList[j]
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var charImg = response.image_results[0].image_url;
      imgList.push(charImg);
      var charImgEl = document.querySelector("[data-char-img='" + j + "']");
      charImgEl.setAttribute('src', response.image_results[0].image_url);
      charImgEl.setAttribute('width', '300px');
    })
  }
}

// when the generate character button is clicked it generates random information
generateBtn.addEventListener("click", function (e){
  e.preventDefault()
  charList.classList.remove("hide");
  generateCharacter();
})