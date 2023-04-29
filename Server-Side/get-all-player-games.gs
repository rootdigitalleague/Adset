const scriptProp = PropertiesService.getScriptProperties();
const allTimeFactionRow = 4;
const factionStatWidth = 2;
const firstSeasonFactionRow = 20;
const seasonNamCol = 2;

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet(request){
  try{
    return ContentService
      .createTextOutput(JSON.stringify(getAllFactionStats()))
      .setMimeType(ContentService.MimeType.TEXT);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function testGetAllFactionStats(){
  let x = getAllFactionStats();
  return x;
}
function testGetFactionNames(){
  let x = getFactionNames();
  return x;
}
function testGetSeasonStats(){
  let x = getSeasonStats(0, 'All Seasons', getFactionNames());
  return x;
}

function testSeasonNames(){
  let x = getSeasonNames();
  return x;
}

function getAllFactionStats(){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("FactionStats");
  let factionStats = {};
  let factions = getFactionNames();
  let seasonNames = getSeasonNames();
  seasonNames.forEach(function(seasonName, i){
    factionStats[seasonName] = getSeasonStats(i, seasonName, factions);
  });
  return factionStats;
}

function getSeasonStats(seasonIdx, seasonName, factions){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("FactionStats");
  let i = seasonIdx + 19;
  if(seasonIdx == 0){
    i = 4;
  }
  let seasonRow = sheet.getRange(i, 1, 1, sheet.getLastColumn()).getValues()[0];
  let seasonObj = {
    'order': seasonIdx,
    'name':seasonName,
    'factions': []
  }
  let factionStats = []
  for(let k = 0; k < factions.length; k++){
    let faction ={
      'order' : k,
      'faction' : factions[k],
      'gamesPlayed' : seasonRow[(k*2+2)],
      'leagueScore' : seasonRow[(k*2+3)],
      'winrate' :  seasonRow[(k*2+3)] / seasonRow[(k*2+2)]
    }
    factionStats[k] = faction;
  }
  seasonObj.factions =factionStats;

  return seasonObj;
}

function getSeasonNames(){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("FactionStats");
  let x =  sheet.getRange(20, 2, sheet.getLastColumn()).getValues().flat();
  let names = [];
  names[0] = 'All Seasons';
  for(let i = 0; i < x.length; i++ ){
    if(x[i]){
      names.push(x[i]);
    }
  }
  return names;
}

function getFactionNames(){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("FactionStats");
  let factionNames = [];
  let factionCount = (sheet.getLastColumn() -2) /2;
  for(let i= 0; i < factionCount; i++){
    factionNames[i] = getFactionName(i);
  }
  return factionNames;
}

function getFactionName(i){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("FactionStats");
  let x = i * factionStatWidth + 3;
  let factionNameRow = sheet.getRange(2, x,1, 1).getValues();
  return factionNameRow[0][0];
}


function getFactionMiscStats(){
  let miscStats = {};

}

