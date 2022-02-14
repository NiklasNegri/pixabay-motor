// göra en klass med datan som en array? när man klickar search skapas ett objekt med tillhörande array
// medans man går igenom sidor med 10 bilder var så .remove; ar man bilder man sett i arrayen redan

function CreateAPIstring() {
    let searchForm = document.querySelector('input');
    let chosenColor = document.querySelector('select');

    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
    chosenColor.value + '+' + searchForm.value + '&image_type=photo';

    // needs an if statement if chosen color is empty for functionality
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

async function fetchJson() {
    const response = await fetch(CreateAPIstring());
    const data = await response.json();
    for (var i = 0; i < 10; i++) {
        addPictures(data.hits[i].webformatURL, data.hits[i].tags, data.hits[i].user, data.hits[i].pageURL);
        data.hits[i].remove;
    }
}

function addNextPage() {
    let pageControl = document.querySelector('#page_control');

    let nextPageButton = document.createElement('button');
    nextPageButton.innerText = 'Next Page';
    pageControl.append(nextPageButton);

    nextPageButton.onclick = event => {
        deletePictures();
        nextPageButton.remove();
    }
}

function addLastPage() {
    
}

let searchButton = document.querySelector('button');

searchButton.onclick = event => {
    // deletes pics from old search first before adding new ones
    deletePictures();
    // get the json data from api by sending 
    fetchJson();
}