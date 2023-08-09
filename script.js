/* eslint-disable semi */
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded () {
  console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements for links & photos, Add to DOM
function displayPhotos () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    item.href = photo.links.html;
    item.target = '_blank';
    // create img for photo
    const img = document.createElement('img');
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;
    img.title = photo.alt_description;
    // listen for when the last image loads
    img.addEventListener('load', imageLoaded);
    // append to image container
    item.appendChild(img);
    imageContainer.appendChild(item)
  })
}

// Unsplash API
const count = 10;
const apiKey = 'yU6elsY7nDS5rbPmfTf4p1PodfPGBsV5Ct2ygdZK0ts';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos () {
  const response = await fetch(apiUrl);
  photosArray = await response.json();
  displayPhotos();
}

// Check to see if scrolling is near bottom of page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// Onload
getPhotos();
