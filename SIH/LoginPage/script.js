
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from submitting normally
  
  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Simple validation check
  if (email === '' || password === '') {
    alert('Please enter both email and password.');
  } else {
    // You can redirect to another page or show a success message
    alert('Login successful!');
    window.location.href = "index3.html"; // Redirect to a new page
  }
});
