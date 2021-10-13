import { tripCountdown } from "./tripCountdown";

const updateUI = (res) => {

    const cardWrapper = document.querySelector('#result-wrapper');
    const imageDiv = document.getElementById('main-image');
    const locationName = document.querySelector('.location-name');
    const weatherDetails = document.querySelector('.weather');
    const seperatorDiv = document.querySelector('.line');
    const departureDetails = document.querySelector('.departure');
    
    cardWrapper.classList.add("card");
    imageDiv.classList.add("top-image");
    imageDiv.style.backgroundImage = `url('${res.picture.webformatURL}')`;
    locationName.innerHTML = `${res.geoname.toponymName}, ${res.geoname.countryName}`;
    seperatorDiv.classList.add("seperator");
    weatherDetails.innerHTML = `
        <div class="deets">
            <img src="https://www.weatherbit.io/static/img/icons/${res.weather.icon}.png" alt="Weather Icon" />
        </div>
        <span class="temperature">
            ${res.weather.temp}°C
        </span>
    `;
    departureDetails.innerHTML = 
    `
        <span class="bold"> Departure: </span> <span class="uppercase">${res.date}</span>
        <br />
    `;

    tripCountdown(res.date);

    return;
}

export { updateUI }