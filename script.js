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

// Functions to show relevant interface
rateTVShowsBtn.onclick = () => showInterface(tvShowsInterface);
rateFootballersBtn.onclick = () => showInterface(footballersInterface);
rateMoviesBtn.onclick = () => showInterface(moviesInterface);
rateGamesBtn.onclick = () => showInterface(gamesInterface);

function showInterface(interface) {
    // Show the rating interfaces section
    ratingInterfaces.style.display = 'block';
    // Hide all rating interfaces first
    tvShowsInterface.style.display = 'none';
    footballersInterface.style.display = 'none';
    moviesInterface.style.display = 'none';
    gamesInterface.style.display = 'none';
    // Then show the selected interface
    interface.style.display = 'block';
}

// Initialize average ratings
const ratingsData = {
    tvShows: { total: 0, count: 0 },
    footballers: { total: 0, count: 0 },
    movies: { total: 0, count: 0 },
    games: { total: 0, count: 0 },
};

// Handle rating submission
const submitRatingBtns = document.querySelectorAll('.submitRating');

submitRatingBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        const ratingInput = document.getElementById(`${category}Rating`);
        const avgDisplay = document.getElementById(`${category}Avg`);

        const rating = parseInt(ratingInput.value);

        if (rating >= 1 && rating <= 5) {
            // Update ratings data
            ratingsData[category].total += rating;
            ratingsData[category].count += 1;
            // Calculate average
            const avgRating = (ratingsData[category].total / ratingsData[category].count).toFixed(1);
            // Display the average
            avgDisplay.textContent = avgRating;

            // Clear input after submission
            ratingInput.value = '';
        } else {
            alert("Please rate between 1 and 5.");
        }
    });
});