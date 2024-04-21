import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { requestPictures } from "./js/pixabay-api"

import { creatMarkup } from "./js/render-functions";

const form = document.querySelector(".search-form")
const gallery = document.querySelector(".gallery")
const loader = document.querySelector('.loader')
const formBtm = document.querySelector(".form-btn")
formBtm.style.display = "none"


form.addEventListener("submit", handelSubmit)
formBtm.addEventListener('click', searchImages);
loader.style.display = 'none';
let currentPage = 1;;
let totalPages = 0;


const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


async function handelSubmit(event) {
    event.preventDefault(); 
    formBtm.style.display = 'block';
    loader.style.display = 'inline-block';
    currentPage = 1;
   
    const {search} = event.currentTarget.elements
    
    if (search.value === "") { 
         iziToast.show({
            title: 'error',
            titleColor: 'white',
            message: 'Please find what you want to find',
            messageColor: 'white',
            color: 'red',
            position: 'topCenter',
            timeout: '2000',
        });
        return;
    }

    try { 
        const data = await requestPictures( search.value,currentPage);
        gallery.innerHTML = creatMarkup(data.hits)
        simpleLightbox.refresh()
        event.target.reset();
        totalPages = Math.ceil(data.totalHits / 15);
        if (currentPage < totalPages) {
            formBtm.style.display = 'none';
        }
        if (data.total === 0) {
            iziToast.show({
                title: 'error',
                titleColor: 'white',
                message: 'We cannot find a picture for this name, please enter the correct name',
                messageColor: 'white',
                color: 'red',
                position: 'topCenter',
                timeout: '2000',
            });
            form.reset();
            return;
        }
   
        
    } catch (Error) {
        iziToast.show({
            title: 'error',
            titleColor: 'white',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            messageColor: 'white',
            color: 'red',
            position: 'topCenter',
            timeout: '2000',
        });
    } finally {
        loader.style.display = 'none';
    }
}
    
      
    

async function searchImages() {
    currentPage += 1; 
    loader.style.display = 'none';
    try {
        const images = await requestPictures( search.value,currentPage).then(data => {
            const marcup = creatMarkup(data);
            gallery.insertAdjacentHTML('beforeend', marcup);
            simpleLightbox.refresh();

            const cardHeight = gallery.getBoundingClientRect().height;
            window.scrollBy({
                top: 2 * cardHeight,
                behavior: 'smooth',
            });

            if (data.hits.length <= 14) {
                formBtm.style.display = 'none';
               
                simpleLightbox.refresh();
            }
        });
    }
    catch (error) {
        iziToast.show({
            message: error.message
        });
    } finally {
        loader.style.display = 'none';
    }
}