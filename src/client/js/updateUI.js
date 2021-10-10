const updateUI = (res) => {

    const cardWrapper = document.querySelector('.wrapper');
    const imageDiv = document.getElementById('main-image');
    const locationName = document.querySelector('.location-name');
    const weatherDetails = document.querySelector('.weather');
    const seperatorDiv = document.querySelector('.divider');
    const tripDetails = document.querySelector('.dates');

    cardWrapper.classList.add('card');
    imageDiv.classList.add('top-image');
    imageDiv.style.backgroundImage = `url('${res.webformatURL}')`
    locationName.innerHTML = `${res.toponymName}, ${res.countryName}`;
    seperatorDiv.classList.add('seperator');
    weatherDetails.innerHTML = '<div class="deets">' + res.weather.icon + '</div>' + '<div class="temperature">' + res.temp + '</div>';
    tripDetails.innerHTML = 'Departure: <div class="departure">' + res.date + '</div>'; 

    return;
}

export { updateUI }