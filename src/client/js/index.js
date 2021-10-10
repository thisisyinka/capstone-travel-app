import { updateUI } from './updateUI';
const resultsDiv = document.querySelector('.results');
const button = document.getElementById('go');

import axios from 'axios';

const formOptions = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
}

const getData = e => {
    e.preventDefault();
    
        const locationInput = document.getElementById('location').value;
        // const dateValue = document.getElementById('from').value;
    
        axios.post('http://localhost:8001/newtrip', {
            ...formOptions,
            city: locationInput
            // date: dateValue
        })
        .then(function(response) {
            console.log(response);
            updateUI(response.data);
        })
        .catch(function (error) {
            console.log("Something went wrong! Please try again!", error);
        })
};

export {getData}
