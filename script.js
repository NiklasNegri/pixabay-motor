async function start(pageCount, input, color){
    pageNumber.textContent = pageCount + 1;
    
    

    let response = await fetch('https://pixabay.com/api/?key=25610090-f98b2ca9c4df3ac280852af10&q=' + color.value + '+' + input.value +  '&per_page=200');
    let json = await response.json();

    console.log(json);

    

    let pictureID = pageCount * 10;
    for (let i = 0; i < 10; i++){
        addPictures(json.hits[i+pictureID].webformatURL)
    }
}

let form = document.querySelector('form');
let submitButton = document.querySelector('.submit-button')

form.onsubmit = event => {
    event.preventDefault();

    removePictures();

    // Fixa problem med att byta färg mitt i sökning så ändras det för nästa sida

    searchInput = document.querySelector('input');
    searchColor = document.querySelector('select');
    
    pageCount = 0;
    start(pageCount, searchInput, searchColor);
}

    
function removePictures (){
    let existingPictures = document.querySelectorAll('li');
    existingPictures.forEach(li => {
        li.remove();
    })

}

function addPictures (imgURL){
    let picture = document.createElement('img');
    picture.setAttribute('src', imgURL);

    let li = document.createElement('li');
    let results = document.querySelector('#pictures')
    li.appendChild(picture);

    results.append(li);
}

let pageNumber = document.querySelector('#page-number');
let pageCount = 0;
let nextPageButton = document.querySelector('.next-page');
let previousPageButton = document.querySelector('.previous-page');
let newSearch = true;

let searchInput;
let searchColor;

let firstSearch = true;

nextPageButton.onclick = event => {
    pageCount++;
    removePictures();

    start(pageCount, searchInput, searchColor);
}

previousPageButton.onclick = event => {
    pageCount--;
    removePictures()

    start(pageCount, searchInput, searchColor);}
