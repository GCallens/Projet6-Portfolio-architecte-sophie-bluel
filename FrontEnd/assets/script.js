// ETAPE 1 : CREATION DE LA PAGE DE PRESENTATION DES TRAVAUX //

// ETAPE 1.1 : RECUPERATION DES TRAVAUX DEPUIS LE BACK-END //

// Fonction pour recuperer les travaux provenant du back-end //

function fetchWorks(categoryId) {
    fetch('http://localhost:5678/api/works')
        .then((res) =>
        res.json()
    ).then(response => {
        let works = response
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
        createGallery(filteredWorks);
        createModalWorks(filteredWorks)
    })
}

fetchWorks(0);

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


// ETAPE 1.2 : REALISATION DU FILTRE DES TRAVAUX //

async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    let categories = await response.json();
    createMenu(categories);
}
fetchCategories().then(categories => console.log(categories));


// Fonction pour ajouter des filtres //
function createMenu(categories) {
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
contactButton.href = "#contact"
contactButton.innerHTML = "contact"
contactButton.classList.add("contactButton")
contactHeaderButton.appendChild(contactButton)


// ÉTAPE 2 : CODER LA PAGE DE CONNEXION //

// ETAPE 2.2 : AUTHENTIFICATION DE L'UTILISATEUR //

// BOUTON LOGIN/LOGOUT DYNAMIQUE //

const token = localStorage.getItem("token")

const connectionButton = document.querySelector(".connectionButton")

const editHeader = document.querySelector(".editHeader")

const editPhoto = document.querySelector(".editPhoto")

const editProject = document.querySelector(".editProject")

const filterNone = document.querySelector(".menu");

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

    // Edit Header //

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

    // Edit Photo //

    const editModePhoto = document.createElement("div")
    editModePhoto.classList.add("editModePhoto")
    editPhoto.appendChild(editModePhoto)

    const editIconePhoto = document.createElement("i")
    editIconePhoto.classList = "fa-sharp fa-regular fa-pen-to-square"
    editModePhoto.appendChild(editIconePhoto)

    const editModifier = document.createElement("button")
    editModifier.innerText = "modifier"
    editModifier.classList.add("editModifier")
    editModePhoto.appendChild(editModifier)

    // Edit Project //

    const editModeProject = document.createElement("div")
    editModeProject.classList.add("editModeProject")
    editProject.appendChild(editModeProject)

    const editIconeProject = document.createElement("i")
    editIconeProject.classList = "fa-sharp fa-regular fa-pen-to-square"
    editModeProject.appendChild(editIconeProject)

    const editModifierProject = document.createElement("button")
    editModifierProject.innerText = "modifier"
    editModifierProject.classList.add("editModifier")
    editModifierProject.setAttribute('id', 'buttonModifierModal')
    editModifierProject.setAttribute('href', '#modal1')
    editModifierProject.setAttribute('id', 'buttonModifierModal')
    editModifierProject.setAttribute('class', 'jsModal')
    editModeProject.appendChild(editModifierProject)

    // Remove Filter //

    filterNone.style.display = "none"

    // ******************* //

    // ETAPE 3 : AJOUTER LA MODALE //

    // ETAPE 3.1 : AJOUT DE LA FENETRE MODALE //

    // OUVRIR LA MODALE 1 //
    const openModal = function (e) {
        e.preventDefault();
        modal = document.getElementById("allModal");
        modal.style.display = "flex"
        modal.addEventListener("click", closeModal);
        modal.querySelector(".closeModalIcon").addEventListener("click", closeModal);
        modal.querySelector(".modal").addEventListener("click", stopPropagation);
    };

    // FERMER LA MODALE 1 //
    const closeModal = function (e) {
        e.preventDefault();
        modal.style.display = "none";
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".closeModalIcon").removeEventListener("click", closeModal);
        modal.querySelector(".modal").removeEventListener("click", stopPropagation);
        resetImage();
        changeModal(false)
    };

    // Stopper la propagation //

    const stopPropagation = function (e) {
        e.stopPropagation()
    }

    document.querySelectorAll('.jsModal').forEach(a => {
        a.addEventListener('click', openModal)
    })

    window.addEventListener('keydown', function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }
    })

    // AFFICHER LES PROJETS DANS LA MODALE //
    function createModalWorks (works) {
        for (let i = 0; i < works.length; i++) {
            let figureElement = document.createElement("figure");
            let imageElement = document.createElement("img");
            imageElement.src = works[i].imageUrl;
            imageElement.id = works[i].id;
            // icone //
            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash", "iconModal", "trash");
            trashIcon.addEventListener("click", () => removeProject(works[i].id))
            const moveArrowIcon = document.createElement("i");
            moveArrowIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "iconModal", "arrow");
            let figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = "éditer";
            // Mettre les éléments dans le HTML //
            document.querySelector(".modalGallery").appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            figureElement.appendChild(trashIcon);
            figureElement.appendChild(moveArrowIcon);
        }
    }

    // SWITCH SUR LA MODALE 2 //

    const addButtonPhoto = document.getElementById("addButton");
    addButtonPhoto.addEventListener("click", function () {
        changeModal(true);
    });

    const backArrowModal = document.querySelector(".arrowBack");
    backArrowModal.addEventListener("click", function() {
        changeModal(false);
        resetImage();
    });

    function changeModal(view) {
        const modal1 = document.getElementById("modal1");
        const modal2 = document.getElementById("modal2");
        if (view) {
            modal2.style.display = "flex";
            modal1.style.display = "none";
            backArrowModal.style.visibility = "visible";
        } else {
            modal2.style.display = "none";
            modal1.style.display = "flex";
            backArrowModal.style.visibility = "hidden";
        }
    }

    // AJOUTER UNE IMAGE DANS LA MODALE 2 //

    const addNewImage = document.getElementById("searchButton");
    const addImageOverview = document.getElementById("imageOverview");
    const addCategoryImage = document.getElementById("category");
    const addTitleImage = document.getElementById("imageTitle");
    const validationButton = document.getElementById("validateButton");

    // Selectionner l'image //
    addNewImage.addEventListener("change", function () {
        const selectFile = addNewImage.files[0];
        if (selectFile) {
            const imgUrl = URL.createObjectURL(selectFile);
            const img = document.createElement("img");
            img.src = imgUrl;
            addImageOverview.innerHTML = "";
            addImageOverview.appendChild(img);

            // Supprime les autres éléments pour garder que l'image //
            const sendPhotoModal = document.getElementsByClassName("sendPhoto");
            Array.from(sendPhotoModal).forEach(e => {e.style.display = "none"});
            updateValidButtonColor();
        }
    })

    // CHANGEMENT DE COULEUR DU BOUTON VALIDER //
    function updateValidButtonColor() {
        if(addTitleImage.value !== "" && addImageOverview.firstChild) {
            validationButton.style.backgroundColor = "#1D6154";
        }else{
            validationButton.style.backgroundColor = "#A7A7A7";
        }
    }
    addTitleImage.addEventListener("input", updateValidButtonColor)

    // RÉINITIALISER L'ENVOI D'IMAGE QUAND ON QUITTE LA MODALE //
    function resetImage() {
        addTitleImage.value = "";
        const sendPhoto = document.getElementsByClassName("sendPhoto");
        const img = addImageOverview.querySelector("img");
        Array.from(sendPhoto).forEach(e => {e.style.display = "block"});
        if(img) {addImageOverview.removeChild(img)}
        const addImageError = document.getElementById("errorImage");
        addImageError.style.display = "none";
    }

    validationButton.addEventListener("click", (e) => {
        e.preventDefault();
        const addImageError = document.getElementById("errorImage");
        addImageError.style.display = "flex";
        addImageError.style.color = "red";

        // Si le champ du titre est vide //
        if (addTitleImage.value === "") {
            addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Titre manquant`;
            return;
        }

        // Si le champ image est vide //
        if (!addImageOverview.firstChild) {
            addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Image manquante`;
            return;
        }

        // Si la taille de l'image est autorisée à 4mo //
        const maximumSize = 4 * 1024 * 1024;
        const selectFile = addNewImage.files[0];
        if (selectFile.size > maximumSize) {
            addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Taille image supérieur à 4Mo`;
            return;
        }
        updateValidButtonColor();



        // ETAPE 3.3 : ENVOI D'UN NOUVEAU PROJET AU BACK-END VIA LE FORMULAIRE DE LA MODALE //
        // FormData pour envoyer les données de la nouvelle image //

        const formData = new FormData();
        formData.append("image", addNewImage.files[0]);
        formData.append("title", addTitleImage.value);
        formData.append("category", addCategoryImage.value);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur de la requête");
                }
            })
            .then(() => {
                const addImageSuccess = document.getElementById("errorImage");
                addImageSuccess.innerHTML = `<i class="fa-solid fa-circle-check"></i> Image ajoutée avec succès !`;
                addImageSuccess.style.color = "green";
                dynamicWorks()
            })
            .catch(error => {
                console.error("Erreur", error);
                addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Erreur lors de l'ajout de l'image`;
            })
    });

    // ETAPE 3.4 : TRAITEMENT DE LA RÉPONSE DE L'API POUR AFFICHER DYNAMIQUEMENT LA NOUVELLE IMAGE DE LA MODALE //
    // Afficher dynamiquement la nouvelle image //

    function dynamicWorks() {
        fetch("http://localhost:5678/api/works")
            .then((response) => {
                if(response.ok) {
                    document.querySelector(".gallery").innerHTML = "";
                    document.querySelector(".modalGallery").innerHTML = "";
                    fetchWorks(0);
                }
            })
    }


    // ETAPE 3.2 : SUPPRESSION DE TRAVAUX EXISTANTS //

    function removeProject(id) {
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    dynamicWorks();
                } else {
                    alert("Erreur lors de la suppression de l'image");
                }
            })
    }


    // ******************** //

} else {

    // LOGIN BUTTON //

    const loginButton = document.createElement("a")
    loginButton.href = "loginPage.html"
    loginButton.innerHTML = "login"
    loginButton.classList.add("connectionButton")
    connectionButton.appendChild(loginButton)
}

// ************** //
