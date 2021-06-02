window.onload = () => {
    searchImages()
    getIndividualImage();
    dropDown()
    settingsFetch()
    removingLogin();
    userSettingFetch();
    removeImage();
    
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}




function getIndividualImage() {
    const my_key = config.MY_KEY;
    let myUrl = ``;

    if(getPostIdParam().length <= 7){
        myUrl = `https://pixabay.com/api/?key=${my_key}&id=${getPostIdParam()}`
    }else{
        myUrl = `https://image-site-app.herokuapp.com/users/image/${getPostIdParam()}`
    }

    if(myUrl){
        fetch(myUrl, {
            method: 'GET',
        })
        .then(res => {
            return res.json();
        }) 
        .then((data)=>{
            if(data.hits){
                showIndividualImage(data.hits[0])
            }else {            
                showUserImages(data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}


// API Images Fetch

const showIndividualImage = (image) => {
    // console.log(image)
    // console.log(image.user)
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem")

    let user = document.createElement("div");
    user.setAttribute("class", "user-attributes");

    let userName = document.createElement("p");
    userName.setAttribute("class", "user-name");
    userName.innerText = image.user;

    let userTags = document.createElement("p");
    userTags.setAttribute("class", "user-tags");
    userTags.innerText = image.tags

    // console.log(userTags)

    
  
    imageElem.src = image.fullHDURL;

    document.querySelector(".profile_image").style.backgroundImage = `url(${image.userImageURL})`;
    document.querySelector(".profile_name").innerText = image.user
    document.querySelector(".individual_like").innerHTML = `<i class="far fa-heart"></i>  <span>${image.likes}</span>`
    document.querySelector(".individual_favorite").innerHTML = `<i class="far fa-star"></i>  <span>${image.favorites}</span>`
    document.querySelector(".image_comments").innerHTML = `<button>${image.comments}  comments</button>`
    

    user.appendChild(userName);
    user.appendChild(userTags);
                    
    divEl.appendChild(user)    

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    // console.log(container)

    // downloadable images

    document.querySelector(".individual_delete").style.display = 'none'
    // document.querySelector(".profile-navigate").style.display = 'none'
    document.querySelector(".download-image").style.justifyContent = 'flex-end'

    let downloadContainer = document.querySelector(".picture-size");
    // console.log(downloadContainer)
    

    let ulList = `
            <ul>
                <li class="medium" class="medium-image">
                    <a download="${image.webformatURL}">
                        Web
                    </a>
                </li>
                <hr>
                <li class="large-image">
                    <a download='${image.largeImageURL}'>
                        Large
                    </a>
                </li>
                <hr>
                <li class="hd-image">
                    <a download='${image.fullHDURL}'>
                        HD
                    </a>
                </li>
            </ul>`

            // console.log(ulList)

    downloadContainer.innerHTML = ulList

    document.querySelector(".medium").addEventListener("click", () => {
        let imageEl = image.webformatURL   
        const fileName = getFileName(imageEl) 
        saveAs(imageEl, fileName)    
    })

    document.querySelector(".large-image").addEventListener("click", () => {
        let imageEl = image.largeImageURL   
        const fileName = getFileName(imageEl) 
        saveAs(imageEl, fileName)    
    })

    document.querySelector(".hd-image").addEventListener("click", () => {
        let imageEl = image.fullHDURL  
        const fileName = getFileName(imageEl) 
        saveAs(imageEl, fileName)    
    })

    const getFileName = (str) => {
        return str.substring(str.lastIndexOf("/") + 1)
    }   


    let userImage = image.fullHDURL
    let postUrl = encodeURI(document.location.href)
        
    let encodeImage = encodeURI(userImage)

    let shareContainer = document.querySelector(".social-share")

    console.log(shareContainer)

    let facebookButton = document.createElement("a");
    facebookButton.setAttribute("target", "_blank")
    facebookButton.setAttribute("href", ``)
    facebookButton.innerHTML = `<i class="fab fa-facebook"></i>`

    // console.log(facebookButton)
    let twitterButton = document.createElement("a");
    twitterButton.setAttribute("target", "_blank")
    twitterButton.setAttribute("href", `https://twitter.com/share?media=${encodeImage}`)
    twitterButton.innerHTML =  `<i class="fab fa-twitter"></i>`  

    let pinterestButton = document.createElement("a")
    pinterestButton.setAttribute("target", "_blank")
    pinterestButton.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${encodeImage}&url=${postUrl}&description=[post-title]`)
    pinterestButton.innerHTML =  `<i class="fab fa-pinterest"></i>`      

    // let instagramButton = document.createElement("a");
    // instagramButton.setAttribute("target", "_blank")
    // instagramButton.setAttribute("href", `https://www.linkedin.com/shareArticle?text=${encodeImage}`)
    // instagramButton.innerHTML =  `<i class="fab fa-instagram"></i>`      


    let whatsappButton = document.createElement("a");
    whatsappButton.setAttribute("target", "_blank")
    whatsappButton.setAttribute("href", `https://api.whatsapp.com/send?text=${encodeImage}`)
    whatsappButton.innerHTML =  `<i class="fab fa-whatsapp-square"></i>`      


    console.log(facebookButton)

    shareContainer.appendChild(facebookButton)
    shareContainer.appendChild(twitterButton)
    shareContainer.appendChild(pinterestButton)
    // shareContainer.appendChild(instagramButton)
    shareContainer.appendChild(whatsappButton) 


}



// User Settings and Images fetch


const settingsFetch =  () => {
    const settingUrl = `https://image-site-app.herokuapp.com/users/settings`;
    return fetch(settingUrl, {
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
}


const showUserImages = (img) => {
    console.log(img)

    const url = `https://image-site-app.herokuapp.com/`
    let container = document.querySelector(".individual_image_container");
    let imageElem = document.createElement('img');
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "image-elem");

    let userImage = url + img.image
    imageElem.src = userImage;
    imageElem.setAttribute("id", "image-source")

    let user = document.createElement("div");
    user.setAttribute("class", "user-attributes");

    let userName = document.createElement("p");
    userName.setAttribute("class", "user-name");
    // userName.value = img.username;

    let userTags = document.createElement("p");
    userTags.setAttribute("class", "user-tags");
    userTags.innerText = img.tags

    console.log(userTags)

    
    user.appendChild(userName);
    user.appendChild(userTags);
                    
    divEl.appendChild(user)

    divEl.appendChild(imageElem)
    container.appendChild(divEl);
    // console.log(container)

    
    /* Settings Fetch for Profile pic */


    let settings = settingsFetch();
    settings
    .then(pics => {
        console.log(pics)
        for (const pic of pics) {
            if(token === pic.user_id){
                document.getElementById("profile-image").style.backgroundImage = `url(${url}${pic.profileImage})` 
                document.querySelector(".profile_name").innerText = pic.username
                document.querySelector(".user-name").innerText = pic.username
            }
        }
        }
    )


    let downloadContainer = document.querySelector(".picture-size");
    // console.log(downloadContainer)

    let ulList = `
            <ul>
                <li class="my-image">
                    <a download="${img.image}">
                        Download Image
                    </a>
                </li>
            </ul>`

            // console.log(ulList)

    downloadContainer.innerHTML = ulList


    document.querySelector(".my-image").addEventListener("click", () => {
        let imageEl = url + img.image 
        const fileName = getFileName(imageEl) 
        saveAs(imageEl, fileName)    
    })

    const getFileName = (str) => {
        return str.substring(str.lastIndexOf("/") + 1)
    } 



    // let userImage = img.image
    let postUrl = encodeURI(document.location.href)
        
    let encodeImage = encodeURI(userImage)

    let shareContainer = document.querySelector(".social-share")

    console.log(shareContainer)

    let facebookButton = document.createElement("a");
    facebookButton.setAttribute("target", "_blank")
    facebookButton.setAttribute("href", ``)
    facebookButton.innerHTML = `<i class="fab fa-facebook"></i>`

    // console.log(facebookButton)
    let twitterButton = document.createElement("a");
    twitterButton.setAttribute("target", "_blank")
    twitterButton.setAttribute("href", `https://twitter.com/share?media=${encodeImage}`)
    twitterButton.innerHTML =  `<i class="fab fa-twitter"></i>`  

    let pinterestButton = document.createElement("a")
    pinterestButton.setAttribute("target", "_blank")
    pinterestButton.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${encodeImage}&url=${postUrl}&description=[post-title]`)
    pinterestButton.innerHTML =  `<i class="fab fa-pinterest"></i>`      

    // let instagramButton = document.createElement("a");
    // instagramButton.setAttribute("target", "_blank")
    // instagramButton.setAttribute("href", `https://www.linkedin.com/shareArticle?text=${encodeImage}`)
    // instagramButton.innerHTML =  `<i class="fab fa-instagram"></i>`      


    let whatsappButton = document.createElement("a");
    whatsappButton.setAttribute("target", "_blank")
    whatsappButton.setAttribute("href", `https://api.whatsapp.com/send?text=${encodeImage}`)
    whatsappButton.innerHTML =  `<i class="fab fa-whatsapp-square"></i>`      


    console.log(facebookButton)

    shareContainer.appendChild(facebookButton)
    shareContainer.appendChild(twitterButton)
    shareContainer.appendChild(pinterestButton)
    // shareContainer.appendChild(instagramButton)
    shareContainer.appendChild(whatsappButton)



    document.querySelector(".individual_delete").style.display = "block"
    document.querySelector(".individual_like").style.display = 'none'
    document.querySelector(".individual_favorite").style.display = 'none'
    document.querySelector(".image_button").style.justifyContent = 'flex-end'
    // document.querySelector(".image_button").style.backgroundColor = 'transparent'

}

// Deleting images 

const removeImage = () => {

    let token = localStorage.getItem("token")

    if(!token) {
        document.querySelector(".profile-navigate").style.display = "none"
        document.querySelector(".img-dwnld").style.display = "none"
        document.querySelector(".individual_share").style.display = "none"
        document.querySelector(".individual_favorite").style.margin = "0 80px 0 0"

    }else{
        document.querySelector(".login_request").style.display = "none"
    }
    

    let deleteButton = document.querySelector(".individual_delete")
    let previewButton = document.querySelector(".img-dwnld")

    
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    deleteButton.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    let No = document.querySelector(".no")

    No.onclick = () => {
        modal.style.display = "none"
    }

    let confirmDeleteButton = document.querySelector(".yes")

    confirmDeleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        const imageId = getPostIdParam()
        console.log("image id is: ", imageId)

        fetch(`https://image-site-app.herokuapp.com/users/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageId
            })
        })
        .then((res) => {
            return res.text()
            
        })
        .then((res) => {
            console.log(res)
            location.href = `/pages/myprofile.html`
        })
        .catch((err) => {
            console.log(err)
        })
    })

    
}




/*

social share links whatsapp
https://api.whatsapp.com/send?text=[post-title] [post-url]


social share links facebook
https://www.facebook.com/sharer.php?u=[post-url]


social share links twitter
https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]


social share links pinterest
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]


social share links linkedin
https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]


*/

// const ImageShare = (image, postUrl) => {
    

    
// }







// Images Search 

searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}