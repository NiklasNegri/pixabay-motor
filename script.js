function CreateAPIstring(pageCount) {
    let searchForm = document.querySelector('input');
    let chosenColor = document.querySelector('select');

    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
    chosenColor.value + '+' + searchForm.value + '&per_page=200';
}

// skapar objekt inuti li elementet i html
// och lägger in data från bilderna där
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
    li.onclick = event => {
        window.location.href = href;
    }
}

function deletePictures() {
    let liElements = document.querySelectorAll('li');
    liElements.forEach(li => {
        li.remove();
    });
    isCurrentlySearching = false;
}

async function fetchJson(pageCount) {
    let response = await fetch(CreateAPIstring());
    let data = await response.json()
    
    console.log(data);

    let pictureId = pageCount * 10;
    for (var i = 0; i < 10; i++) {
        addPictures(data.hits[i+pictureId].webformatURL, data.hits[i+pictureId].tags, data.hits[i+pictureId].user, data.hits[i+pictureId].pageURL);
    }
}

function setPageControlVisibility(pageCount) {
    if (pageCount === 0) {
        nextPageButton.setAttribute("disabled", "disabled");
        previousPageButton.setAttribute("disabled", "disabled");
    }
    else if (pageCount === 1) {
        nextPageButton.removeAttribute("disabled");
    }
    else {
        previousPageButton.removeAttribute("disabled");
    }
}

let pageCountDisplay = document.querySelector(".page-count");
let searchButton = document.querySelector(".search-button");
let nextPageButton = document.querySelector(".next-page-button");
let previousPageButton = document.querySelector(".previous-page-button")
let pageCount = 0;
pageCountDisplay.textContent = pageCount;

setPageControlVisibility(pageCount);

searchButton.onclick = event => {
    pageCountDisplay.textContent = pageCount + 1;
    // deletes pics from old search first before adding new ones
    deletePictures();
    // get the json data from api by sending 
    fetchJson(pageCount);
    pageCount++;
    setPageControlVisibility(pageCount);
}

nextPageButton.onclick = event => {
    pageCountDisplay.textContent = pageCount + 1;
    deletePictures();
    fetchJson(pageCount);
    pageCount++;
    setPageControlVisibility(pageCount);
}