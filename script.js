// Show rating interface when a button is clicked
const rateTVShowsBtn = document.getElementById('rateTVShows');
const rateFootballersBtn = document.getElementById('rateFootballers');
const rateMoviesBtn = document.getElementById('rateMovies');
const rateGamesBtn = document.getElementById('rateGames');

const ratingInterfaces = document.getElementById('ratingInterfaces');

const tvShowsInterface = document.getElementById('tvShowsInterface');
const footballersInterface = document.getElementById('footballersInterface');
const moviesInterface = document.getElementById('moviesInterface');
const gamesInterface = document.getElementById('gamesInterface');

function showInterface(interface) {
    ratingInterfaces.style.display = 'block';
    tvShowsInterface.style.display = 'none';
    footballersInterface.style.display = 'none';
    moviesInterface.style.display = 'none';
    gamesInterface.style.display = 'none';
    interface.style.display = 'block';
}

rateTVShowsBtn.onclick = () => showInterface(tvShowsInterface);
rateFootballersBtn.onclick = () => showInterface(footballersInterface);
rateMoviesBtn.onclick = () => showInterface(moviesInterface);
rateGamesBtn.onclick = () => showInterface(gamesInterface);

// Initialize category averages (for non-movie categories)
const ratingsData = {
    tvShows: { total: 0, count: 0 },
    footballers: { total: 0, count: 0 },
    games: { total: 0, count: 0 },
};

// Generic rating submission
const submitRatingBtns = document.querySelectorAll('.submitRating');
submitRatingBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        const ratingInput = document.getElementById(`${category}Rating`);
        const avgDisplay = document.getElementById(`${category}Avg`);
        const rating = parseInt(ratingInput.value);

        if (rating >= 1 && rating <= 5) {
            ratingsData[category].total += rating;
            ratingsData[category].count += 1;
            const avgRating = (ratingsData[category].total / ratingsData[category].count).toFixed(1);
            avgDisplay.textContent = avgRating;
            ratingInput.value = '';
        } else {
            alert("Please rate between 1 and 5.");
        }
    });
});

// ----------------- Movie ratings per item -----------------
const movieRatingsData = {
    inception: { total: 0, count: 0 },
    darkKnight: { total: 0, count: 0 },
    endgame: { total: 0, count: 0 },
};

const submitMovieRatingsBtn = document.querySelector('.submitMovieRatings');

submitMovieRatingsBtn.addEventListener('click', () => {
    const movies = ['inception', 'darkKnight', 'endgame'];

    movies.forEach(movie => {
        const input = document.getElementById(`${movie}Rating`);
        const value = parseInt(input.value);
        const avgDisplay = document.getElementById(`${movie}Avg`);

        if (value >= 1 && value <= 5) {
            movieRatingsData[movie].total += value;
            movieRatingsData[movie].count += 1;

            const avgRating = (movieRatingsData[movie].total / movieRatingsData[movie].count).toFixed(1);
            avgDisplay.textContent = avgRating;

            input.value = '';
        } else if (input.value !== '') {
            alert(`Please rate ${movie.replace(/([A-Z])/g, ' $1').trim()} between 1 and 5.`);
        }
    });
});
