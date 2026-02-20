// Persistent Database
let ratingsData = JSON.parse(localStorage.getItem('sweetweb_data')) || {};

// Navigation Setup
const nav = {
    rateTVShows: 'tvShowsInterface',
    rateFootballers: 'footballersInterface',
    rateMovies: 'moviesInterface',
    rateGames: 'gamesInterface'
};

Object.keys(nav).forEach(id => {
    document.getElementById(id).onclick = () => {
        document.querySelectorAll('.ratingInterface').forEach(el => el.style.display = 'none');
        document.getElementById(nav[id]).style.display = 'block';
    };
});

// Master Submit Function
function submitRating(keys) {
    keys.forEach(key => {
        const input = document.getElementById(`${key}Rating`);
        const val = parseInt(input.value);

        if (val >= 1 && val <= 5) {
            if (!ratingsData[key]) ratingsData[key] = { total: 0, count: 0 };
            
            ratingsData[key].total += val;
            ratingsData[key].count++;
            
            localStorage.setItem('sweetweb_data', JSON.stringify(ratingsData));
            updateDisplay(key);
            input.value = '';
        }
    });
}

function updateDisplay(key) {
    const display = document.getElementById(`${key}Avg`);
    if (display && ratingsData[key]) {
        const avg = (ratingsData[key].total / ratingsData[key].count).toFixed(1);
        display.innerText = avg;
    }
}

// Initial Load of Scores
window.onload = () => {
    Object.keys(ratingsData).forEach(key => updateDisplay(key));
};

