function getData(park, number) {
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${park}&api_key=AGhzdxQNjjTWmPLCwZu4uo4RYFEnrS7byASHkfb5&limit=${number}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderData(data)
        })
}

function renderData(responseJson) {
    if (responseJson.total == 0) {
        html = "no results found"
    } else {
        html = responseJson.data.map(item => `
        <li>
        ${item.name}
        <p>
        ${item.description}
        </p>
        <a href="${item.url}">
        ${item.url}
        </a>
        </li>
        <br>
    
        `)

    }
    $('ul').html(html)


}


function watchForm() {
    $('form').submit(e => {
            e.preventDefault()
            const park = e.target.park.value
            const number = e.target.number.value
            getData(park, number)
        }

    )
}

$(watchForm)