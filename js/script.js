// Pokemon popup related code
let pokemonPopup = document.getElementById('pokemon-popup');
let skipBtn = document.getElementById('skip-btn');
let searchBtn = document.getElementById('search-btn');
let pokemonInput = document.getElementById('pokemon-input');
let popupBgImage = document.getElementById('popup-bg-image');

// Pokemon cursor follower related code
let pokemonCursorFollower = document.getElementById('pokemon-cursor-follower');
let pokemonImage = document.getElementById('pokemon-image');

// Show the popup when the page loads
function showPopup() {
  var popup = document.getElementById('pokemon-popup');
  popup.classList.add('show');
}
setTimeout(showPopup, 2000);

// Hide the popup when the skip button is clicked
skipBtn.addEventListener('click', function() {
  pokemonPopup.style.display = 'none';
});

// Update the popup background image and the cursor follower image when the search button is clicked
searchBtn.addEventListener('click', function() {
  let pokemonName = pokemonInput.value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => response.json())
  .then(data => {
    let imageUrl = data.sprites.front_default; // Update to the specific sprite image URL you want

    pokemonImage.src = imageUrl;

    // Show the cursor follower
    pokemonCursorFollower.style.display = 'block';

    // Hide the popup
    pokemonPopup.style.display = 'none';
  })
  .catch(error => console.error('Error:', error));
});

// Positioning and speed of cursor follower
let mouseX = 0, mouseY = 0, posX = 0, posY = 0, speed = 0.01;

function update() {
  let distX = mouseX - posX;
  let distY = mouseY - posY;

  posX += distX * speed;
  posY += distY * speed;

  pokemonCursorFollower.style.transform = `translate(${posX}px, ${posY}px)`;

  requestAnimationFrame(update);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX + window.scrollX;
  mouseY = e.clientY + window.scrollY;
});

window.addEventListener('scroll', () => {
  mouseX = mouseX + 1;
  mouseY = mouseY + 1;
});

update();
