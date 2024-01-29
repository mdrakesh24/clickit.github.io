const accessKey = "MHzagQ7ixr5Py1cPApSnd8tn65CAdU_sKIrsr-Xvz9k"

const formElement = document.querySelector(".subcon form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".result-box")
const showMore = document.getElementById("show-btn")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;

    if(inputData === ""){
        searchResults.innerHTML();
    }

    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${inputData}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-box');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if(page > 1){
        showMore.style.display = 'block';
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
    var section = document.getElementById('come-here');
    section.scrollIntoView({ behavior: 'smooth' });
});

showMore.addEventListener('click', (event) => {
    searchImages();
});