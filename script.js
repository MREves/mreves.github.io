// ----------------
// Import file data to render:
// ----------------
import data from "./card-data/data.json" with { type: "json" };

// ----------------
// Set up global variables:
// ----------------

let clickNumber, selectionClicks, totalClicks, clicks, path, numberOfCards, cardStates;

const cardBackSrc = "https://raw.githubusercontent.com/MREves/mreves.github.io/main/card-data/000_pairs_image_cardback.jpg";

// ----------------
// create functions:
// ----------------

const flip = (index, isFlipped) => {
  const card = cardStates[index];
  card.isFlipped = isFlipped
  
  const cardElement = document.getElementById(`container-${index}`);
  const currentClass = cardElement.getAttribute("class");
  let newClass = card.isFlipped
    ? `${currentClass} flipped`
    : currentClass.replace(" flipped", "");

  cardElement.setAttribute("class", newClass);
}

const onCardClick = (index) => {
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

const getImageSrc = (filename) => 
  `https://raw.githubusercontent.com/MREves/mreves.github.io/main/card-data/${path}/${filename}`;


const dealCards = ()=>
{
  reset()
  // create and randomise a new array
  const gameImages = [...data[path].files, ...data[path].files];
  const cardImageArray = shuffle(gameImages);

  const table = document.getElementById("table");
  table.innerHTML = "";

  cardImageArray.forEach((filename, index) => {
    cardStates[index].filename = filename;

    const imgBack = document.createElement("img");
    imgBack.id = `back-${index}`;
    imgBack.src = cardBackSrc;
    imgBack.setAttribute("class", "image-back");
    
    const flipCardBack = document.createElement("div")
    flipCardBack.setAttribute("class", "flip-card-back");
    flipCardBack.appendChild(imgBack);

    const imgPicture = document.createElement("img");
    imgPicture.id = `picture-${index}`;
    imgPicture.src = getImageSrc(filename);
    imgBack.setAttribute("class", "image-picture");
    
    const flipCardPicture = document.createElement("div")
    flipCardPicture.setAttribute("class", "flip-card-picture"); // flip-card-front
    flipCardPicture.appendChild(imgPicture);

    const flipCardInner = document.createElement("div")
    flipCardInner.setAttribute("class", "flip-card-inner");
    flipCardInner.appendChild(flipCardPicture);
    flipCardInner.appendChild(flipCardBack);

    const flipCard = document.createElement("div")
    flipCard.id = `container-${index}`;
    flipCard.setAttribute("class", "flip-card");
    flipCard.appendChild(flipCardInner);
    flipCard.addEventListener("click", (event) => onCardClick(index))
    
    table.appendChild(flipCard);
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
