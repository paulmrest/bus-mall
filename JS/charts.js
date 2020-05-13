function displayVotingResultsChart(canvasElement) {
  var renderingCtx = canvasElement.getContext('2d');
  var busMallVotingChart = new Chart(renderingCtx, {
    type: 'horizontalBar',
    data: {
      labels: getAllProductNames(),
      datasets:
      [{
        label: 'Bus Mall - Voting Results',
        backgroundColor: 'rgb(15, 145, 32)', //green
        borderColor: 'rgb(15, 145, 32)', //green
        data: getAllProductVotes()
      },
      {
        label: 'Bus Mall - View Count Results',
        backgroundColor: 'rgb(201, 30, 173)', //purple
        borderColor: 'rgb(201, 30, 173)', //purple
        data: getAllProductViews()
      }]
    },
    options: {}
  });
}

function getAllProductNames() {
  var productNames = new Array();
  for (var i = 0; i < allProductImages.length; i++)
  {
    productNames.push(allProductImages[i].productName);
  }
  return productNames;
}

function getAllProductVotes() {
  var allProductVotes = new Array();
  for (var i = 0; i < allProductImages.length; i++)
  {
    allProductVotes.push(allProductImages[i].votes);
  }
  return allProductVotes;
}

function getAllProductViews() {
  var allProductViews = new Array();
  for (var i = 0; i < allProductImages.length; i++)
  {
    allProductViews.push(allProductImages[i].views);
  }
  return allProductViews;
}
