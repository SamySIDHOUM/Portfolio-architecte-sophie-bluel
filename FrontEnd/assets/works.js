//Recuperation des projet via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    console.log("Liste des projets : ", data);
    for (let i = 0; i < data.length; i++) {
      const gallery = document.querySelector(".gallery"); 

      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = data[i].title;

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
    // Sélectionner l'élément DOM qui contiendra la galerie
    const gallery = document.querySelector(".gallery"); 
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
      document.querySelector(".gallery").innerHTML = "";
      data.forEach(function(categories) {
        createCategoriesElement(categories);
      });
    });

    // Créer un bouton pour chaque catégorie
    for(let i=0; i < categories.length; i++){
      const filterButton = document.createElement("button");
      filterButton.innerText = categories[i].name;
      filters.appendChild(filterButton);

      filterButton.addEventListener("click", function(){
         // Filtrer les éléments de la galerie selon la catégorie sélectionnée
        const filteredGallery= gallery.filter(function(categories){
          return categories.category.name === categories[i].name;
        });
        document.querySelector(".gallery").innerHTML = "";
        // Ajouter les éléments filtrés à la galerie
        filteredData.forEach(function(categories) {
          createCategoriesElement(categories);
        });
      });
    };

  })
  .catch(error => console.error(error));

