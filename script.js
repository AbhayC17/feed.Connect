let orgData = [];

document.addEventListener('DOMContentLoaded', () => {
  const donorForm = document.getElementById('donorForm');
  const orgSelect = document.getElementById('selectedOrg');
  const orgDetails = document.getElementById('orgDetails');

  // 🔄 Load Organizations into Dropdown
  fetch('https://script.google.com/macros/s/AKfycby_SGKLwWFH7ihHEuv78pzqfCu4NtGmBlwSTThMtf4gH3z2w7t0KbyCIj4bkkVQASqW/exec?action=getRegisteredOrganizations')
    .then(res => res.json())
    .then(data => {
      orgData = data;
      orgSelect.innerHTML = '<option value="">-- Select an organization --</option>';
      data.forEach((org, index) => {
        const option = document.createElement('option');
        option.value = index; // use index to reference full org details
        option.textContent = `${org.name} (${org.location})`;
        orgSelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error('Error fetching organizations:', err);
      orgSelect.innerHTML = '<option value="">-- Failed to load organizations --</option>';
    });

  // 🧾 Show Selected Organization Details
  orgSelect.addEventListener('change', () => {
    const index = orgSelect.value;
    if (index === '') {
      orgDetails.innerHTML = '';
      return;
    }

    const org = orgData[index];
    orgDetails.innerHTML = `
      <strong>${org.name}</strong><br>
      📍 Location: ${org.location}<br>
      ✉️ Email: ${org.email}<br>
      🏷️ Type: ${org.type || 'N/A'}
    `;
  });

  // 📨 Submit Donor Form
  if (donorForm) {
    donorForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const selectedIndex = orgSelect.value;
      const selectedOrg = orgData[selectedIndex]?.name || '';

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        food: document.getElementById('food').value,
        location: document.getElementById('location').value,
        selectedOrg: selectedOrg
      };

      try {
        await fetch('https://script.google.com/macros/s/AKfycby_SGKLwWFH7ihHEuv78pzqfCu4NtGmBlwSTThMtf4gH3z2w7t0KbyCIj4bkkVQASqW/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        // ✅ Redirect after success
        window.location.href = 'thankyou.html';
      } catch (error) {
        alert('Something went wrong. Please try again later.');
        console.error(error);
      }
    });
  }
});
