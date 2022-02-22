const pageCountDisplay = document.querySelector(".page-number");
const searchButton = document.querySelector(".search-button");
const nextPageButton = document.querySelector(".next-page-button");
const previousPageButton = document.querySelector(".previous-page-button");
const results = document.querySelector(".results");
const searchForm = document.querySelector('input');
const chosenColor = document.querySelector('select');
previousPageButton.setAttribute("disabled", "disabled");
nextPageButton.setAttribute("disabled", "disabled");

searchButton.onclick = event => {
    if (chosenColor.value === "") {
        searchIdString = searchForm.value;
    }
    else {
        searchIdString = searchForm.value + '&colors=' + chosenColor.value;
    }
    pageCount = 1;
    start(pageCount);
}

nextPageButton.onclick = event => {
    pageCount++;
    start(pageCount);
}

previousPageButton.onclick = event => {
    pageCount--;
    start(pageCount);
}

async function start(pageCount) {
    deletePictures();
    fetchJson(pageCount);
    pageCountDisplay.textContent = pageCount;
    setPageControlVisibility(pageCount);
}

async function fetchJson(pageCount) {
    const query = 'https://pixabay.com/api/?key=';
    const apiKey = '25628261-88fe3cd1e6d3db0e5352b21b2';
    const fullQuery = query + apiKey + '&q=' + searchIdString + '&page=' + pageCount + '&per_page=10';
    let response = await fetch(fullQuery);
    let data = await response.json();

    for (var i = 0; i < 10; i++) {
        if (data.hits[i] != undefined) {
            addPictures(data.hits[i].webformatURL, data.hits[i].tags, data.hits[i].user);
        }
        else if (data.hits[i] === undefined && i === 9) {
            nextPageButton.setAttribute("disabled", "disabled");
            const endOfResults = document.createElement('li');
            endOfResults.textContent = ('You have reached the end of the results');
            endOfResults.style.color = "white";
            endOfResults.style.fontSize = "x-large";
            results.append(endOfResults);
        }
    }
}

function addPictures(imgUrl, tags, photographer) {
    let image = document.createElement('img');
    image.setAttribute("src", imgUrl);

    let imageTags = document.createElement('p');
    imageTags.innerText = ('Tags: ' + tags + '\n\nUser: ' + photographer);

    let li = document.createElement('li');
    li.appendChild(image);
    li.appendChild(imageTags);
    results.append(li);
}

function deletePictures() {
    let liElements = document.querySelectorAll('li');
    liElements.forEach(li => {
        li.remove();
    });
}

function setPageControlVisibility(pageCount) {
    if (pageCount === 1) {
        previousPageButton.setAttribute("disabled", "disabled");
        nextPageButton.removeAttribute("disabled");
    }
    else if (pageCount === 2) {
        previousPageButton.removeAttribute("disabled");
        nextPageButton.removeAttribute("disabled");
    }
    else if (pageCount === 51) {
        nextPageButton.setAttribute("disabled", "disabled");
    }
}