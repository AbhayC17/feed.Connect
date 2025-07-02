// script.js

document.addEventListener('DOMContentLoaded', () => {
  const donorForm = document.getElementById('donorForm');

  if (donorForm) {
    donorForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        food: document.getElementById('food').value,
        location: document.getElementById('location').value
      };

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby_SGKLwWFH7ihHEuv78pzqfCu4NtGmBlwSTThMtf4gH3z2w7t0KbyCIj4bkkVQASqW/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        // Redirect after submission
        window.location.href = 'thankyou.html';
      } catch (error) {
        alert('Something went wrong. Please try again later.');
        console.error(error);
      }
    });
  }
});
