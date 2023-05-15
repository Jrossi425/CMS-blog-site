const $username = document.getElementById("username");
const $password = document.getElementById("password");
const $submitBtn = document.getElementById("submitBtn");

$submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = $username.value.trim();
  const password = $password.value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
});
