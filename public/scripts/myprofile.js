window.onload = () => {
    dropDown();
    userImageFetch();
    searchImages();
    userSettingsFetch();
    userSettingFetch()
}


let API = `https://image-site-app.herokuapp.com/users/image`
let API_BASE_URL = `https://image-site-app.herokuapp.com/`;


const userImageFetch = () => {
    // let key = config.MY_KEY;
    let url = `${API}`
    let image = fetch(url, {
        method: "GET",
    });
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addUserImages(data);
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

// addImage = (images) => {
//     wrapperSelector(images, ".photo_wrapper")
// }
let user_id = window.localStorage.getItem("token")
console.log(user_id)

const addUserImages = (images) => {
    var imageEl = document.querySelector(".myprofile_images_wrapper");
    var uploadedImage = "";
    for (const img of images) {

        if(user_id === img.user_id){
            if (img) {
                document.querySelector(".upload-myimage").style.display = 'none'
                document.querySelector(".myprofile_images").style.backgroundColor = '#FFF'
            }else{
                document.querySelector(".upload-myimage").style.display = 'block'

            }
            let postImage = API_BASE_URL + img.image;
            console.log(postImage)
            console.log(images)
            uploadedImage += `
                <a href = "/pages/individual-image.html?id=${img._id}">
                    <div class="image">
                        <img src="${postImage}" alt="">
                        <div class="image-specs">
                            <p id="name">${img.name}</p>
                            <p id="tag">${img.tags}</p>
                        </div>    
                    </div>
                </a>
            `
        }
    }

    imageEl.innerHTML += uploadedImage;
     
}

let Settings_API = `https://image-site-app.herokuapp.com/users/settings`


const userSettingsFetch = () => {
    // let key = config.MY_KEY;
    let url = `${Settings_API}`
    let image = fetch(url, {
        method: "GET",
    });
    image.then((response) => {
        return response.json();
    })
    .then((data) =>{
        addUserSettings(data);
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const addUserSettings = (settings) => {
    let SettingEl = document.querySelector(".myprofile_container")
    // SettingEl.style.backgroundImage = settings.coverImage
    console.log(SettingEl, settings)
    let uploadSetting = "";
    console.log(user_id)

    for(let setting of settings){
        if(user_id === setting.user_id){
            let profileImage = API_BASE_URL + setting.profileImage
            let coverImage = API_BASE_URL + setting.coverImage;
            SettingEl.style.backgroundImage = `url(${coverImage})`
        
            uploadSetting = `
                <div class="myprofile_name"><h1>${setting.username}</h1></div>
                <div class="myprofile_place">${setting.city} / ${setting.country}</div>
                <div class="myprofile_image">
                    <img src="${profileImage}" alt=""/>
                </div>
            `
        }
    }

    SettingEl.innerHTML = uploadSetting
}






searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}

