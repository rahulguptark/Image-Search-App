const accessKey = 'YvUkifcxiyHuSGxVMcsjLq_5vm1rtYf0qmXHNTuQ6OQ'
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

// funtion to fetxh images using Unsplash API

const fetchImages = async (query, pageNo) => {
    try {

        if(pageNo === 1){
            imagesContainer.innerHTML = '';
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    
        // Promise
        const response = await fetch(url);
        const data = await response.json();
    
        // console.log(data);
        
        if(data.results.length > 0) {
            data.results.forEach(photo => {
    
                // creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
        
                // creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');
        
                // creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;
        
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
        
                imagesContainer.appendChild(imageElement);
            })
        
            if(data.total_pages === pageNo){
                loadMoreBtn.style.display = "none"
            }
            else{
                loadMoreBtn.style.display = "block"
            }
        }
        else{
            imagesContainer.innerHTML = `<h2>No image found.</h2>`
            if(loadMoreBtn.style.display === "block"){
                loadMoreBtn.style.display = "none";
            }
        }
        
    } catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`
        
    }
    
}

// Adding Event Listener to search form

let page = 1;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText != ''){
        page = 1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
    
})

// Adding Event Listener to Load More button to fetch more images 

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
})