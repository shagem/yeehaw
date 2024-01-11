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

let mainContent;
let movieCard;
let movieImg;
let imgSource;
let movieTitle;
let movieOverview;
let movieRating;
let ratingColor;

//Generates dynamic movie cards after fetching API data on startup
function generateCards() {
    for (let i = 0; i < fetchedArray.results.length; i++){
    mainContent = document.querySelector(".mainContent");
    movieCard = document.createElement("div");
        movieCard.classList = "movie-card";
        mainContent.appendChild(movieCard);
    //Image
    movieImg = document.createElement("div");
        movieImg.id = "movie-img-wrapper";
    imgSource = document.createElement("img");
        imgSource.id = "movie-img";
        imgSource.src = "https://image.tmdb.org/t/p/w342/" + fetchedArray.results[i].poster_path;
        imgSource.alt = "Sorry, there is no image for this listing";
        movieCard.appendChild(movieImg);
        movieImg.appendChild(imgSource);
    //Title
    movieTitle = document.createElement("div");
        movieTitle.id = "movie-title";
        movieCard.appendChild(movieTitle);
        movieTitle.innerHTML = fetchedArray.results[i].title;
    //Overview
    movieOverview = document.createElement("div");
        movieOverview.id = "movie-overview";
        movieCard.appendChild(movieOverview);
        movieOverview.innerHTML = fetchedArray.results[i].overview;
    //Rating
    movieRating = document.createElement("div");
        movieRating.id = "movie-rating";
        movieCard.appendChild(movieRating);
    ratingColor = fetchedArray.results[i].vote_average;
        ratingColor = Math.round(ratingColor * 10) / 10;
        if (ratingColor <= 5) {
            movieRating.style.color = "var(--vibrantRed)";
        } else if (ratingColor > 5 && ratingColor <= 7) {
            movieRating.style.color = "var(--vibrantYellow)";
        } else {
            movieRating.style.color = "var(--vibrantGreen)";
        }
        movieRating.innerHTML = "Average Rating: " + ratingColor + " / 10";
    }
};


//Mobile Drop Menu
let burgerIcon = document.querySelector("#burger-menu");
burgerIcon.addEventListener("click", function() {
    document.querySelector("#menu-links").classList.toggle("active");
    burgerIcon.classList.toggle("active");
});


//Search Bar Functionality
document.querySelector('#search-btn').addEventListener('click', searchMovie);
document.querySelector("#search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        searchMovie();
    }
});


//Generates Movie / TV Cards based on Search Bar
let userSearch;
function searchMovie() {
    userSearch = document.querySelector('#search-bar').value;
    if (userSearch === "") {
        console.log("Failed Search: No user input...");
    } else if (userSearch === "sean hageman") {
        console.log("Lil Easter Egg in the project never hurt anyone...");
    } else {
    fetch('https://api.themoviedb.org/3/search/multi?query='+ userSearch +'&include_adult=true&language=en-US&page=1', options)
        .then(response => response.json())
        .then(function(response) {
        fetchedArray = response;
        console.log(userSearch);
        console.log(fetchedArray);
        mainContent.innerHTML = "";
        for (let i = 0; i < fetchedArray.results.length; i++){
    mainContent = document.querySelector(".mainContent");
    movieCard = document.createElement("div");
        movieCard.classList = "movie-card";
        mainContent.appendChild(movieCard);
    //Image
    movieImg = document.createElement("div");
        movieImg.id = "movie-img-wrapper";
    imgSource = document.createElement("img");
        imgSource.id = "movie-img";
        imgSource.src = "https://image.tmdb.org/t/p/w342/" + fetchedArray.results[i].poster_path;
        imgSource.alt = "Sorry, there is no image for this listing";
        movieCard.appendChild(movieImg);
        movieImg.appendChild(imgSource);
    //Title
    movieTitle = document.createElement("div");
        movieTitle.id = "movie-title";
        movieCard.appendChild(movieTitle);
        movieTitle.innerHTML = fetchedArray.results[i].title;
    //Overview
    movieOverview = document.createElement("div");
        movieOverview.id = "movie-overview";
        movieCard.appendChild(movieOverview);
        movieOverview.innerHTML = fetchedArray.results[i].overview;
    //Rating
    movieRating = document.createElement("div");
        movieRating.id = "movie-rating";
        movieCard.appendChild(movieRating);
    ratingColor = fetchedArray.results[i].vote_average;
        ratingColor = Math.round(ratingColor * 10) / 10;
        if (ratingColor <= 5) {
            movieRating.style.color = "var(--vibrantRed)";
        } else if (ratingColor > 5 && ratingColor <= 7) {
            movieRating.style.color = "var(--vibrantYellow)";
        } else {
            movieRating.style.color = "var(--vibrantGreen)";
        }
        movieRating.innerHTML = "Average Rating: " + ratingColor + " / 10";
    }
    })
        .catch(err => console.error(err));
}
};



