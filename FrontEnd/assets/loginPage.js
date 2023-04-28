const form = document.querySelector("#login-form");
const token = localStorage.getItem("token")
if (token) {
    window.location.href = "../FrontEnd/index.html"
}
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username)
    console.log(password)
    const body = JSON.stringify({
        email: username,
        password: password
    })
    console.log(body)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
},
        body: body
})
        .then(response => {
            alert("Connexion réussie");
            return response.json()

})
        .then(data => {
            console.log(data)
            localStorage.setItem("token", data.token)
            window.location.href = "../FrontEnd/index.html"
})
        .catch(error => {
            console.error("Error:", error);
            alert("Erreur dans l’identifiant ou le mot de passe");
});
});
