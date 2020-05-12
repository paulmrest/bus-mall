'use strict';

//global variables
const rootElement = document.getElementById('product-images');
//static for now...guessing these will be variables later
const numberOfRounds = 25;
const numberOfImagesPerRound = 3;

var numberOfRoundsPlayed = 0;

var allProductImages = new Array();

var renderedProductImages = new Array();

function ProductImage(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.votes = 0;
  this.views = 0;
  allProductImages.push(this);
}

//class method
ProductImage.renderRandomImages = function(numberOfImages) {
  //clear all images under rootElement
  while (rootElement.firstChild)
  {
    rootElement.removeChild(rootElement.firstChild);
  }
  rootElement.style.display = 'flex';
  if (numberOfImages > allProductImages.length)
  {
    alert('Not enough products to render');
  }
  else
  {
    renderedProductImages = new Array();
    //make a copy of allProductImages array
    //Array.slice() will copy all object references to the new array
    var tempProductImagesBuilderArray = allProductImages.slice();
    for (var i = 0; i < numberOfImages; i++)
    {
      var randIndex = getRandMinMaxInclusive(0, tempProductImagesBuilderArray.length - 1);
      /*
      Initially the next line used Array.splice(), specifically:
      var newImageToRender = tempProductImagesBuilderArray.spliace(randIndex, 1);
      but while the console showed newImageToRender as being assinged to the
      ProductImage object we expect, and that ProductImage object having all its properities,
      when we tried to access the properities, they gave "undefined"
      No...idea...why..???

      Instead I'm just using bracket notation and using splice() at the end, returning that removed
      element to nothing.
      */
      var newImageToRender = tempProductImagesBuilderArray[randIndex];
      var newImgEl = document.createElement('img');
      //set HTML attributes
      newImgEl.setAttribute('src', newImageToRender.filePath);
      newImgEl.setAttribute('alt', newImageToRender.productName);
      newImgEl.setAttribute('title', newImageToRender.productName);
      //set CSS styling
      newImgEl.style.float = 'left';
      newImgEl.style.margin = 'auto';
      newImgEl.style.maxWidth = '30%';
      renderedProductImages.push(newImageToRender);
      newImageToRender.views++;
      rootElement.appendChild(newImgEl);
      tempProductImagesBuilderArray.splice(randIndex, 1);
    }
  }
};

function displayVotingResults() {
  //remove images to display results
  while (rootElement.firstChild)
  {
    rootElement.removeChild(rootElement.firstChild);
  }
  rootElement.style.display = '';
  for (var i = 0; i < allProductImages.length; i++)
  {
    var newParaEl = document.createElement('p');
    newParaEl.innerText = `${allProductImages[i].productName} had ${allProductImages[i].votes} votes and was shown ${allProductImages[i].views} times.`;
    rootElement.appendChild(newParaEl);
    rootElement.appendChild(document.createElement('br'));
  }
}

function handleImageClick(event) {
  var clickedImageTitle = event.target.title;
  for (var i = 0; i < renderedProductImages.length; i++)
  {
    if (renderedProductImages[i].productName === clickedImageTitle)
    {
      renderedProductImages[i].votes++;
      numberOfRoundsPlayed++;
      if (numberOfRoundsPlayed < numberOfRounds)
      {
        ProductImage.renderRandomImages(numberOfImagesPerRound);
        break;
      }
      else
      {
        rootElement.removeEventListener('click', handleImageClick);
        displayVotingResults();
      }
    }
  }
}

function setupEventListeners() {
  rootElement.addEventListener('click', handleImageClick);
}

//utility functions
function getRandMinMaxInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//executables
new ProductImage('R2D2-Bag', 'IMG/bag.jpg');
new ProductImage('Banana-Slicer', 'IMG/banana.jpg');
new ProductImage('Tablet-TP-Stand', 'IMG/bathroom.jpg');
new ProductImage('Toeless-Bootes', 'IMG/boots.jpg');
new ProductImage('All-in-One-Breakfast', 'IMG/breakfast.jpg');
new ProductImage('Meatball-Bubblegum', 'IMG/bubblegum.jpg');
new ProductImage('Unsittable-Chair', 'IMG/chair.jpg');
new ProductImage('Cthulhu', 'IMG/cthulhu.jpg');
new ProductImage('Duck-Mask-For-Dogs', 'IMG/dog-duck.jpg');
new ProductImage('Dragon-Meat', 'IMG/dragon.jpg');
new ProductImage('Pen-Cutlery', 'IMG/pen.jpg');
new ProductImage('Pet-Sweep', 'IMG/pet-sweep.jpg');
new ProductImage('Pizza-Scissors', 'IMG/scissors.jpg');
new ProductImage('Shark-Sleeping-Bag', 'IMG/shark.jpg');
new ProductImage('Baby-Sweep', 'IMG/sweep.png');
new ProductImage('Tauntaun-Sleeping-Bag', 'IMG/tauntaun.jpg');
new ProductImage('Unicorn-Meat', 'IMG/unicorn.jpg');
new ProductImage('Tentacle-USB', 'IMG/usb.gif');
new ProductImage('Self-Watering-Can', 'IMG/water-can.jpg');
new ProductImage('Misshapen-Wine-Glass', 'IMG/wine-glass.jpg');

setupEventListeners();

ProductImage.renderRandomImages(numberOfImagesPerRound);
