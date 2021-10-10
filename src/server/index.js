const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const cors = require('cors');
app.use(cors());


const axios = require('axios').default;
const { response } = require('express')

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
})

const port = 8001;
const server = app.listen(port, () => console.log(`Server successfully running on port ${port}`));


app.post('/newtrip', (req, res) => {
    //GEONAMES
    const baseURL = "http://api.geonames.org/searchJSON?";
    const username = process.env.GEONAMES_USERNAME;
    const location = req.body.city;
    const date = req.body.date;

    //WEATHERBIT
    const weatherbitBaseURL = "http://api.weatherbit.io/v2.0/current?";
    const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;

    //PIXABAY
    const pixabayBaseURL = "https://pixabay.com/api/";
    const pixabayApiKey = process.env.PIXABAY_API_KEY;

    async function fetchDetails() {
        try {
            const response = await axios.get(`${baseURL}q=${location}&maxRows=1&username=${username}`);
            const geonames = response.data;

            const weatherbitFetch = await axios.get(`${weatherbitBaseURL}lat=${geonames.lat}&lon=${geonames.lon}&key=${weatherbitApiKey}`)
            const weatherbitResult = weatherbitFetch.data;
            return weatherbitResult;
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    fetchDetails();
    
    axios.get(`${pixabayBaseURL}?key=${pixabayApiKey}&q=${location}&category=places&orientation=horizontal&image_type=photo`)
        .then(function (response) {
            console.log(response);
            res.send(response.data).status(200);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error).status(500);
        })



    // axios.get(`${baseURL}q=${location}&maxRows=1&username=${username}`)
    //     .then(function (response) { 
    //         console.log(response.data);
    //         // res.send(response.data).status(200);
    //         // const geonamesResults = response.data;
    //         // return geonamesResults;
    //         return res.send({geonames: response.data});
    //     })
    //     .then(function (response) {
    //         return axios.get(`${weatherbitBaseURL}lat=${geonames.lat}&lon=${geonames.lng}&key=${weatherbitApiKey}`);
    //     })
    //     .catch(function (error) {
    //         console.log('Nothing happened', error);
    //         res.send(error).status(500);
    //     });


    // axios.get(`${weatherbitBaseURL}lat=${geonames.lat}&lon=${geonames.lng}&key=${weatherbitApiKey}`)
    //     .then(function (response) {
    //         console.log(response.data);
    //         // res.send(response.data).status(200);
    //         const weatherbitResults = res.send({
    //             temp: response.data.temp,
    //             weather: response.data.weather.description,
    //             icon: response.data.weather.icon
    //         })
    //         return weatherbitResults;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         res.send(error).status(500);
    //     })

})