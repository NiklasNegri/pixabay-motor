function CreateAPIstring() {
    return 'https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q=' + 
    searchForm.value + '+' + chosenColor.value + '&image_type=photo';
}

async function FetchPics() {
    fetch(CreateAPIstring())
        .then(response => response.json())
        .then(data => console.log(data));
}

// skapa en metod som tar en array med json objekt och isolerar bilderna
// sen stoppar in dom i mitt li element på sidan

let searchButton = document.querySelector('button');
let searchForm = document.querySelector('input');
let chosenColor = document.querySelector('select');

searchButton.onclick = event => {
    // create link from api first
    alert(CreateAPIstring());
    // fetch metod
    FetchPics();
    // funktion för att visa alla bilder i listorna i html/dom

    // test: hitta värden på html elementen
    // alert('Search term: ' + searchForm.value + ' color: ' + chosenColor.value);
}