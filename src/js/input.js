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
    console.log(fetchedArray);
    })
.catch(err => console.error(err));