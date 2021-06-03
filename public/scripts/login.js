window.onload = () => {
    searchImages();
    dropDown();
}

searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}

let loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", userLogin)


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get("existingEmail");
const registered = urlParams.get("registered");
const alreadyRegistered = urlParams.get("user");

if(registered){
    loginForm.email.value = existingEmail;
    alert("Successfully Registered");
}

if(alreadyRegistered){
    loginForm.email.value = existingEmail;
    alert("Already Registered");
}



let url = `https://image-gram-test.herokuapp.com/`

function userLogin(e){
    e.preventDefault();

    let payload = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }

    fetch(`${url}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.token)

        if(res.status === 'valid'){
            location.href = `/index.html`
        }else{
            alert("Email or Password Not Valid.")
        }
    })
        
}

let form = document.querySelector(".login-sub");

form.addEventListener("click", (e) => {
    e.preventDefault()                
    let button = document.querySelector(".register_facebook");

    button.addEventListener("click", (e) => {
        e.preventDefault()
    })
})

