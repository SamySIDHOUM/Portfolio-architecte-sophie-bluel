// Sélectionner l'élément DOM qui contiendra la galerie
  const gallery = document.querySelector(".gallery"); 
//Recuperation des projet via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    console.log("Liste des projets : ", data);
    //Créer un élément figure 
    for (let i = 0; i < data.length; i++) {
      
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = data[i].title;
      figure.className = data[i].category.name;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      gallery.appendChild(figure);
    }
  })
  .catch(error => console.error(error));


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
     
      console.log(this.textContent);
    });

    // Créer un bouton pour chaque catégorie
    for(let i=0; i < categories.length; i++){
      const filterButton = document.createElement("button");
      filterButton.innerText = categories[i].name;
      filters.appendChild(filterButton);

      filterButton.addEventListener("click", function(){
        console.log(this.textContent);
      // Afficher les éléments de la catégorie correspondante, et masquer les autres 
       filterButtons(this.textContent);
      });
    };

  })
  .catch(error => console.error(error));

  //Filtrer les éléments en fonction de la catégorie
  function filterButtons(className) {
    let figures = document.querySelectorAll("figure");
    for (let i = 0; i < figures.length; i++) {
      if (figures[i].classList.contains(className)) {
        figures[i].style.display = "block";
      } else {
        figures[i].style.display = "none";

        console.log("index = "+ i);
      }
    }
  }
  
  //filterButtons("catgories");

