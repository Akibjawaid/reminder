// Open the database
var db = openDatabase('reminders', '1.0', 'Reminder Application Database', 2 * 1024 * 1024);

// Execute a SELECT statement to get data from the table
db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM reminders', [], function(_tx, results) {
    var len = results.rows.length;
    var table = '<table><tr><th>id</th><th>date</th><th>subject</th><th>description</th><th>email</th><th>contact_number</th><th>sms_number</th></tr>';
    for (var i = 0; i < len; i++) {
      var row = results.rows.item(i);
      table += '<tr><td>' + row.id + '</td><td>' + row.date + '</td><td>'+ row.subject +'</td><td>'+ row.description + '</td><td>'+ row.email + '</td><td>'+ row.contact_number + '</td><td>' + row.sms_number +'</td></tr>';
    }
    table += '</table>';
    // Display the data on the webpage
    document.getElementById('mydata').innerHTML = table;
  });
});


function goBack() {
  window.history.back()
}

