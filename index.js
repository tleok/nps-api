'use strict';

// put your own value below!
const apiKey = 'TLcvOko6Ev3dwjjinbQvuqlXoMDN1VIsiQ7e40BD'
const searchURL = 'https://developer.nps.gov/api/v1/parks'


function formatQueryParams(params) {
  const querydata = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return querydata.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the data array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the data 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getStateParks(searchState, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: searchState,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getStateParks(searchState, maxResults);
  });
}

$(watchForm);