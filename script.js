import data from "./card-data/data.json" with { type: "json" };

const path = "card-set-2";
const numberOfCards = data[path].files.length;

console.log("numberOfCards", numberOfCards);

onload = (event) => {
  const table = document.getElementById("table");

  for (let file of data[path].files) {
    console.log(file)
    const image = document.createElement("img")
    image.src = `https://raw.githubusercontent.com/MREves/mreves.github.io/main/${path}/${file}`;
    image.style.width = "20%";
    image.style.padding = "10px";
    table.appendChild(image);
  }
}