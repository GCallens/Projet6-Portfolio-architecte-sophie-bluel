// ETAPE 1 : CREATION DE LA PAGE DE PRESENTATION DES TRAVAUX //

// ETAPE 1.1 : RECUPERATION DES TRAVAUX DEPUIS LE BACK-END //

// Fonction pour recuperer les travaux provenant du back-end //

async function fetchWorks(categoryId) {
    console.log("**********************")
    console.log(categoryId)
    console.log("**********************")
    const response = await fetch('http://localhost:5678/api/works');
    let works = await response.json();
    let filteredWorks = []
    if (parseInt(categoryId) === 0) {
        filteredWorks = works
    } else {
        for (let i = 0; i < works.length; i++) {
            if (works [i].categoryId === parseInt(categoryId)) {
                filteredWorks.push(works [i])
            }
        }
    }
    console.log(filteredWorks)
    createGallery(filteredWorks);
}
// Fonction pour ajouter dans la galerie les travaux recuperes //
function createGallery(works) {
    // Creation de la galerie //
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = "";
    // Creation des nouveaux elements //
    for (let i = 0; i < works.length; i++) {
        let figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        let figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = works[i].title;
        // Affichage des elements dans la galerie //
        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}

fetchWorks(0);



// ETAPE 1.2 : REALISATION DU FILTRE DES TRAVAUX //



async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    let categories = await response.json();
    createMenu(categories);
}
fetchCategories().then(categories => console.log(categories));


/*
const selectCategory = () => {
    buttonAll.classList.add("active");
    document.querySelector(".gallery").innerText = "";
    fetchWorks().then(works => console.log(works));
    document.querySelectorAll("button").forEach(function (btn) {
        btn.classList.remove("active");
        buttonAll.classList.add("active");
    });
}
*/

// Fonction pour ajouter des filtres //
function createMenu(categories, works) {
    // Creation du menu
     const menu = document.querySelector('.menu');

    // Creation du bouton "Tous" //

    let buttonAll = document.createElement("button");
    buttonAll.innerHTML = "Tous";
    buttonAll.classList.add("filtre");
    buttonAll.classList.add("active")
    menu.appendChild(buttonAll);

    buttonAll.addEventListener("click", function (e) {
        console.log(e.target.value)
        buttonAll.classList.add("active");
        document.querySelector(".gallery").innerText = "";

        document.querySelectorAll("button").forEach(function (btn) {
            btn.classList.remove("active");
            buttonAll.classList.add("active");
        });

        fetchWorks(0)

    });


    // Creation des boutons //

    for (let i = 0; i < categories.length; i++) {
        let buttonElement = document.createElement("button");
        buttonElement.innerText = categories[i].name;
        buttonElement.classList.add("filtre");
        buttonElement.value = categories[i].id
        menu.appendChild(buttonElement);

        buttonElement.addEventListener("click", function (e) {
            console.log(e.target.value)
            buttonElement.classList.add("active");
            document.querySelector(".gallery").innerText = "";

            document.querySelectorAll("button").forEach(function (btn) {
                btn.classList.remove("active");
                buttonElement.classList.add("active");
            });

            fetchWorks(e.target.value)

        });
    }
}


        // Affichage des boutons filtres dans le menu //





// ÉTAPE 2 : CODER LA PAGE DE CONNEXION //

// ETAPE 2.2 : AUTHENTIFICATION DE L'UTILISATEUR //

// BOUTON LOGIN/LOGOUT DYNAMIQUE //

const token = localStorage.getItem("token")

const connectionButton = document.querySelector(".connectionButton")

const editHeader = document.querySelector(".editHeader")

if (token) {

    // LOGOUT BUTTON //

    const logoutButton = document.createElement("a")
    logoutButton.href = "index.html"
    logoutButton.innerHTML = "logout"
    logoutButton.classList.add("connectionButton")
    const logout = () => {
        localStorage.removeItem("token")
    }
    logoutButton.addEventListener("click", logout);
    connectionButton.appendChild(logoutButton)

    // MODE EDITION DE L'UTILISATEUR //

    const editMode = document.createElement("div")
    editMode.classList.add("edit")
    editHeader.appendChild(editMode)

    const editContent = document.createElement("div")
    editContent.classList.add("editContent")
    editMode.appendChild(editContent)

    const editIcone = document.createElement("i")
    editIcone.classList = "fa-sharp iconeWhiteHeader fa-regular fa-pen-to-square"
    editContent.appendChild(editIcone)

    const editModeEdition = document.createElement("p")
    editModeEdition.innerHTML = "Mode édition"
    editModeEdition.classList.add("editModeEdition")
    editContent.appendChild(editModeEdition)

    const editPublishChange = document.createElement("button")
    editPublishChange.innerText = "publier les changements"
    editPublishChange.classList.add("editPublishChange")
    editContent.appendChild(editPublishChange)


} else {

    // LOGIN BUTTON //

    const loginButton = document.createElement("a")
    loginButton.href = "loginPage.html"
    loginButton.innerHTML = "login"
    loginButton.classList.add("connectionButton")
    connectionButton.appendChild(loginButton)
}

// ************** //
