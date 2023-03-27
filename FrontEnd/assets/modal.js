// Création de la fenêtre modale
const modal = document.createElement("div");
modal.classList.add("modal");

// Création du contenu de la fenêtre modale
const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");

// Ajout d'un bouton pour fermer la fenêtre modale
const closeButton = document.createElement("button");
closeButton.textContent = "X";
closeButton.classList.add("close-button");
modalContent.appendChild(closeButton);

// Ajout du contenu dans la fenêtre modale
const modalText = document.createElement("p");
modalText.textContent = "Galerie photo";
modalContent.appendChild(modalText);

modal.appendChild(modalContent);

// Affichage de la fenêtre modale
document.body.appendChild(modal);
console.log(modal);

// Fonction pour ouvrir la fenêtre modale
function openModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
  modal.style.display = "none";
}

// Détection du clic sur le bouton de fermeture
closeButton.addEventListener("click", closeModal);

// Détection du clic en dehors de la fenêtre modale pour la fermer
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Ajout d'un écouteur d'événement au clic sur .modif-projet
const modifProjet = document.querySelector(".modif-projet");
modifProjet.addEventListener("click", openModal);

  

