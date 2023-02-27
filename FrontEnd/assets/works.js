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
    const gallery = document.querySelector(".gallery"); 
    const filters = document.createElement("div");
    const buttonAll = document.createElement("button");

    filters.classList.add("filter-buttons");
    gallery.before(filters);
    buttonAll.innerText = "Tous";
    filters.appendChild(buttonAll);
    filters.className = "active";

    buttonAll.addEventListener("click", function(){
      document.querySelector(".gallery").innerHTML = "";
      data.forEach(function(categories) {
        createCategoriesElement(categories);
      });
    });

    for(let i=0; i < categories.length; i++){
      const filterButton = document.createElement("button");
      filterButton.innerText = categories[i].name;
      filters.appendChild(filterButton);

      filterButton.addEventListener("click", function(){
        const filteredGallery= gallery.filter(function(categories){
          return categories.category.name === categories[i].name;
        });
        document.querySelector(".gallery").innerHTML = "";
        filteredData.forEach(function(categories) {
          createCategoriesElement(categories);
        });
      });
    };

  })
  .catch(error => console.error(error));

