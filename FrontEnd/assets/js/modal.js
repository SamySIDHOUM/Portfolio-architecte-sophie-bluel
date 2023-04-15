// Récupérer la modal
const modal = document.getElementById("myModal");

// Récupérer le bouton "modifier"
const editButton = document.querySelector(".modif-projet");

// Récupérer le span avec la classe "close" pour fermer la modal
const closeSpan = document.querySelector(".close");

// Récupérer l'élément DOM qui contiendra la galerie
const gallery = document.querySelector("#gallery-modal");
// Récupérer modal content
const modalContent = document.querySelector(".modal-content");

// Récupération des projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    for (let i = 0;i < data.length; i++) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let deleteIcon = document.createElement("i");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer";
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
      deleteIcon.setAttribute("data-id",data[i].id);

      figcaption.appendChild(deleteIcon);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.classList.add("figure-modal-add");
     
      gallery.appendChild(figure);
    }
  
  })
  .catch(error => console.error(error));

// Ajouter un événement "click" au bouton "modifier" 
editButton.addEventListener("click", function() {
  modal.style.display = "block";
});

// Ajouter un événement "click" au span "close" pour fermer la modal
closeSpan.addEventListener("click", function() {
  modal.style.display = "none";
  });

// Ajouter un événement "click" en dehors de la modal pour fermer la modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Ajouter un événement "keydown" pour détecter l'appui sur la touche "Esc"
window.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

// Récupérer le bouton "add-bts"
const addButton = document.querySelector(".add-bts");

// Récupérer la modal-addwork
const modalAddwork = document.querySelector(".modal-addwork");

// Ajouter un événement "click" au bouton "add-bts"
addButton.addEventListener("click", function() {
  modalAddwork.style.display = "block";
  modalContent.style.display = "none";
});

// Récupérer la flèche retour
const backArrow = document.querySelector(".fa-solid.fa-arrow-left");

// Ajouter un événement "click" à la flèche retour
backArrow.addEventListener("click", function() {
  // Masquer la modal-addwork
  modalAddwork.style.display = "none";
  // Afficher la modal-content
  modalContent.style.display = "block";
});

// Récupérer la croix de fermeture de la modal
const closeIcons = document.querySelectorAll(".close");

// Ajouter un événement "click" à chaque croix de fermeture
closeIcons.forEach(icon => {
  icon.addEventListener("click", function() {
    // Masquer la modal
    modal.style.display = "none";
    // Réinitialiser les champs du formulaire
    document.getElementById("form-addwork").reset();
  });
});

// Récupérer la liste déroulante
const categorySelect = document.getElementById("category-option");

// Récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(data => {
    // Parcourir les catégories et créer une option pour chaque catégorie
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.value = data[i].id;
      option.text = data[i].name;
      categorySelect.appendChild(option);
    }
  })
  .catch(error => console.error(error));

 // Récupérer le formulaire et le bouton submit
const form = document.getElementById("form-addwork");
const submitButton = document.getElementById("submit-work");
const imgButton = document.getElementById("add-imgbutton");

// Récupérer les éléments du formulaire
const titleInput = document.getElementById("title-img");

//Ecouter le clic sur le bouton Ajouter photo
imgButton.addEventListener("change", function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", function() {
    const imageUrl = reader.result;
    const imgPreview = document.createElement("img");
    imgPreview.src = imageUrl;
    imgPreview.classList.add("img-preview");

    // Masquer les autres éléments et afficher l'image
    imgPreview.style.display = "block";
    imgButton.style.display = "none";
    document.getElementById("input-container").style.display = "none";
    document.querySelector("#img-container p").style.display = "none";
    document.getElementById("img-container").appendChild(imgPreview);
  });
  reader.readAsDataURL(file);
});

// Fonction pour créer les éléments à ajouter dans le DOM
function createGalleryItem(title, imageUrl) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  const deleteIcon = document.createElement("i");

  // Définir les attributs des éléments créés
  img.src = imageUrl;
  img.alt = title;
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
  figcaption.textContent = "éditer";

  // Ajouter les éléments créés au DOM
  figcaption.appendChild(deleteIcon);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.classList.add("figure-modal-add");
  gallery.appendChild(figure);
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page
  // Récupérer les valeurs du formulaire
  const title = titleInput.value;
  const category = categorySelect.value;
  const imageUrl = document.querySelector("#img-container img").src;

  // Vérifier si les champs sont remplis
  if (title === "" || category === "" || imageUrl === "") {
    //alert("Veuillez remplir tous les champs");
    let messageErrorInput = document.createElement("span");
        messageErrorInput.innerText = "Veuillez remplir tous les champs";
        messageErrorInput.style.color = "red";
        messageErrorInput.id ="messageErrorInput";
         // Ajout du message d'erreur au formulaire
        form.appendChild(messageErrorInput);
    return;
    
  }
  
  // Ajouter la classe "active" au bouton "submitButton"
  submitButton.classList.add(".active");
  console.log(submitButton);

  // Récupérer le token depuis la sessionStorage
  const token = sessionStorage.getItem("token");
  console.log(token)

  // Créer les données à envoyer à l'API
  const formData = new FormData();
  formData.append("image", imgButton.files[0]);
  formData.append("title", title);
  formData.append("category", categorySelect.value);

  // Effectuer la requête pour envoyer l'image à l'API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "accept": "*/*",
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi de l'image");
    }
    return response.json();
  })
  .then(data => {
    // Créer les éléments à ajouter dans le DOM
    createGalleryItem(title, data.imageUrl);

    // Réinitialiser le formulaire
    form.reset();
    // Masquer la modal-addwork
    modalAddwork.style.display = "none";
    // Afficher la modal-content
    modalContent.style.display = "block";
    // Masquer la modal
    modal.style.display = "none";

    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
});

// Ajouter un écouteur d'événements sur le clic de l'icône de suppression
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-icon")) {
    // Récupérer l'ID du travail à supprimer
    const figure = event.target.closest(".figure-modal-add");
    const workId = figure.dataset.id;

    // Envoyer une demande DELETE à l'API pour supprimer le travail
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du travail");
      }
      // Supprimer l'élément du DOM
      if (figure) {
        figure.remove();
      }

      // Supprimer l'élément correspondant du DOM principal
      const galleryItems = document.querySelectorAll(".gallery figure");
      galleryItems.forEach(item => {
        if (item.dataset.id === workId) {
          item.remove();
        }
        //cacher la modal
        document.querySelector(".modal").style.display = 'none';
      });

      // Afficher un message de confirmation
      const messageSpan = document.createElement("span");
      messageSpan.classList.add("delete-message");
      messageSpan.textContent = "Le travail a été supprimé avec succès.";
      document.body.appendChild(messageSpan);
      console.log(messageSpan);

      setTimeout(function() {
        messageSpan.remove();
      }, 3000);
    })
    .catch(error => {
      console.error(error);
    });
  }
});

