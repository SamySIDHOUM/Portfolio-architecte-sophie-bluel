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
