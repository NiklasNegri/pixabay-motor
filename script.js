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
    const searchForm = document.querySelector('input');
    const chosenColor = document.querySelector('select');

    if (pageCount < 19) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        chosenColor.value + '+' + searchForm.value + '&page=1&per_page=200';
    }
    else if (pageCount >= 19 && pageCount < 39) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        chosenColor.value + '+' + searchForm.value + '&page=2&per_page=200';
    }
    else if (pageCount >= 39 && pageCount < 50) {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        chosenColor.value + '+' + searchForm.value + '&page=3&per_page=200';
    }
    else if (pageCount >= 50) {
        // message user that they cant fetch more pictures
        // becuase api limitations are 3 pages with 200 pictures per page max
    }
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
    let response = await fetch(CreateAPIstring(pageCount));
    let data = await response.json()

    if (pageCount < 19) {
        arrayPos = pageCount * 10;
    }
    else if (pageCount >= 19 && pageCount < 39) {
        arrayPos = (pageCount - 19) * 10;
    }
    else if (pageCount >= 39 && pageCount < 50) {
        arrayPos = (pageCount - 39) * 10; 
    }

    for (var i = 0; i < 10; i++) {
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