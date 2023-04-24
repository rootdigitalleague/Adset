
const GOOGLE_SHEET_FETCH_ALL_PLAYER_NAMES =
  "https://script.google.com/macros/s/AKfycbyHLf5q-A9gV0iM1j0Uldxr1DTWCob4cGXLgQcwJZVbM1UIZXYNGdn0HbdWlIijdqcd/exec";
var registeredPlayers = [];

fetch(GOOGLE_SHEET_FETCH_ALL_PLAYER_NAMES).then((response)=> response.json()).then((data)=> {
  console.log(data);
  registeredPlayers = data;
  addAutoComplete(data);
});
function addAutoComplete(data) {
  ['#playerName1', '#playerName2', '#playerName3', '#playerName4', '#playerNameLookUp', '#opponentLookUp1', '#opponentLookUp2', '#opponentLookUp3'].forEach(function(name){
    new autoComplete({
      selector: name,
      minChars: 1,
      source: mySuggest
    });
  });
  function mySuggest(term, suggest) {
    term = term.toLowerCase();
    let choices = data;
    let matches = [];
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].toLowerCase().startsWith(term)) {
        matches.push(choices[i]);
      }
    }
    //if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
    suggest(matches);
  }
}
