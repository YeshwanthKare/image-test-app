window.onload = () => {
    removingLogin();
    dropDown();
    imageFetch();
    searchImages();
    userSettingFetch()
}

const dropDown = () => {

    dropDownButtons (".explore-btn", ".explore_dropdown")
    dropDownButtons (".menu-bar", ".explore_dropdown")
    
    
}

const dropDownButtons = (button_selector, dropdown_selector) => {
    let button = document.querySelector(button_selector);
    let dropdown = document.querySelector(dropdown_selector);

    button.addEventListener("click", () => {
        if(dropdown.style.display === ""){
            dropdown.style.display = "block";
        }else {
            dropdown.style.display = "";
        }
    })

    button.addEventListener("focusout", () => {
        setTimeout(() => {
            dropdown.style.display = "";
        },100)
    })
}

function imageFetch() {
    let key = config.MY_KEY;
    return fetch(`https://pixabay.com/api/?key=${key}&image_type=all`)
    // &q=all&image_type=all
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) =>{
        showImage(data.hits);
        console.log(data.hits)
    })
}

const individualImageFetch = (e) => {
    let id = e.target.getAttribute("data-id");
    window.location.href = `../pages/individual-image.html?id=${id}`
    console.log(id);
}

const showImage = (images) => {
    wrapperSelector(images, ".wrapper");
    
}


const wrapperSelector = (images, wrapper_selector) => {
    var imageEl = document.querySelector(wrapper_selector);
    for(let image of images){

        let imageElement = document.createElement("div");
        imageElement.classList.add("image");

        let img = document.createElement("img");
        img.src = image.webformatURL;
        img.setAttribute("data-id", image.id);

        img.addEventListener("click", (e) => {
            individualImageFetch(e);
            
            
        })

        let authorContainer = document.createElement("div");
        authorContainer.classList.add("author_container");

        let author = document.createElement("div");
        author.classList.add("author");
        author.innerHTML = image.user;

        let votes = document.createElement("div");
        votes.classList.add("votes");

        let comments = document.createElement("div");
        comments.classList.add("comment");
        comments.innerHTML = `
           <span id="comment">${image.comments} <a href="#"><i class="far fa-comment"></i></a></span>
        `

        let like = document.createElement("div");
        like.classList.add("like");
        like.innerHTML = `
           <span id="like"> ${image.likes} <a href="#"><i class="far fa-heart"></i></a></span>
        `

        let favorites = document.createElement("div");
        favorites.classList.add("favourite");
        favorites.innerHTML = `
            <span id="favourite">${image.favorites} <a href="#"><i class="far fa-star"></i></a></span>
        `

        votes.appendChild(comments);
        votes.appendChild(like);
        votes.appendChild(favorites);

        authorContainer.appendChild(author)
        authorContainer.appendChild(votes);

        imageElement.appendChild(img);
        imageElement.appendChild(authorContainer);

        imageEl.appendChild(imageElement)

    }
}


searchImages = () => {
    searchParameters("#option", "search_submit", "#Search")
}

const searchParameters = (select_form, button_search, input_id) => {
    let selectType = document.querySelector(select_form);
    let button = document.getElementById(button_search);

    button.addEventListener("click", (e) => {
        e.preventDefault();
        let query = document.querySelector(input_id).value;
        console.log(query);
        console.log(selectType.value);
        if(selectType.value == 'image'){
            window.location.href = `../pages/search.html?q=${query}&type=${selectType.value}`;
        }else if(selectType.value == 'photo'){
            window.location.href = `../pages/search.html?q=${query}&type=${selectType.value}`;
        }else if(selectType.value == 'vector'){
            window.location.href = `../pages/search.html?q=${query}&type=${selectType.value}`;
        }else if(selectType.value == 'illustration'){
            window.location.href = `../pages/search.html?q=${query}&type=${selectType.value}`;
        }else {
            console.log("match not found")
        }
    })
    
}

function removingLogin(){
    const token = localStorage.getItem("token");
    if(token){
        document.getElementById("login").style.display = "none"
        document.querySelector(".join").style.display = "none"
        document.querySelector(".hr-line").style.display = "none"
        document.querySelector(".explore_dropdown").style.right = '220px';
        document.querySelector(".user_profile_dropdown").style.left = "-150px"
        document.querySelector(".sign-up").style.display = "none";
    }else{
        document.querySelector(".user_profile_pic").style.display = "none"
    }

}

// let user


function userSettingFetch() {
    // let key = config.MY_KEY;
    return fetch(`https://image-site-app.herokuapp.com/users/settings/`)
    // &q=all&image_type=all
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) =>{
        userProfileImage(data);
        // console.log(data.hits)
    })
}


let token  = window.localStorage.getItem("token")

// console.log(token)



const userProfileImage = (data) => {
    // console.log(data)
    for (const img of data) {
        let userName = img.username;
        console.log(userName)
        let userProfileImage = `https://image-site-app.herokuapp.com/${img.profileImage}`         
        if(token === img.user_id){
            document.querySelector(".user_profile_pic").style.backgroundImage = `url(${userProfileImage})`
        }        
    }
} 



   
