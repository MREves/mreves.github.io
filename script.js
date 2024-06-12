// ----------------
// Import file data to render:
// ----------------
import data from "./card-data/data.json" with { type: "json" };

const cardBack = "https://raw.githubusercontent.com/MREves/mreves.github.io/main/card-data/000_pairs_image_cardback.jpg";
const path = "card-set-2";
const numberOfCards = data[path].files.length;

// ----------------
// Set up global variables:
// ----------------

let clickNumber = 0;
let selectionClicks = 0;
let totalClicks = 0;
let clicks = 0;

let cardStates = Array.from(new Array(12), (element, index) => ({
  index,
  filename: "",
  isFlipped: false,
  isMatched: false
}));

// ----------------
// create functions:
// ----------------

const flip = (index, isFlipped) => {
  const card = cardStates[index];
  const domElement = document.getElementById(index);
  card.isFlipped = isFlipped
  card.isFlipped
    ? domElement.src = `https://raw.githubusercontent.com/MREves/mreves.github.io/main/card-data/${path}/${card.filename}`
    : domElement.src = cardBack
}

const onClick = (index) => {
  const card = cardStates[index];
  if(card.isFlipped) {
    return;
  }
  
  totalClicks++;
  document.getElementById("score").innerText = `Clicks: ${totalClicks}`;
  
if (clickNumber === 0) {
    console.log("First click", card.filename)
    flip(index, true);
    clickNumber++
  } else if (clickNumber === 1) {
    console.log("Second click", card.filename)
    const otherCardFilename = cardStates
      .filter(cs => cs.isFlipped && !cs.isMatched)[0].filename
    
    flip(index, true);
    clickNumber++

    if (card.filename === otherCardFilename) {
      cardStates
        .filter(cs => cs.filename === otherCardFilename)
        .forEach(c => c.isMatched = true);

        clickNumber = 0
    }
  } else {
    cardStates
      .filter(c => c.isFlipped && !c.isMatched)
      .forEach((card) => flip(card.index, false));
      
      clickNumber = 0
  }
}

const shuffle = (cardImages) => {
  let currentIndex = cardImages.length;

  while(currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [cardImages[currentIndex], cardImages[randomIndex]] =
      [cardImages[randomIndex], cardImages[currentIndex]];
  }

  return cardImages;
}

onload = (event) => {
  // create and randomise a new array
  const gameImages = [...data[path].files, ...data[path].files];
  const cardImageArray = shuffle(gameImages);

  const table = document.getElementById("table");
  cardImageArray.forEach((filename, index) => {
    // Create DOM element containing image
    const image = document.createElement("img");
    image.id = index;
    image.src = cardBack;
    image.style.width = "20%";
    image.style.padding = "10px";

    image.addEventListener("click", (event) => onClick(index))

    cardStates[index].filename = filename;
    
    table.appendChild(image);    
  });
}
