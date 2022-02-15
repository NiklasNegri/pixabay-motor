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

function addPictureData(fetchedData) {
    for (var i = 0; i < 10; i++) {
        addPictures(fetchedData.hits[i].webformatURL, fetchedData.hits[i].tags, fetchedData.hits[i].user, fetchedData.hits[i].pageURL);
    }
}

function deletePictures() {
    let liElements = document.querySelectorAll('li');
    liElements.forEach(li => {
        li.remove();
    });
}

async function fetchJson() {
    let response = fetch(CreateAPIstring());
    let data = await response.json()
        .then (data => fetchedData.push(data));
}

function itterateArray(fetchedData) {
    fetchedData.forEach(element => {
        alert(element);
    });
}

function addNextPage() {
    let pageControl = document.querySelector('#page_control');

    let nextPageButton = document.createElement('button');
    nextPageButton.innerText = 'Next Page';
    pageControl.append(nextPageButton);

    nextPageButton.onclick = event => {
        deletePictures();
        fetchJson();
        nextPageButton.remove();
    }
}

let searchButton = document.querySelector('button');
let fetchedData = [];

searchButton.onclick = event => {
    // deletes pics from old search first before adding new ones
    deletePictures();
    // get the json data from api by sending 
    fetchJson();

}