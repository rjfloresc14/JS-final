// Función para buscar películas por título
async function searchMovies() {
    const apiKey = 'f1a8a13c';
    const movieTitle = document.getElementById('movieTitle').value;

    // Verifica si se ha ingresado un título
    if (movieTitle.trim() === '') {
      alert('Por favor, ingrese un título de película.');
      return;
    }

    try {
      // Realiza la búsqueda utilizando Fetch y promesas
      const response = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`);
      const data = await response.json();

      // Verifica si se encontraron películas
      if (data.Response === 'True') {
        // Genera el HTML dinámicamente para mostrar la lista de películas
        const movieResultsContainer = document.getElementById('movieResults');
        movieResultsContainer.innerHTML = '';

        data.Search.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Año:</strong> ${movie.Year}</p>
            <p><strong>Tipo:</strong> ${movie.Type}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img-fluid">
          `;
          movieResultsContainer.appendChild(movieCard);
        });
      } else {
        // Muestra un mensaje si no se encontraron películas
        alert('No se encontraron películas. Verifique el título.');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener datos de la API:', error);
      alert('Ocurrió un error al obtener datos de la API.');
    }
  }