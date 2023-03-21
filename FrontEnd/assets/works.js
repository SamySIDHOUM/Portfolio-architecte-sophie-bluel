// Sélectionner l'élément DOM qui contiendra la galerie
  const gallery = document.querySelector(".gallery"); 
//Recuperation des projet via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    //Créer un élément figure 
    for (let i = 0; i < data.length; i++) {
      
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = data[i].title;
      figure.className = data[i].category.name.replaceAll(' ', '-');

      figure.appendChild(img);
      figure.appendChild(figcaption);

      gallery.appendChild(figure);
    }
  })
  .catch(error => console.error(error));

// Fonction pour cacher/supprimer les filtres
function hideFilters() {
  const activeElement = document.querySelector(".active");
  if (activeElement) {
    activeElement.style.display = "none";
  }
}

// Ajout des filtres pour afficher les travaux par catégorie
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
  
    // Créer un élément div pour les filtres
    const filters = document.createElement("div");
    const buttonAll = document.createElement("button");
   
    // Ajouter une classe CSS à l'élément div des filtres
    filters.classList.add("filter-buttons");
    gallery.before(filters);
    // Créer un bouton pour afficher tous les éléments
    buttonAll.innerText = "Tous";
    filters.appendChild(buttonAll);
    // Ajouter une classe CSS active au bouton "Tous"
    filters.className = "active";

    buttonAll.addEventListener("click", function(){
      // Afficher tous 
      let figures = document.querySelectorAll("figure");
      for (let i = 0; i < figures.length; i++){
        figures[i].style.display = "block";
      }
    });

    // Créer un bouton pour chaque catégorie
    for(let i=0; i < categories.length; i++){
      const filterButton = document.createElement("button");
      filterButton.innerText = categories[i].name;
      filters.appendChild(filterButton);

      filterButton.addEventListener("click", function(){
      // Afficher les éléments de la catégorie correspondante, et masquer les autres 
       filterButtons(this.textContent);
      });
    };
    // Masquer les filtres si l'utilisateur est connecté
    if (sessionStorage.getItem("token")) {
      hideFilters();
    }
   
  })
  .catch(error => console.error(error));

  //Filtrer les éléments en fonction de la catégorie
  function filterButtons(className) {
    let figures = document.querySelectorAll("figure");
    for (let i = 0; i < figures.length; i++) {
      console.log( figures[i]);
      if (figures[i].classList.contains(className.replaceAll(' ', '-'))) {
        figures[i].style.display = "block";
      } else {
        figures[i].style.display = "none";
      }
    }
  }
// Récupération du bouton de connexion dans la nav
const loginButton = document.querySelector('nav li a[href="./login.html"]');

// Vérification de la présence du token dans la sessionStorage
if (sessionStorage.getItem("token")) {
  /*//Récupération de l'élément qui contient les filtres
  const activeElement = document.querySelector(".active");
  if (activeElement) {
    //Masquer les filtres
    activeElement.style.display = "none";
    activeElement.classList.remove("active");  
  }*/

  // Changement de bouton de connexion pour afficher "Logout" au lieu de "Login"
  loginButton.textContent = "Logout";
  loginButton.href = "#";

  // Ajout d'un gestionnaire d'événements de clic pour déconnecter l'utilisateur et supprimer le token de la sessionStorage
  loginButton.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "./login.html";
  });

/*// Récupération de l'élément ayant la classe "active"
const activeElement = document.querySelector(".active");

// Vérification de la présence du token dans le local storage
  //if(token !== "" && token !== null){
  if (localStorage.getItem("token")) {
    // Si le token est présent, on retire la classe "active" de l'élément
    activeElement.style.display = "none";
    activeElement.classList.remove("active"); 
  }*/

//Creation du texte modifier


}


  

