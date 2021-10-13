import { updateUI } from './updateUI';
import { printTrip } from "./printTrip";
const resultsDiv = document.querySelector('.results');
const button = document.getElementById('go');

import axios from 'axios';

const formOptions = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
}

const getTravelData = e => {
    e.preventDefault();
    
        const locationInput = document.getElementById('location').value;
        const dateInput = document.getElementById('to').value;
    
        axios.post('http://localhost:8001/newtrip', {
            ...formOptions,
            city: locationInput,
            date: dateInput
        })
        .then(function(response) {
            console.log(response);
            updateUI(response.data);
        })
        .catch(function (error) {
            console.log("Something went wrong! Please try again!", error);
        })
};

button.addEventListener("click", getTravelData);
printTrip();

export { getTravelData }
