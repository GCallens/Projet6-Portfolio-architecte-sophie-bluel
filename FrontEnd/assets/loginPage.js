const form = document.querySelector("#login-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
},
    body: JSON.stringify({
    username: username,
    password: password
})
})
    .then(response => {
    if (response.ok) {
    alert("Connexion réussie");

} else {
    alert("Erreur dans l’identifiant ou le mot de passe");
}
})
    .catch(error => {
    console.error("Error:", error);
    alert("Erreur dans l’identifiant ou le mot de passe");
});
});
