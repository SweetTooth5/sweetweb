// Initial Data (Loads from LocalStorage if it exists)
let ratingsData = JSON.parse(localStorage.getItem('sweetweb_ratings')) || {};

// UI Navigation
const interfaces = {
    rateTVShows: 'tvShowsInterface',
    rateFootballers: 'footballersInterface',
    rateMovies: 'moviesInterface',
    rateGames: 'gamesInterface'
};

Object.keys(interfaces).forEach(btnId => {
    document.getElementById(btnId).onclick = () => {
        document.querySelectorAll('.ratingInterface').forEach(el => el.style.display = 'none');
        document.getElementById(interfaces[btnId]).style.display = 'block';
    };
});

// Universal Rating Function
function submitRating(category, itemKeys) {
    itemKeys.forEach(key => {
        const input = document.getElementById(`${key}Rating`);
        const val = parseInt(input.value);
        
        if (val >= 1 && val <= 5) {
            if (!ratingsData[key]) ratingsData[key] = { total: 0, count: 0 };
            ratingsData[key].total += val;
            ratingsData[key].count++;
            
            // Save to LocalStorage
            localStorage.setItem('sweetweb_ratings', JSON.stringify(ratingsData));
            updateDisplay(key);
            input.value = '';
        }
    });
}

// Update text on screen
function updateDisplay(key) {
    if (ratingsData[key]) {
        const avg = (ratingsData[key].total / ratingsData[key].count).toFixed(1);
        document.getElementById(`${key}Avg`).innerText = avg;
    }
}

// Load all saved ratings on page start
window.onload = () => {
    Object.keys(ratingsData).forEach(key => updateDisplay(key));
};
