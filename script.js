import data from "./card-set-1/data.json" with { type: "json" };

const path = "./card-set-1/";
const numberOfCards = data.files.length;

console.log("numberOfCards", numberOfCards);

for (let file of data.files) {
  console.log(file);
}

onload = (event) => {
  const table = document.getElementById("table");
  const image1 = document.createElement("img")
  image1.src = path + data.files[0];

  table.appendChild(image1);
}