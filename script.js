// göra en klass med datan som en array? när man klickar search skapas ett objekt med tillhörande array
// medans man går igenom sidor med 10 bilder var så .remove; ar man bilder man sett i arrayen redan

function CreateAPIstring(pageCount) {
    let searchForm = document.querySelector('input');
    let chosenColor = document.querySelector('select');

    if (pageCount <= 9) {
        fetchPage = 1;
    }
    else if (pageCount <= 19) {
        fetchPage = 2;
    }
    else if (pageCount <= 29) {
        fetchPage = 3;
    }
    else if (pageCount <= 39) {
        fetchPage = 4;
    }
    else if (pageCount <= 49) {
        fetchPage = 5;
    }
    else {
        prompt('Reached end of pictures! Try searching again to find different results!')
    }

    if (chosenColor.value === 'Any Color') {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' +
        searchForm.value + '&page=' + fetchPage + '&per_page=100';
    }

    else {
        return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
        chosenColor.value + '+' + searchForm.value + '&page=' + fetchPage + '&per_page=100';
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

    // klicka på bilden = gå till bildens pixabay url
    // fixa historik så man kan gå tillbaka till tidigare sökning + sida ??
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
    let response = await fetch(CreateAPIstring(pageCount));
    let data = await response.json()

    console.log(data);

    let pictureId = pageCount * 10;
    for (var i = 0; i < 10; i++) {
        addPictures(data.hits[i+pictureId].webformatURL, data.hits[i+pictureId].tags, data.hits[i+pictureId].user, data.hits[i+pictureId].pageURL);
    }
}

let pageCountDisplay = document.querySelector(".page-count");
let searchButton = document.querySelector(".search-button");
let nextPageButton = document.querySelector(".next-page-button");
let pageCount = 0;
pageCountDisplay.textContent = pageCount;

searchButton.onclick = event => {
    pageCount = 0;
    pageCountDisplay.textContent = pageCount;
    // deletes pics from old search first before adding new ones
    deletePictures();
    // get the json data from api by sending 
    fetchJson(pageCount);
}

nextPageButton.onclick = event => {
    pageCount++;
    pageCountDisplay.textContent = pageCount;
    deletePictures();
    fetchJson(pageCount);
}