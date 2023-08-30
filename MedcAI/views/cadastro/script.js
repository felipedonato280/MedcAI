// chave de API da Google Places API
const apiKey = 'AIzaSyAtpJuIwbkfAmKE4FfE-YJfVnB_IwKegAI';

function initialize() {
  const input = document.getElementById('endereco-input');
  const suggestionsContainer = document.createElement('div'); // Container para as sugestões
  let autocomplete;

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setComponentRestrictions({ 'country': 'br' });

  input.addEventListener('input', () => {
    const inputText = input.value;
    const service = new google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: inputText, componentRestrictions: { 'country': 'br' } }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const fragment = document.createDocumentFragment(); // DocumentFragment para conter as sugestões

        while (suggestionsContainer.firstChild) {
          suggestionsContainer.removeChild(suggestionsContainer.firstChild);
        }

        predictions.forEach((prediction) => {
          const li = document.createElement('li');
          li.textContent = prediction.description;
          li.addEventListener('click', () => {
            input.value = prediction.description;
            while (suggestionsContainer.firstChild) {
              suggestionsContainer.removeChild(suggestionsContainer.firstChild);
            }
          });
          fragment.appendChild(li);
        });

        suggestionsContainer.appendChild(fragment);

        // Substituir o conteúdo do container atual com as novas sugestões
        suggestionsContainer.replaceWith(suggestionsContainer.cloneNode(true));
      }
    });
  });
}

window.onload = initialize;

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputId, iconId) {
  var passwordInput = document.getElementById(inputId);
  var eyeIcon = document.getElementById(iconId);

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>`;
  } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>`;
  }
}

// Adicione os event listeners para os ícones de olho
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("eye-icon-password").addEventListener("click", function () {
      togglePasswordVisibility("password", "eye-icon-password");
  });

  document.getElementById("eye-icon-confirm-password").addEventListener("click", function () {
      togglePasswordVisibility("confirm-password", "eye-icon-confirm-password");
  });
});


