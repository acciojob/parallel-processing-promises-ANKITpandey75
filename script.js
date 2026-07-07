const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => resolve(img);

    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));

    img.src = url;
  });
}

async function downloadImages() {
  loading.textContent = "Loading...";
  error.textContent = "";
  output.innerHTML = "";

  try {
    const images = await Promise.all(imageUrls.map(downloadImage));

    loading.textContent = "";

    images.forEach((img) => {
      output.appendChild(img);
    });
  } catch (err) {
    loading.textContent = "";
    error.textContent = err.message;
  }
}

downloadImages();