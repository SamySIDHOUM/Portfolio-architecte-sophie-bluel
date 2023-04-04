// Récupérer la modal
const modal = document.getElementById("myModal");

// Récupérer le bouton "modifier"
const editButton = document.querySelector(".modif-projet");

// Récupérer le span avec la classe "close" pour fermer la modal
const closeSpan = document.querySelector(".close");

// Récupérer l'élément DOM qui contiendra la galerie
const gallery = document.getElementById("gallery-modal");
// Récupérer modal content
const modalContent = document.querySelector(".modal-content");

// Récupération des projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    console.log("Galerie de photos :", data);
    for (let i = 0; i < data.length; i++) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let deleteIcon = document.createElement("i");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer";
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

      figcaption.appendChild(deleteIcon);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.classList.add("figure-modal-add");

      gallery.appendChild(figure);
      modalContent.appendChild(gallery); 
    }
  
  })
  .catch(error => console.error(error));

// Ajouter un événement "click" au bouton "modifier" 
editButton.addEventListener("click", function() {
  modal.style.display = "block";
  //modal.appendChild(gallery);
});

// Ajouter un événement "click" au span "close" pour fermer la modal
closeSpan.addEventListener("click", function() {
  modal.style.display = "none";
  //modal.removeChild(gallery);
});

// Ajouter un événement "click" en dehors de la modal pour fermer la modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    //modal.removeChild(gallery);
  }
});









