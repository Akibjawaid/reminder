 // Handle logout button click
 const Logoutbtn = document.getElementById("logout-btn"); // get the button element

 Logoutbtn.addEventListener("click", function() {
   window.location.href = "index.html"; // redirect to index.html page
 });
 
         // Display the current date in the header
 const dateElement = document.getElementById('date');
 const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
 const today = new Date().toLocaleDateString('en-US', dateOptions);
 dateElement.textContent = `Today is ${today}.`;