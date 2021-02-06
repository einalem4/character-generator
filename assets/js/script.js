var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  accordion: false
});

const SAVED_CHARACTER_KEY = "savedCharacter"

// function to save character to local storage
function saveCharacter() {
  var character = "sample";
  localStorage.setItem(SAVED_CHARACTER_KEY, character);
}

function loadCharacter() {
  var loadedCharacter = localStorage.getItem(SAVED_CHARACTER_KEY);
}

loadCharacter();
document.getElementById("save-btn").addEventListener("click", saveCharacter);