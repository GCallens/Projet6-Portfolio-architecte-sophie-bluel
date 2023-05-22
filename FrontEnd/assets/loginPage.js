const token = localStorage.getItem("token")
if (token) {
    window.location.href = "../FrontEnd/index.html"
}

const form = document.querySelector("#login-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const body = JSON.stringify({
        email: username,
        password: password
    })
    console.log(body)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    }).then(response => response.json().then(r => ({status: response.status, body: r})))
        .then(data => {
            console.log(data.status); // Vérification du code serveur
            if (data.status === 200) {
                localStorage.setItem("token", data.body.token)
                console.log(data.body.token);
                window.location.replace("./index.html");
            } if (data.status === 401) {
                alert("Erreur dans l’identifiant ou le mot de passe");
            } if (data.status === 404) {
                alert("Utilisateur inconnu, vérifiez l'identifiant")
            }
        });
});

// ****************** //

// Lien des Boutons Projet et Contact //

// Bouton projets //

const projectHeaderButton = document.querySelector(".projectButton")

const projectButton = document.createElement("a")
projectButton.href = "index.html"
projectButton.innerHTML = "projets"
projectButton.classList.add("projectButton")
projectHeaderButton.appendChild(projectButton)

// Bouton Contact //

const contactHeaderButton = document.querySelector(".contactButton")

const contactButton = document.createElement("a")
contactButton.href = "index.html"
contactButton.innerHTML = "contact"
contactButton.classList.add("contactButton")
contactHeaderButton.appendChild(contactButton)
