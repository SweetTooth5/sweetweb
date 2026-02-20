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

// ----------------------------------------
// TV Shows Rating Logic
const tvShowRatingsData = {
    gameOfThrones: { total: 0, count: 0 },
    breakingBad: { total: 0, count: 0 },
    strangerThings: { total: 0, count: 0 },
};

const submitTVShowsRatingsBtn = document.querySelector('.submitTVShowsRatings');

submitTVShowsRatingsBtn.addEventListener('click', () => {
    const tvShows = ['gameOfThrones', 'breakingBad', 'strangerThings'];

    tvShows.forEach(tvShow => {
        const input = document.getElementById(`${tvShow}Rating`);
        const value = parseInt(input.value);
        const avgDisplay = document.getElementById(`${tvShow}Avg`);

        if (value >= 1 && value <= 5) {
            tvShowRatingsData[tvShow].total += value;
            tvShowRatingsData[tvShow].count += 1;

            const avgRating = (tvShowRatingsData[tvShow].total / tvShowRatingsData[tvShow].count).toFixed(1);
            avgDisplay.textContent = avgRating;

            input.value = '';
        } else if (input.value !== '') {
            alert(`Please rate ${tvShow.replace(/([A-Z])/g, ' $1').trim()} between 1 and 5.`);
        }
    });
});

// ----------------------------------------
// Footballers Rating Logic
const footballerRatingsData = {
    messi: { total: 0, count: 0 },
    ronaldo: { total: 0, count: 0 },
    neymar: { total: 0, count: 0 },
};

const submitFootballersRatingsBtn = document.querySelector('.submitFootballersRatings');

submitFootballersRatingsBtn.addEventListener('click', () => {
    const footballers = ['messi', 'ronaldo', 'neymar'];

    footballers.forEach(footballer => {
        const
