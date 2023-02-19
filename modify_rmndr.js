// Open the database
var db = openDatabase('reminders', '1.0', 'Reminder Application Database', 2 * 1024 * 1024);

// Execute a SELECT statement to get data from the table
db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM reminders', [], function(_tx, results) {
    var len = results.rows.length;
    var form = '<table><tr><th>id</th></tr>';
    for (var i = 0; i < len; i++) {
      var row = results.rows.item(i);
      table += '<tr><td>' + row.id + '</td><td>' + row.date + '</td><td>' + row.description + '</td><td>'+ row.email + '</td><td>'+ row.contact_number + '</td><td>' + row.sms_number +'</td></tr>';
    }
    table += '</table>';
    // Display the data on the webpage
    document.getElementById('mydata').innerHTML = table;
  });
});

var subjectObject = {
    "Front-end": {
      "HTML": ["Links", "Images", "Tables", "Lists"],
      "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
      "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]    
    },
    "Back-end": {
      "PHP": ["Variables", "Strings", "Arrays"],
      "SQL": ["SELECT", "UPDATE", "DELETE"]
    }
  }
  window.onload = function() {
    var subjectSel = document.getElementById("subject");
    var topicSel = document.getElementById("topic");
    var chapterSel = document.getElementById("chapter");
    for (var x in subjectObject) {
      subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      chapterSel.length = 1;
      topicSel.length = 1;
      //display correct values
      for (var y in subjectObject[this.value]) {
        topicSel.options[topicSel.options.length] = new Option(y, y);
      }
    }
    topicSel.onchange = function() {
      //empty Chapters dropdown
      chapterSel.length = 1;
      //display correct values
      var z = subjectObject[subjectSel.value][this.value];
      for (var i = 0; i < z.length; i++) {
        chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
      }
    }
  }
