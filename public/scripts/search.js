window.onload = () => {
    dropDown();
    imageFetch();
    searchImages();
    removingLogin();
    userSettingFetch();
}



const getImageType = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('type');
}


const getImageQuery = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('q')
}



imageFetch = () => {
    let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${key}&q=${getImageQuery()}&image_type=${getImageType()}`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits)
    })
}

addImage = (images) => {
    wrapperSelector(images, ".search_wrapper");
}


searchImages = () => {
    searchParameters("#body_option", "search_submit", "#body_Search")
}





