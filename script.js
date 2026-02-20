let ratingsData = JSON.parse(localStorage.getItem('sweetweb_data')) || {};

// Star Interaction
document.querySelectorAll('.stars .fa-star').forEach(star => {
    star.onclick = (e) => {
        const parent = e.target.parentElement;
        const rating = e.target.getAttribute('data-index');
        parent.setAttribute('data-value', rating);
        parent.querySelectorAll('.fa-star').forEach((s, i) => {
            s.classList.toggle('fas', i < rating);
            s.classList.toggle('far', i >= rating);
        });
    };
});

// Vote Submission
const submitBtn = document.querySelector('.submitBtn');
if (submitBtn) {
    submitBtn.onclick = () => {
        document.querySelectorAll('.ratingItem').forEach(item => {
            const key = item.getAttribute('data-key');
            const val = parseInt(item.querySelector('.stars').getAttribute('data-value'));
            if (val > 0) {
                if (!ratingsData[key]) ratingsData[key] = { total: 0, count: 0 };
                ratingsData[key].total += val;
                ratingsData[key].count++;
                localStorage.setItem('sweetweb_data', JSON.stringify(ratingsData));
                updateUI(key);
            }
        });
        document.querySelector('.rating-container').classList.add('show-results');
        alert("Votes Recorded!");
    };
}

function updateUI(key) {
    const data = ratingsData[key];
    if (!data) return;
    const avg = data.total / data.count;
    const percentage = Math.round((avg / 5) * 100);
    const bar = document.getElementById(`${key}Bar`);
    const text = document.getElementById(`${key}Percent`);
    if (bar) bar.style.width = percentage + "%";
    if (text) text.innerText = percentage;
}

window.onload = () => {
    Object.keys(ratingsData).forEach(key => updateUI(key));
};
