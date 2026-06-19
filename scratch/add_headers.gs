function addEntityIdHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Dispatch Queue
  var dq = ss.getSheetByName('Dispatch Queue');
  if (dq) {
    var headers = dq.getRange(1, 1, 1, dq.getLastColumn()).getValues()[0];
    if (headers.indexOf('ENTITY_ID') === -1) {
      dq.getRange(1, 28).setValue('ENTITY_ID');
      Logger.log('Added ENTITY_ID to Dispatch Queue');
    }
  }

  // 2. Time Records
  var tm = ss.getSheetByName('Time Records');
  if (tm) {
    var headers = tm.getRange(1, 1, 1, tm.getLastColumn()).getValues()[0];
    if (headers.indexOf('ENTITY_ID') === -1) {
      tm.getRange(1, 24).setValue('ENTITY_ID');
      Logger.log('Added ENTITY_ID to Time Records');
    }
  }

  // 3. Tech Roster
  var tr = ss.getSheetByName('Tech Roster');
  if (tr) {
    var headers = tr.getRange(1, 1, 1, tr.getLastColumn()).getValues()[0];
    if (headers.indexOf('ENTITY_ID') === -1) {
      tr.getRange(1, 19).setValue('ENTITY_ID');
      Logger.log('Added ENTITY_ID to Tech Roster');
    }
  }
}
