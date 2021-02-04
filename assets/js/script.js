var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  accordion: false
});

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