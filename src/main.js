import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



import { createGalleryCardTemplate } from "./js/render-functions.js";
import { fetchPhotos } from "./js/pixabay-api.js"


const searchFormEl = document.querySelector(`.js-search-form`);
const galleryEl = document.querySelector('.js-gallery');
const loadingIndicatorEl = document.createElement('div');

loadingIndicatorEl.classList.add('loading-indicator', 'hidden');
document.body.appendChild(loadingIndicatorEl);

function showLoadingIndicator() {
    loadingIndicatorEl.classList.remove('hidden');
}
function hideLoadingIndicator() {
    loadingIndicatorEl.classList.add('hidden');
}


const onSearchFormSubmit = event => {
    event.preventDefault();

    const searchedValue = searchFormEl.elements.user_query.value.trim();
    showLoadingIndicator();

    fetchPhotos(searchedValue)
        .then(data => {
            if (data.total === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });

                galleryEl.innerHTML = '';
                searchFormEl.reset();
                hideLoadingIndicator();
                return;
            }

            const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

            galleryEl.innerHTML = galleryCardsTemplate;

            const lightbox = new SimpleLightbox('.js-gallery a', {
                captions: true,
                captionsData: 'alt',
                captionPosition: 'bottom',
                captionDelay: 250,
                overlayOpacity: 0.7,
            });

            lightbox.refresh();

        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            hideLoadingIndicator();
            searchFormEl.reset();
        });
};


searchFormEl.addEventListener('submit', onSearchFormSubmit);



