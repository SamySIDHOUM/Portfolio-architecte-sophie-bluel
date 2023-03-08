// Récupération du formulaire et de ses champs
const form = document.querySelector("#login");
//const tokenKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
/*const user = {
    email: email, 
    password: password
};*/
// Écoute de l'événement de soumission du formulaire
form.addEventListener("submit", (event) => {
  // Empêcher l'envoi du formulaire par défaut
  event.preventDefault();

  // Récupération des valeurs des champs
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log("Valeurs des champs :", email, password);

  // Envoi de la requête POST à l'API pour se connecter avec les informations de connexion saisies
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json()) // Transformation de la réponse en objet JSON
    .then((data) => {
        console.log("Données renvoyées par l'API :", data);
      // Vérification des données renvoyées par l'API
      if (data.message === "user not found" || data.error) {
        // Affichage d'un message d'erreur si l'utilisateur n'a pas été trouvé ou si le mot de passe est incorrect
        alert("Erreur dans l'identifiant ou le mot de passe");
      } else {
        // Redirection vers la page d'accueil si l'utilisateur est connecté
        window.location.href = "./index.html";
        console.log("Connexion réussie !");
      }
    })
    .catch((error) => console.error(error));
});



  




