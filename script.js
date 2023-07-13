// script.js
// You can add any additional JavaScript functionality here if needed
// script.js
// script.js
// script.js
// script.js
let contactText; // Declare the contactText variable outside the event listeners

document.querySelector('.click-me').addEventListener('click', function() {
  contactText = document.createElement('div');
  contactText.classList.add('contact-text');
  contactText.textContent = 'Contact Me';
  document.body.appendChild(contactText);

  document.addEventListener('mousemove', function(event) {
    if (contactText) {
      const x = event.clientX;
      const y = event.clientY;
      const dx = (x - contactText.offsetLeft) * 0.07;
      const dy = (y - contactText.offsetTop) * 0.07;

      contactText.style.left = contactText.offsetLeft + dx + 'px';
      contactText.style.top = contactText.offsetTop + dy + 'px';
    }
  });

  // Display the remove-contact element
  document.querySelector('.remove-contact').style.display = 'inline-block';
});

document.querySelector('.remove-contact').addEventListener('click', function() {
  if (contactText) {
    document.body.removeChild(contactText);
    contactText = null; // Reset the contactText variable
  }

  // Hide the remove-contact element again
  document.querySelector('.remove-contact').style.display = 'none';
});

