//Recuperation des projet via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    console.log("Liste des projets : ", data);
  })
  .catch(error => console.error(error));