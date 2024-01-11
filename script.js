const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGE2MTUwMGU3ZTg2NWIwYTQ0Y2E2ZTdlNmYzYTBiOCIsInN1YiI6IjYyZTA1ZTE0MzNhNTMzMDUxZmJhN2Q0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5pD8mIZAN0ygUcw0wbelt2kUcsV5OOA10HcKVZmwaZo'
  }
};

let fetchedArray;

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(function(response) {
    fetchedArray = response;
    generateCards();
    })
  .catch(err => console.error(err));


//Generates dynamic movie cards after fetching API data
function generateCards() {
    for (let i = 0; i < fetchedArray.results.length; i++){
    let mainContent = document.querySelector(".mainContent");
    let movieCard = document.createElement("div");
        movieCard.classList = "movie-card";
        mainContent.appendChild(movieCard);
    //Title
    let movieTitle = document.createElement("div");
        movieTitle.id = "movie-title";
        movieCard.appendChild(movieTitle);
        movieTitle.innerHTML = fetchedArray.results[i].title;
    //Image
    let movieImg = document.createElement("div");
        movieImg.id = "movie-img";
    let imgSource = document.createElement("img");
        imgSource.src = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";
        imgSource.alt = "Alt Text For Image";
        imgSource.height = 400;
        imgSource.width = 300;
        movieCard.appendChild(movieImg);
        movieImg.appendChild(imgSource);
    //Overview
    let movieBio = document.createElement("div");
        movieBio.id = "movie-bio";
        movieCard.appendChild(movieBio);
        movieBio.innerHTML = fetchedArray.results[i].overview;
    //Rating
    let movieRating = document.createElement("div");
        movieRating.id = "movie-rating";
        movieCard.appendChild(movieRating);
    let ratingColor = fetchedArray.results[i].vote_average;
        ratingColor = Math.round(ratingColor * 10) / 10;
        if (ratingColor <= 5) {
            movieRating.style.color = "var(--vibrantRed)";
        } else if (ratingColor > 5 && ratingColor <= 7) {
            movieRating.style.color = "var(--vibrantYellow)";
        } else {
            movieRating.style.color = "var(--vibrantGreen)";
        }
        movieRating.innerHTML = ratingColor + " / 10";
    }
};


//Mobile Drop Menu
let burgerIcon = document.querySelector("#burger-menu");
burgerIcon.addEventListener("click", function() {
    document.querySelector("#menu-links").classList.toggle("active");
    burgerIcon.classList.toggle("active");
});