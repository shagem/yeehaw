const options = {
    method: "GET",
    headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGE2MTUwMGU3ZTg2NWIwYTQ0Y2E2ZTdlNmYzYTBiOCIsInN1YiI6IjYyZTA1ZTE0MzNhNTMzMDUxZmJhN2Q0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5pD8mIZAN0ygUcw0wbelt2kUcsV5OOA10HcKVZmwaZo"
  }
};

let fetchedArray;
fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
    .then(response => response.json())
    .then(function(response) {
    fetchedArray = response;
    generateCards();
    })
    .catch(err => console.error(err));

//Generates Cards
let mainContent = document.querySelector(".mainContent");
function generateCards() {
    //Stores API Data in cardData Object
    for (let i = 0; i < fetchedArray.results.length; i++){ 
        let cardData = {
            cardTitle: fetchedArray.results[i].title,
            cardOverview: fetchedArray.results[i].overview,
            voteRating: Math.round(fetchedArray.results[i].vote_average * 10) / 10,
            voteCount: fetchedArray.results[i].vote_count,
            cardRelease: fetchedArray.results[i].release_date,
            cardSrc: "https://image.tmdb.org/t/p/w342/" + fetchedArray.results[i].poster_path,
            cardAlt: ""
        }
        //Creates HTML Elements
        let card = document.createElement("div");
        let imgWrapper = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("div");
        let overview = document.createElement("div");
        let rating = document.createElement("div");
        let ratingVoteCount = document.createElement("div");
        //Appends Elements
        mainContent.appendChild(card);
        card.appendChild(imgWrapper);
        imgWrapper.appendChild(img);
        card.appendChild(title);
        card.appendChild(overview);
        card.appendChild(rating);
        //Adds Styles to Elements
        card.classList = "card";
        imgWrapper.id = "img-wrapper";
        img.id = "card-img";
        img.src = cardData.cardSrc;
        title.id = "title";
        overview.id = "overview";
        rating.id = "rating";
        //Checks Rating and Assigns Color
        if (cardData.voteRating <= 6) {
            rating.classList = "rating-red";   
        } else if (cardData.voteRating > 6 && cardData.voteRating <= 7.5) {
            rating.classList = "rating-yellow";     
        } else {
            rating.classList = "rating-green";      
        }
        //Fills Elements with cardData
        title.innerHTML = cardData.cardTitle;
        overview.innerHTML = cardData.cardOverview;
        rating.innerHTML = cardData.voteRating + " / 10";
    }  
};

function searchMovie() {
    let userSearch = document.querySelector('#search-bar').value;
    fetch("https://api.themoviedb.org/3/search/movie?query=" + userSearch + "&include_adult=true&language=en-US&page=1", options)
        .then(response => response.json())
        .then(function(response) {
        fetchedArray = response;
        mainContent.innerHTML = "";
        generateCards();
        })
        .catch(err => console.error(err));
};


//Mobile Drop Menu
let burgerIcon = document.querySelector("#burger-menu");
burgerIcon.addEventListener("click", function() {
    document.querySelector("#menu-links").classList.toggle("active");
    burgerIcon.classList.toggle("active");
});


//Search Bar Functionality
document.querySelector("#search-btn").addEventListener("click", searchMovie);
document.querySelector("#search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        searchMovie();
    }
});
