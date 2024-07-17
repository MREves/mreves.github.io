// ----------------
// Import file data to render:
// ----------------
import data from "./card-data/data.json" with { type: "json" };

// ----------------
// Set up global variables:
// ----------------

let clickNumber, selectionClicks, totalClicks, clicks, path, numberOfCards, cardStates;

const cardBack = "https://raw.githubusercontent.com/MREves/mreves.github.io/main/card-data/000_pairs_image_cardback.jpg";

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

const onImageClick = (index) => {
  const card = cardStates[index];
  if(card.isFlipped) {
    return;
  }
  
  totalClicks++;
  
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
    totalClicks--;
  }

  setScoreText();
}

const onSelectChange = (deckName) => {
  console.log(deckName);
  path = deckName;
  dealCards();
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

const setScoreText = () => {
  document.getElementById("score").innerText = `Clicks: ${totalClicks}`;
}

const reset = () => {
  clickNumber = 0;
  selectionClicks = 0;
  totalClicks = 0;
  clicks = 0
  
  setScoreText();

  const deckNames = Object.keys(data)
  path = deckNames[0];
  numberOfCards = data[path].files.length;

  cardStates = Array.from(new Array(numberOfCards * 2), (element, index) => ({
    index,
    filename: "",
    isFlipped: false,
    isMatched: false
  }));
}

const dealCards = ()=>
{
  reset()
  // create and randomise a new array
  const gameImages = [...data[path].files, ...data[path].files];
  const cardImageArray = shuffle(gameImages);

  const table = document.getElementById("table");
  table.innerHTML = "";

  cardImageArray.forEach((filename, index) => {
    // Create DOM element containing image
    const image = document.createElement("img");
    image.id = index;
    image.src = cardBack;
    image.style.width = "20%";
    image.style.padding = "10px";

    image.addEventListener("click", (event) => onImageClick(index))

    cardStates[index].filename = filename;
    
    table.appendChild(image);    
  })
};

onload = (event) => {
  const deckNames = Object.keys(data)

  const selectBox = document.getElementById("cards")
  deckNames.forEach((deckName)=>{
    const option = document.createElement("option");
    option.value = deckName;
    option.innerHTML = deckName;
    
    selectBox.appendChild(option);
  });
    
  selectBox.addEventListener("change", (event) => onSelectChange(selectBox.value));
  dealCards()
}
