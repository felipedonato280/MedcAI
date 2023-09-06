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