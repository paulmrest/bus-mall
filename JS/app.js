'use strict';

//global variables
const rootElement = document.getElementById('product-images');
const imageRootFolder = 'IMG/';
//static for now...guessing these will be variables later
const numberOfRounds = 5;
const numberOfImagesPerRound = 3;

var numberOfRoundsPlayed = 0;

var allProductImages = new Array();

var currentlyRenderedImages = new Array();

//ProductImage
function ProductImage(productName, fileName, extension) {
  this.productName = productName;
  this.filePath = ProductImage.buildFilePath(fileName, extension);
  this.altText = productName.replace(' ', '-');
  this.votes = 0;
  this.views = 0;
  allProductImages.push(this);
}

ProductImage.prototype.renderImage = function() {
  rootElement.style.display = 'flex';
  var newImgEl = document.createElement('img');
  //set HTML attributes
  newImgEl.setAttribute('src', this.filePath);
  newImgEl.setAttribute('alt', this.altText);
  newImgEl.setAttribute('title', this.altText);
  //set CSS styling
  newImgEl.style.float = 'left';
  newImgEl.style.margin = 'auto';
  newImgEl.style.maxWidth = '30%';
  currentlyRenderedImages.push(this);
  this.views++;
  rootElement.appendChild(newImgEl);
};

//class methods
ProductImage.buildFilePath = function(fileName, extension) {
  return `${imageRootFolder}${fileName}.${extension.toLowerCase()}`;
};

ProductImage.renderRandomImages = function(numberOfImages) {
  //check if there enough images insstantiated to render
  if (numberOfImages > allProductImages.length)
  {
    console.error('Not enough images to render.');
  }
  else
  {
    //clear children of HTML root element
    while (rootElement.firstChild)
    {
      rootElement.removeChild(rootElement.firstChild);
    }
    if (numberOfRoundsPlayed >= numberOfRounds)
    {
      rootElement.removeEventListener('click', handleImageClick);
      ProductImage.displayVotingResults();
    }
    else
    {
      var tempProductImagesBuilderArray = ProductImage.allProductImagesExceptLastRound();
      currentlyRenderedImages = new Array();
      for (var i = 0; i < numberOfImages; i++)
      {
        var randIndex = getRandMinMaxInclusive(0, tempProductImagesBuilderArray.length - 1);
        var newImageToRender = tempProductImagesBuilderArray[randIndex];
        newImageToRender.renderImage();
        //remove image from temp array
        tempProductImagesBuilderArray.splice(randIndex, 1);
      }
    }
  }
};

ProductImage.displayVotingResults = function() {
  rootElement.style.display = '';
  for (var i = 0; i < allProductImages.length; i++)
  {
    var newParaEl = document.createElement('p');
    newParaEl.innerText = `${allProductImages[i].productName} had ${allProductImages[i].votes} votes and was shown ${allProductImages[i].views} times.`;
    rootElement.appendChild(newParaEl);
    rootElement.appendChild(document.createElement('br'));
  }
};

//returns an array of all the ProductImage objects that are in allProductImages but
//not in currentlyRenderedImages
ProductImage.allProductImagesExceptLastRound = function() {
  if (currentlyRenderedImages.length === 0)
  {
    return allProductImages.slice();
  }
  var imagesNotRenderedLastRound = new Array();
  for (var i = 0; i < allProductImages.length; i++)
  {
    var oneProductImage = allProductImages[i];
    var renderedLastRound = false;
    for (var j = 0; j < currentlyRenderedImages.length; j++)
    {
      if (oneProductImage.altText === currentlyRenderedImages[j].altText)
      {
        renderedLastRound = true;
        break;
      }
      else if (j >= currentlyRenderedImages.length - 1 && !renderedLastRound)
      {
        imagesNotRenderedLastRound.push(oneProductImage);
      }
    }
  }
  return imagesNotRenderedLastRound;
};

//non-class functions
function handleImageClick(event) {
  var clickedImageHTMLTitle = event.target.title;
  for (var i = 0; i < currentlyRenderedImages.length; i++)
  {
    if (currentlyRenderedImages[i].altText === clickedImageHTMLTitle)
    {
      currentlyRenderedImages[i].votes++;
      numberOfRoundsPlayed++;
      ProductImage.renderRandomImages(numberOfImagesPerRound);
      break;
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
new ProductImage('R2D2 Bag', 'bag', 'jpg');
new ProductImage('Banana Slicer', 'banana', 'jpg');
new ProductImage('Tablet TP Stand', 'bathroom', 'jpg');
new ProductImage('Toeless Bootes', 'boots', 'jpg');
new ProductImage('All in One Breakfast', 'breakfast', 'jpg');
new ProductImage('Meatball Bubblegum', 'bubblegum', 'jpg');
new ProductImage('Unsittable Chair', 'chair', 'jpg');
new ProductImage('Cthulhu', 'cthulhu', 'jpg');
new ProductImage('Duck Mask for Dogs', 'dog-duck', 'jpg');
new ProductImage('Dragon Meat', 'dragon', 'jpg');
new ProductImage('Pen Cutlery', 'pen', 'jpg');
new ProductImage('Pet Sweep', 'pet-sweep', 'jpg');
new ProductImage('Pizza Scissors', 'scissors', 'jpg');
new ProductImage('Shark Sleeping Bag', 'shark', 'jpg');
new ProductImage('Baby Sweep', 'sweep', 'png');
new ProductImage('Tauntaun Sleeping-Bag', 'tauntaun', 'jpg');
new ProductImage('Unicorn Meat', 'unicorn', 'jpg');
new ProductImage('Tentacle USB', 'usb', 'gif');
new ProductImage('Self Watering Can', 'water-can', 'jpg');
new ProductImage('Misshapen Wine Glass', 'wine-glass', 'jpg');

setupEventListeners();

ProductImage.renderRandomImages(numberOfImagesPerRound);
