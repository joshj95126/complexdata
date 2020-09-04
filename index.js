"use strict"
const API_KEY = "AGhzdxQNjjTWmPLCwZu4uo4RYFEnrS7byASHkfb5"
const SEARCH_URL = 'https://developer.nps.gov/api/v1/parks'

function getStateParks(park, number) {
    const params = {
        stateCode: park,
        api_key: API_KEY,
        limit: number
    };
    const queryString = formatQueryParams(params)
    const url = SEARCH_URL + '?' + queryString;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderData(data)
        })
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function renderData(responseJson) {
    let html
    if (responseJson.total == 0) {
        html = "no results found"
    } else {
        html = responseJson.data.map(item => `
        <li>
        ${item.name}
        <p>
        ${item.description}
        </p>
        <a href="${item.url}" target="_blank">
        ${item.url}
        </a>
        </li>
        <br>
    
        `)

    }

    $('ul').removeClass('hidden')
    $('ul').html(html)


}


function watchForm() {
    $('form').submit(e => {
            e.preventDefault()
            const park = e.target.park.value
            const number = e.target.number.value
            getStateParks(park, number)
        }

    )
}

$(watchForm)