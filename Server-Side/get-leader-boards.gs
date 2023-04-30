const scriptProp = PropertiesService.getScriptProperties();
function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet(request){
  try{
    return ContentService
      .createTextOutput(JSON.stringify(getAllLeaderBoards()))
      .setMimeType(ContentService.MimeType.TEXT);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function testGetLeaderBoardSheetNames(){
  let x = getLeaderBoardSheetNames();
  return x;
}

function getLeaderBoardSheetNames(){
  let names = [];
  names[0] = "OverallLeaders";
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("LeaderBoardIndex");
  let seasonNames =  sheet.getRange(2,1,sheet.getLastRow()).getValues().flat();
  for(let i=0; i < seasonNames.length; i++){
    if(seasonNames[i]){
      names.push(seasonNames[i]);
    }
  }
  return names;
}

function testGetLeaderBoard(){
  let x = getLeaderBoard('OverallLeaders', 'All Seasons Leader Board',  0);
  return x;
}

function getLeaderBoard(sheetName, name, order){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName(sheetName);
  let rows = sheet.getRange(3, 1, 15, 5).getValues();
  let threshold = sheet.getRange(1, 9).getValues().flat()[0];
  let leaderBoard = {
    'name': name,
    'targetThreshold':threshold,
    'currentThreshold': threshold,
    'order' : order,
    'leaders': []
  }
  for(let x = 0; x < rows.length; x++){
    let row = rows[x];
    if(row === undefined || row[0] === ''){
      break;
    }
    let leader = {
      'rank': row[0],
      'player': row[1],
      'gamesPlayed': row[2],
      'leagueScore': row[3],
      'winRate' : row[4]
    }
    leaderBoard.leaders.push(leader);
  }
  return leaderBoard;
}

function testGetAllLeaderBoards(){
  let x = getAllLeaderBoards();
  return x;
}

function getAllLeaderBoards(){
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName("LeaderBoards");
  let names = testGetLeaderBoardSheetNames();
  let theLeaderBoards =[];
  for(let i = 0; i < names.length; i++){
    let name = rename(names[i]);
    if(i === 0){
      name = 'All Seasons';
    }
    let leaderBoard = getLeaderBoard(names[i], name, i);
    theLeaderBoards.push(leaderBoard);
  }
  return theLeaderBoards;
}

function rename(name){
  return 'Season ' + name.replace('Leaders', '');
}
