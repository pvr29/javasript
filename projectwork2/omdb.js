// index.js (Home Page)
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieDisplay = document.getElementById('movieDisplay');

searchInput.addEventListener('input', searchMovies);

function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    fetchMovies(searchTerm);
  } else {
    movieDisplay.innerHTML = '';
  }
}

function fetchMovies(searchTerm) {
  const apiKey = '624d3669';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.Search);
    })
    .catch(error => console.error('Error fetching movie data:', error));
}

function displayMovies(movies) {
  movieDisplay.innerHTML = '';
  if (movies) {
    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie');
      movieItem.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="favorite-btn">Favorite</button>
      `;
      movieItem.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movie.imdbID}`;
      });
      const favoriteBtn = movieItem.querySelector('.favorite-btn');
      favoriteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event bubbling
        addToFavorites(movie);
      });
      movieDisplay.appendChild(movieItem);
    });
  } else {
    movieDisplay.innerHTML = '<p>No movies found</p>';
  }
}

function addToFavorites(movie) {
  // Implement adding the movie to favorites list
  console.log('Added to favorites:', movie);
}


// movie.js (Movie Page)
const movieDetails = document.getElementById('movieDetails');
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

if (movieId) {
  fetchMovieDetails(movieId);
}

function fetchMovieDetails(movieId) {
  const apiKey = '624d3669';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayMovieDetails(data);
    })
    .catch(error => console.error('Error fetching movie details:', error));
}

function displayMovieDetails(movie) {
  const { Title, Year, Poster, Plot } = movie;
  movieDetails.innerHTML = `
    <h2>${Title} (${Year})</h2>
    <img src="${Poster}" alt="${Title}">
    <p>${Plot}</p>
  `;
}
