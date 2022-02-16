let pageCountDisplay = document.querySelector(".page-count");
let searchButton = document.querySelector(".search-button");
let nextPageButton = document.querySelector(".next-page-button");
let previousPageButton = document.querySelector(".previous-page-button")
let pageCount = 0;
setPageControlVisibility(pageCount);

searchButton.onclick = event => {
    pageCount = 0;
    pageCountDisplay.textContent = pageCount + 1;
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
    let searchForm = document.querySelector('input');
    let chosenColor = document.querySelector('select');

    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
    chosenColor.value + '+' + searchForm.value + '&per_page=200';
}

function addPictures(imgUrl, tags, photographer, href) {
    let image = document.createElement('img');
    image.setAttribute("src", imgUrl);

    let imageTags = document.createElement('p');
    imageTags.innerText = ('Tags: ' + tags + '\n\nUser: ' + photographer);

    let li = document.createElement('li');
    let results = document.querySelector('#results')
    li.appendChild(image);
    li.appendChild(imageTags);
    results.append(li);

    li.onclick = event => {
        window.location.href = href;
    }
}

function deletePictures() {
    let liElements = document.querySelectorAll('li');
    liElements.forEach(li => {
        li.remove();
    });
}

async function fetchJson(pageCount) {
    deletePictures();
    let response = await fetch(CreateAPIstring());
    let data = await response.json()

    let arrayPos = pageCount * 10;
    for (var i = 1; i < 10; i++) {
        addPictures(data.hits[i+arrayPos].webformatURL, data.hits[i+arrayPos].tags, data.hits[i+arrayPos].user, data.hits[i+arrayPos].pageURL);
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
    else if (pageCount > 1) {
        previousPageButton.removeAttribute("disabled");
        nextPageButton.removeAttribute("disabled");
    }
}