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
    let movieTitle = document.createElement("div");
        movieTitle.id = "movie-title";
        movieCard.appendChild(movieTitle);
        movieTitle.innerHTML = fetchedArray.results[i].title;
    let movieImg = document.createElement("div");
        movieImg.id = "movie-img";
    let imgSource = document.createElement("img");
        movieImg.appendChild(imgSource);
    let movieBio = document.createElement("div");
        movieBio.id = "movie-bio";
        movieCard.appendChild(movieBio);
        movieBio.innerHTML = fetchedArray.results[i].overview;
    let movieRating = document.createElement("div");
        movieRating.id = "movie-rating";
        movieCard.appendChild(movieRating);
        movieRating.innerHTML = fetchedArray.results[i].vote_average + " / 10";
    let ratingColor = fetchedArray.results[i].vote_average;
        if (ratingColor <= 5) {
            movieRating.style.color = "var(--vibrantRed)";
        } else if (ratingColor > 5 && ratingColor <= 7) {
            movieRating.style.color = "var(--vibrantYellow)";
        } else {
            movieRating.style.color = "var(--vibrantGreen)";
        }
    console.log(i + " " + fetchedArray.results[i].title);
    }
};


//Mobile Drop Menu
let burgerIcon = document.querySelector("#burger-menu");
burgerIcon.addEventListener("click", function() {
    document.querySelector("#menu-links").classList.toggle("active");
    burgerIcon.classList.toggle("active");
});