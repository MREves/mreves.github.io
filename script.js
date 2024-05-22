const data = require("./card-set-1/data.json");

const numberOfCards = data.files.length;

console.log("numberOfCards", numberOfCards);

for (let file of files) {
  console.log(file);
}

document.onload(event => {
  const table = document.getElementById("table");
  const image1 = document.createElement("img", { src: data.files[0] })

  table.appendChild(image1);
});