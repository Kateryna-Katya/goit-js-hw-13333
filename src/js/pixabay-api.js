const BASE_URL = `https://pixabay.com/api/`;

export const fetchPhotos = userSerch => {
    const urlParams = new URLSearchParams({
        key: "45517792-9e921d102392e39380fbae016",
        q: userSerch,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    });
    return fetch(`${BASE_URL}?${urlParams}`).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
};


fetch(`${BASE_URL}?key=45517792-9e921d102392e39380fbae016&q=userSerch&image_type=photo&orientation=horizontal&safesearch=true`);