// Open the database
var db = openDatabase('reminders', '1.0', 'Reminder Application Database', 2 * 1024 * 1024);

// Execute a SELECT statement to get data from the table
db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM reminders', [], function(_tx, results) {
    var len = results.rows.length;
    var table = '<table><tr><th>id</th><th>date</th><th>subject</th><th>description</th><th>email</th><th>contact_number</th><th>sms_number</th><th>Delete</th></tr>';
    for (var i = 0; i < len; i++) {
      var row = results.rows.item(i);
      table += '<tr><td>' + row.id + '</td><td>' + row.date + '</td><td>'+ row.subject +'</td><td>'+ row.description + '</td><td>'+ row.email + '</td><td>'+ row.contact_number + '</td><td>' + row.sms_number +'</td><td><input type="checkbox" id="delete-checkbox-' + row.id + '"></td></tr>';
    }
    table += '</table>';
    // Display the data on the webpage
    document.getElementById('mydata').innerHTML = table;
  });
});

// Function to delete a reminder
function deleteReminder(id) {
  db.transaction(function(tx) {
    tx.executeSql('DELETE FROM reminders WHERE id = ?', [id], function(_tx, results) {
      console.log('Reminder deleted successfully');
    });
  });
}

// Function to handle the delete button click
function deleteButtonClick() {
  // Get all the checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Loop through the checkboxes to check if any of them are checked
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    if (checkbox.checked) {
      // Get the id of the reminder to be deleted
      var id = checkbox.id.split('-')[2];
      // Call the deleteReminder function with the id
      deleteReminder(id);
    }
  }

  // Refresh the page to show the updated data
  location.reload();
}

// Add a click event listener to the delete button
var deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', deleteButtonClick);

function goBack() {
  window.history.back()
}


// Function to delete the selected rows
function deleteSelected() {
  // Get all the checkboxes
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  var len = checkboxes.length;
  
  // Check if at least one row is selected
  if (len === 0) {
    alert('Please select at least one row to delete.');
    return;
  }
  
  // Confirm if the user wants to delete the selected rows
  if (confirm('Are you sure you want to delete the selected rows?')) {
    // Start a transaction to delete the selected rows
    db.transaction(function(tx) {
      for (var i = 0; i < len; i++) {
        var checkbox = checkboxes[i];
        var row = checkbox.parentNode.parentNode;
        var id = row.cells[1].textContent;
        tx.executeSql('DELETE FROM reminders WHERE id=?', [id]);
        row.parentNode.removeChild(row);
      }
    });
  }
}
