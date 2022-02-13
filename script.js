function CreateAPIstring() {
    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
    searchForm.value + '+' + chosenColor.value + '&image_type=photo';

    // needs an if statement if chosen color is empty for functionality
}

// fixa parameterar för att lägga in taggar, img och fotograf info
function addPictures(imgUrl, tags, photographer) {
    let image = document.createElement('img');
    image.setAttribute("src", imgUrl);
    let imageTags = document.createElement('label');
    imageTags.textContext = tags;
    let imagePhotographer = document.createElement('h3');
    imagePhotographer.textContext = photographer;
    
    let li = document.createElement('li');
    li.appendChild(image, tags, photographer);
    results.append(li);
}

async function FetchJson() {
    const response = await fetch(CreateAPIstring());
    const data = await response.json()
    for (var i = 0; i < 10; i++) {
        console.log(data.hits[i]);
        addPictures(data.hits[i].previewURL, data.hits[i].tags, data.hits[i].user);
    }
}

// skapa en metod som tar en array med json objekt och isolerar bilderna
// sen stoppar in dom i mitt li element på sidan

let searchButton = document.querySelector('button');
let searchForm = document.querySelector('input');
let chosenColor = document.querySelector('select');
let results = document.querySelector('#results')

searchButton.onclick = event => {
    // get the json data from api by sending 
    FetchJson();
    // funktion för att visa alla bilder i listorna i html/dom

    // test: hitta värden på html elementen
    // alert('Search term: ' + searchForm.value + ' color: ' + chosenColor.value);
}