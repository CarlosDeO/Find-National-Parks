'use strict';

const apiKey = 'owT7J4IFFRavbVTTZwoBQdEyI9Lk9zu7NtAP31lR';

const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`)
    return queryItems.join('&')
}

function displayResults(responseJson){
    console.log(responseJson)
    $('#results-list').empty();
    if (responseJson.total === 0){
        $('#js-error-message').text(`Something went wrong`);
    }
    for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            <p>${responseJson.data[i].description}</p>
            </li>`
        );
    }
    $('#results').removeClass('hidden');
}


function getNationalParks(searchTerm, maxResult) {

    const params = {
        Statecode: searchTerm,
        limit: maxResult-=1,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString ;
    console.log(url);
    // const options = {
    //     header: new Headers({
    //         "X-Api-Key": apiKey})
    // };
    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResult = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResult);
    });
}

$(watchForm);