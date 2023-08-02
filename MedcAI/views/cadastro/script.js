// chave de API da Google Places API
const apiKey = 'AIzaSyAtpJuIwbkfAmKE4FfE-YJfVnB_IwKegAI';

function initialize() {
  const input = document.getElementById('endereco-input');
  const suggestionsList = document.getElementById('suggestions');
  let autocomplete;

  // Inicializar o Autocomplete da Google Places API
  autocomplete = new google.maps.places.Autocomplete(input);

  // Definir o país para Brasil
  autocomplete.setComponentRestrictions({ 'country': 'br' });

  // Escutar o evento de seleção de sugestão
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error('Nenhum lugar selecionado');
      return;
    }
    console.log(place.formatted_address);
  });

  // Escutar o evento de entrada de texto para exibir sugestões
  input.addEventListener('input', () => {
    const inputText = input.value;

    // Fazer uma solicitação para a API com o valor atual do input
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: inputText, componentRestrictions: { 'country': 'br' } }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Limpar a lista de sugestões
        suggestionsList.innerHTML = '';

        // Adicionar as sugestões à lista
        predictions.forEach((prediction) => {
          const li = document.createElement('li');
          li.textContent = prediction.description;
          li.addEventListener('click', () => {
            // Quando uma sugestão é clicada, preencher o input com o valor selecionado
            input.value = prediction.description;
            suggestionsList.innerHTML = '';
          });
          suggestionsList.appendChild(li);
        });
      }
    });
  });
}

// Inicializar a função quando a página é carregada
window.onload = initialize;
