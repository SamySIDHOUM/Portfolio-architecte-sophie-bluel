// Récupérer la modal
const modal = document.getElementById("myModal");

// Récupérer le bouton "modifier"
const editButton = document.querySelector(".modif-projet");

// Récupérer le span avec la classe "close" pour fermer la modal
const closeSpan = document.querySelector(".close");

// Récupérer l'élément DOM qui contiendra la galerie
const gallery = document.createElement("div");
gallery.className = "gallery-modal";

// Récupération des projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    console.log("Galerie de photos :", data);
    for (let i = 0; i < data.length; i++) {
      let figure = document.createElement("figure");
      let imgContainer = document.createElement("div");
      let img = document.createElement("img");
      let deleteIcon = document.createElement("i");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer";
      deleteIcon.className = "fa-solid fa-trash-can";
      imgContainer.className = "image-container";

      imgContainer.appendChild(deleteIcon);
      imgContainer.appendChild(img);
      figure.appendChild(imgContainer);
      figure.appendChild(figcaption);
      figure.className = data[i].category.name.replaceAll(' ', '-');

      gallery.appendChild(figure);
      //modalContent.appendChild(gallery); 
    }
    console.log("Icônes supprimer :", document.querySelectorAll(".fa-solid fa-trash-can"));
    modalContent.insertBefore(gallery, buttonContainer);
    //modalContent.insertAdjacentElement("afterend", buttonContainer);
  })
  .catch(error => console.error(error));

// Ajouter un événement "click" au bouton "modifier" 
editButton.addEventListener("click", function() {
  modal.style.display = "block";
  modal.appendChild(gallery);
});

// Ajouter un événement "click" au span "close" pour fermer la modal
closeSpan.addEventListener("click", function() {
  modal.style.display = "none";
  modal.removeChild(gallery);
});

// Ajouter un événement "click" en dehors de la modal pour fermer la modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.removeChild(gallery);
  }
});
/*// Fermer la modal avec Escape
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
  }
  console.log("keydown");
});*/
// Récupérer modal content
const modalContent = document.querySelector(".modal-content");

// Création d'un élément div parent avec la classe flexColumn
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("flex-column");

// Création d'un bouton pour ajouter une photo à la galerie
const addButton = document.createElement("button");
addButton.textContent = "Ajouter une photo";
addButton.classList.add("add-bts");
    ///TODO le code pour ajouter///

// Création d'un élément pour supprimer la galerie
const deleteGallery = document.createElement("a");
deleteGallery.textContent = "Supprimer la galerie";
deleteGallery.classList.add("delete-gal");
    ///TODO le code pour supprimer///

// Ajout des boutons à l'élément div parent
buttonContainer.appendChild(addButton);
buttonContainer.appendChild(deleteGallery);

// Ajout de l'élément div parent à la fenêtre modale
modalContent.appendChild(buttonContainer);

modal.appendChild(modalContent);
//modalContent.appendChild(gallery);





