let ratingsData = JSON.parse(localStorage.getItem('sweetweb_data')) || {};

// Nav Logic
const navMapping = {
    rateTVShows: 'tvShowsInterface',
    rateFootballers: 'footballersInterface',
    rateMovies: 'moviesInterface',
    rateGames: 'gamesInterface'
};

Object.keys(navMapping).forEach(id => {
    document.getElementById(id).onclick = () => {
        document.querySelectorAll('.ratingInterface').forEach(el => el.style.display = 'none');
        document.getElementById(navMapping[id]).style.display = 'block';
    };
});

// Star Click Logic
document.querySelectorAll('.stars .fa-star').forEach(star => {
    star.onclick = (e) => {
        const parent = e.target.parentElement;
        const rating = e.target.getAttribute('data-index');
        parent.setAttribute('data-value', rating);
        
        // Highlight stars
        const stars = parent.querySelectorAll('.fa-star');
        stars.forEach((s, idx) => {
            if(idx < rating) {
                s.classList.replace('far', 'fas');
            } else {
                s.classList.replace('fas', 'far');
            }
        });
    };
});

// Submit Logic
document.querySelectorAll('.submitBtn').forEach(btn => {
    btn.onclick = (e) => {
        const parentInterface = e.target.closest('.ratingInterface');
        const items = parentInterface.querySelectorAll('.ratingItem');
        
        items.forEach(item => {
            const key = item.getAttribute('data-key');
            const val = parseInt(item.querySelector('.stars').getAttribute('data-value'));
            
            if (val > 0) {
                if (!ratingsData[key]) ratingsData[key] = { total: 0, count: 0 };
                ratingsData[key].total += val;
                ratingsData[key].count++;
                
                // Save and reset stars
                localStorage.setItem('sweetweb_data', JSON.stringify(ratingsData));
                updateDisplay(key);
                
                // Clear UI selection
                item.querySelector('.stars').setAttribute('data-value', '0');
                item.querySelectorAll('.fa-star').forEach(s => s.classList.replace('fas', 'far'));
            }
        });
        alert("Ratings Submitted!");
    };
});

function updateDisplay(key) {
    const display = document.getElementById(`${key}Avg`);
    if (display && ratingsData[key]) {
        const avg = (ratingsData[key].total / ratingsData[key].count).toFixed(1);
        display.innerText = avg;
    }
}

window.onload = () => {
    Object.keys(ratingsData).forEach(key => updateDisplay(key));
};
