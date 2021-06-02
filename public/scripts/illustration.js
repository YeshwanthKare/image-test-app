window.onload = () => {
    removingLogin();
    dropDown();
    imageFetch();
    searchImages();
    userSettingFetch()
}

imageFetch = () => {
    // let key = config.MY_KEY;
    let image = fetch(`https://pixabay.com/api/?key=${config.MY_KEY}&image_type=illustration`);
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addImage(data.hits);
        console.log(data.hits)
    })
}

addImage = (images) => {
   wrapperSelector(images, ".illustration_wrapper")
}