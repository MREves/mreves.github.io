import data from "./card-set-1/data.json" with { type: "json" };

const path = "./card-set-1/";
const numberOfCards = data.files.length;

console.log("numberOfCards", numberOfCards);

for (let file of data.files) {
  console.log(file);
}

onload = (event) => {
  const table = document.getElementById("table");

  for (let file of data.files) {
    const image = document.createElement("img")
    image.src = path + file;
    table.appendChild(image);
  }
}