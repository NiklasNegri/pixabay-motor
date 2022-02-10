/* api info

search images:
https://pixabay.com/api/?key=25628261-88fe3cd1e6d3db0e5352b21b2&q= +
whatever + isTypedInTheForm +
&image_type=photo

if its a photo

*/

// function to get form value
let searchButton = document.querySelector('button');
let formInput = document.querySelector('input');

searchButton.onclick =  function(event) {
    alert('test searchButton onclick');
}

searchButton.onclick = event => {
    alert('test lambda onclick syntax');
}

searchButton.addEventListener('click', function(event) {
    alert('test searchButton eventlistener')
});