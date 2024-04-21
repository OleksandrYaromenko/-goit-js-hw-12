import axios from 'axios';


export async function requestPictures(query, currentPage) {
    const API_KEY = '43436630-0ca2cab0bed204149ca1c5fee'
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 15,
    });
    const { data } = await axios(`https://pixabay.com/api/?${params}`);
    return data;
}
