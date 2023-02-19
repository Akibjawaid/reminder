const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const username = form.username.value;
  const password = form.password.value;
  
  // Validate username and password
  if (username === 'admin' && password === 'admin123') {
    // User is authenticated
    window.location.href = "home.html";
  } else {
    // Invalid credentials
    alert('Invalid username or password.');
  }

});
