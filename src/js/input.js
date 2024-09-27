const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGE2MTUwMGU3ZTg2NWIwYTQ0Y2E2ZTdlNmYzYTBiOCIsInN1YiI6IjYyZTA1ZTE0MzNhNTMzMDUxZmJhN2Q0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5pD8mIZAN0ygUcw0wbelt2kUcsV5OOA10HcKVZmwaZo"
  }
};

fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const trendingMoviesContainer = document.getElementById('trending-movies-container');
    const trendingMovies = data.results.slice(0, 20); // Get the first 20 trending movies

    trendingMovies.forEach(movie => {
      // Determine the rating color
      let ratingColorClass = '';
      const roundedRating = (Math.round(movie.vote_average * 10) / 10).toFixed(1);
    
      if (roundedRating >= 7) {
        ratingColorClass = 'text-primaryGreen'; // Class for ratings 7 and above
      } else if (roundedRating >= 4.5) {
        ratingColorClass = 'text-primaryYellow'; // Class for ratings between 4.5 and 7
      } else {
        ratingColorClass = 'text-primaryRed'; // Class for ratings below 4.5
      }
    
      const trendingMovieCard = `
      <div class="bg-black overflow-hidden max-w-full">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="w-full object-contain">
          <div class="p-4">
          <p class="text-lg font-bold">${movie.title}</p>
          <p class="text-sm">Score: <span class="${ratingColorClass}">${roundedRating}</span></p>
          <p class="text-sm text-white">Release Date: ${movie.release_date}</p>
        </div>
      </div>
    `;

      trendingMoviesContainer.innerHTML += trendingMovieCard;
    });
  })
  .catch(err => {
    console.error("Error fetching data: ", err);
  });