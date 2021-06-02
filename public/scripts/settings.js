window.onload = () => {
    removingLogin();
    searchImages();
    dropDown();
    userSettingFetch();
    postSettingsData();
    userDetailsFetch()
    showUserDetails();
    settingsModal();
    changePassword();
    deleteUserModal();
    deleteUserAccount()
}

searchImages = () => {
    searchParameters("#register_option", "search_submit", "#register_Search")
}

const postSettingsData = () => {
    let url = `https://image-site-app.herokuapp.com/users/settings`
    let form = document.getElementById("reg-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let profileImage = document.querySelector("#profile-image");
        let coverImage = document.querySelector("#cover-image");

        let formData = new FormData()


        let user_id = window.localStorage.getItem("token")
        let username = document.getElementById("user_heading").value;
        let city = document.getElementById("city_name").value;
        let country = document.getElementById("country_name").value;
        console.log(profileImage.files)

        

        formData.append("user_id", user_id); 
        formData.append("username", username);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("coverImage", coverImage.files[0])
        formData.append("profileImage", profileImage.files[0]);

        let settings = userSettingsFetch()
        settings.then((res) => {
            console.log(res)

            
            if(profileImage.files[0]){
                formData.append("profileImage", profileImage.files[0]);
                console.log(profileImage.value)
                // return formData
            }else{
                if(!profileImage.files[0] && coverImage.files[0]){
                    alert("Please upload Profile Image ")
                }                
            }

            if(coverImage.files[0]){
                formData.append("coverImage", coverImage.files[0]);
                console.log(coverImage.value)
                // return formData
            }else{
                if(!coverImage.files[0] && profileImage.files[0]){
                    alert("Please upload Cover Image")
                }
            }           
       
        })

        
        console.log(formData)


        fetch(`${url}`, {
            method: "POST",
            body: formData
        })
        .then((res) => {
            console.log(res)
            window.location.href = `/pages/myprofile.html`
        })
        .catch((err) => {
            console.log(err)
        })
    })
}



const userDetailsFetch = () => {
    let userDetailsURL = `https://image-site-app.herokuapp.com/users` 
    

    return fetch(userDetailsURL,{
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })

}

const userSettingsFetch = () => {
    let userSettingsURL = `https://image-site-app.herokuapp.com/users/settings`

    return fetch(userSettingsURL,{
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
}

const showUserDetails = () => {
    let userCredentials = userDetailsFetch()

    let token = window.localStorage.getItem("token")
    userCredentials.then((details) => {
        // console.log(details)
        for (const detail of details) {
            if(detail._id === token){
                document.querySelector(".current_email").innerText = detail.email
                
            }
        }

    })



    let URl = `https://image-site-app.herokuapp.com/`
    let userSettings = userSettingsFetch();

    userSettings.then((settings) => {
        for (const setting of settings) {
            console.log(setting)
            if(setting.user_id === token){
                document.querySelector("#user_heading").value = setting.username
                document.querySelector("#city_name").value = setting.city
                document.querySelector("#country_name").value = setting.country
                document.querySelector(".profile_image_box").style.backgroundImage = `url("${URl}${setting.profileImage}")`

            }
        }
    })
}

const settingsModal = () => {
    let passwordButton = document.querySelector("#set-password")
    let previewButton = document.querySelector(".img-dwnld")
    
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks the button, open the modal 
    passwordButton.onclick = function() {
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
}


const changePassword = () => {
    const form = document.querySelector(".password-modal");

    form.addEventListener("submit", () => {
        // e.preventDefault();   

        let token = window.localStorage.getItem("token")       
        
        let password = document.querySelector("#new-password").value
        let newpassword = document.querySelector("#reenter-password").value
        var modal = document.getElementById("myModal");
        let submitBtn = document.querySelector("#password-submit");

        if(password === newpassword){
            console.log("password matched")
            let userURL = `https://image-site-app.herokuapp.com/users/password`

            fetch(`${userURL}/${token}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                        password
                    })
            })
            .then((res) => {
                return res.text()
            })
            .then((res) => {
                if(res){
                    modal.style.display = "none"                    
                }
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            }) 

        }else{
            alert("Please Enter the Same Password")
        } 

    })
    
}

const deleteUserModal = () => {
    const deleteButton = document.querySelector("#del-account")
    console.log(deleteButton)


    var modal = document.getElementById("del-myModal");
    let No = document.querySelector(".no")

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("del-close")[0];
    
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

    No.onclick = () => {
        modal.style.display = "none"
    }

}

const deleteUserAccount = () => {

    let token = window.localStorage.getItem("token")
    let deleteButton = document.querySelector(".yes")


    deleteButton.addEventListener("click", () => {
        let userURl = `https://image-site-app.herokuapp.com/users/register`

        fetch(`${userURl}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if(res){
                localStorage.removeItem("token")
                location.href ="/pages/register.html"
            }
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
}




