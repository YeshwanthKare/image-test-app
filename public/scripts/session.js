function checkIfLoggedIn() {
    const currentToken = localStorage.getItem("token")
    if(typeof currentToken !== "undefined"){
        if(location.href.includes("/pages/login.html") || location.href.includes("/pages/register.html")){
            location.href != "/pages/login.html";
        }
    }else{
        if(!location.href.includes("/pages/login.html") && !location.href.includes("/pages/register.html") && 
        !location.href.includes("/index.html") && !location.href.includes("/pages/photos.html") &&
        !location.href.includes("/pages/vectors.html") && !location.href.includes("/pages/illustration.html")  &&
        !location.href.includes("/pages/individual-image.html")){
            location.href = "/pages/login.html";
        }
    } 

}

checkIfLoggedIn();



function logOut() {
    location.href = "/pages/login.html";
    // location.href = "/";
    localStorage.removeItem("token");
}


