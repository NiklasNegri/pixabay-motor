const pageCountDisplay = document.querySelector(".page-number");
const searchButton = document.querySelector(".search-button");
const nextPageButton = document.querySelector(".next-page-button");
const previousPageButton = document.querySelector(".previous-page-button");
const results = document.querySelector(".results");
const searchForm = document.querySelector('input');
const chosenColor = document.querySelector('select');
let searchIdString = "";

let pageCount = 0;
setPageControlVisibility(pageCount);

searchButton.onclick = event => {
    pageCount = 0;
    pageCountDisplay.textContent = pageCount + 1;
    if (chosenColor.value === "") {
        searchIdString = searchForm.value;
    }
    else {
        searchIdString = searchForm.value + '+' + chosenColor.value;
    }
    fetchJson(pageCount);
    setPageControlVisibility(pageCount+1);
}

nextPageButton.onclick = event => {
    pageCount++;
    fetchJson(pageCount);
    pageCountDisplay.textContent = pageCount + 1;
    setPageControlVisibility(pageCount+1);
}

previousPageButton.onclick = event => {
    pageCount--;
    fetchJson(pageCount);
    pageCountDisplay.textContent = pageCount + 1;
    setPageControlVisibility(pageCount+1);
}

function CreateAPIstring(pageCount) {
    if (pageCount < 19) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        searchIdString + '&page=1&per_page=200';
    }
    else if (pageCount >= 19 && pageCount < 39) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        searchIdString + '&page=2&per_page=200';
    }
    else if (pageCount >= 39 && pageCount < 60) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        searchIdString + '&page=3&per_page=200';
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

async function fetchJson(pageCount) {
    deletePictures();
    let response = await fetch(CreateAPIstring(pageCount));
    let data = await response.json()

    if (pageCount < 19) {
        arrayPos = pageCount * 10;
    }
    else if (pageCount >= 19 && pageCount < 39) {
        arrayPos = (pageCount - 19) * 10;
    }
    else if (pageCount >= 39 && pageCount < 60) {
        arrayPos = (pageCount - 39) * 10; 
    }

    for (var i = 0; i < 10; i++) {
        if (data.hits[i+arrayPos] != undefined) {
            addPictures(data.hits[i+arrayPos].webformatURL, data.hits[i+arrayPos].tags, data.hits[i+arrayPos].user);
        }
        else if (data.hits[i+arrayPos] === undefined && i === 9) {
            nextPageButton.setAttribute("disabled", "disabled");
            const endOfResults = document.createElement('p');
            endOfResults.textContent = ('You have reached the end of the results');
            endOfResults.style.color =  "white";
            endOfResults.style.fontSize = "x-large";
            const liElement = document.createElement('li');
            liElement.append(endOfResults);
            results.append(liElement);
        } 
    }
}

function setPageControlVisibility(pageCount) {
    if (pageCount === 0) {
        previousPageButton.setAttribute("disabled", "disabled");
        nextPageButton.setAttribute("disabled", "disabled");
    }
    else if (pageCount === 1) {
        previousPageButton.setAttribute("disabled", "disabled");
        nextPageButton.removeAttribute("disabled");
    }
    else if (pageCount > 1 && pageCount < 59) {
        previousPageButton.removeAttribute("disabled");
        nextPageButton.removeAttribute("disabled");
    }
    else if (pageCount === 59) {
        nextPageButton.setAttribute("disabled", "disabled");
    }
}