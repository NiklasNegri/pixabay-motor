const pageCountDisplay = document.querySelector(".page-number");
const searchButton = document.querySelector(".search-button");
const nextPageButton = document.querySelector(".next-page-button");
const previousPageButton = document.querySelector(".previous-page-button");
const results = document.querySelector(".results");
const searchForm = document.querySelector('input');
const chosenColor = document.querySelector('select');

let searchIdString = "";
previousPageButton.setAttribute("disabled", "disabled");
nextPageButton.setAttribute("disabled", "disabled");

searchButton.onclick = event => {
    deletePictures();
    pageCount = 1;
    pageCountDisplay.textContent = pageCount;
    if (chosenColor.value === "") {
        searchIdString = searchForm.value;
    }
    else {
        searchIdString = searchForm.value + '&colors=' + chosenColor.value;
    }
    fetchJson(pageCount);
    setPageControlVisibility(pageCount);
}

nextPageButton.onclick = event => {
    deletePictures();
    pageCount++;
    fetchJson(pageCount);
    pageCountDisplay.textContent = pageCount;
    setPageControlVisibility(pageCount);
}

previousPageButton.onclick = event => {
    deletePictures();
    pageCount--;
    fetchJson(pageCount);
    pageCountDisplay.textContent = pageCount;
    setPageControlVisibility(pageCount);
}

function CreateAPIstring(pageCount) {
    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' +
        searchIdString + '&page=' + pageCount + '&per_page=10';
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

async function fetchJson(pageCount) {
    let response = await fetch(CreateAPIstring(pageCount));
    let data = await response.json();

    console.log(data);

    for (var i = 0; i < 10; i++) {
        if (data.hits[i] != undefined) {
            addPictures(data.hits[i].webformatURL, data.hits[i].tags, data.hits[i].user);
        }
        else if (data.hits[i] === undefined && i === 9) {
            nextPageButton.setAttribute("disabled", "disabled");
            const endOfResults = document.createElement('p');
            endOfResults.textContent = ('You have reached the end of the results');
            endOfResults.style.color = "white";
            endOfResults.style.fontSize = "x-large";
            const liElement = document.createElement('li');
            liElement.append(endOfResults);
            results.append(liElement);
        }
    }
}