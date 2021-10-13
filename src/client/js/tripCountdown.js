const tripCountdown = (to) => {

    const timerDetails = document.querySelector('.timer');
    
    const now = new Date();
    const difference = Date.parse(to) - Date.parse(now);

    //Time Calculation gotten from Sitepoint (https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/)
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));


    timerDetails.innerHTML = `
    <br />
    Your trip is ${days} <span class="bold">Days</span> ${hours} <span class="bold">Hours</span> ${minutes} <span class="bold">Minutes</span> away!
    `;

}

export { tripCountdown }