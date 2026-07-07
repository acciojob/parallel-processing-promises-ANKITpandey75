const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };

    img.src = url;
  });
}

// Function to download all images
function downloadImages() {
  loading.textContent = "Loading...";
  error.textContent = "";
  output.innerHTML = "";

  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      loading.textContent = "";

      images.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.textContent = "";
      error.textContent = err;
    });
}

// Start downloading automatically
downloadImages();