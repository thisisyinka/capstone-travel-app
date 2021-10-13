const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const cors = require('cors');
app.use(cors());


const axios = require('axios').default;

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
})

const port = 8001;
const server = app.listen(port, () => console.log(`Server successfully running on port ${port}`));


app.post('/newtrip', async (req, res) => {
    try {
        //GEONAMES
    const baseURL = "http://api.geonames.org/searchJSON?";
    const username = process.env.GEONAMES_USERNAME;
    const location = req.body.city;
    const departureDate = req.body.date;

    //WEATHERBIT
    const weatherbitBaseURL = "http://api.weatherbit.io/v2.0/current?";
    const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;

    //PIXABAY
    const pixabayBaseURL = "https://pixabay.com/api/";
    const pixabayApiKey = process.env.PIXABAY_API_KEY;

    //Get Geonames data
    const { data: geonamesData } = await axios.get(`${baseURL}q=${location}&maxRows=1&username=${username}`);

    const [geoname] = geonamesData.geonames;

    //Get Weatherbit data
    const { data: weatherbitData } = await axios.get(`${weatherbitBaseURL}lat=${geoname.lat}&lon=${geoname.lng}&key=${weatherbitApiKey}`);

    const weatherbitObject = weatherbitData.data[0];

    const weather = {
        ...weatherbitObject.weather,
        temp: weatherbitObject.temp
    }

    //Get pixabay data
    const { data: pixabayData } = await axios.get(`${pixabayBaseURL}?key=${pixabayApiKey}&q=${location}&category=places&orientation=horizontal&image_type=photo`);

    res.send({
        geoname,
        weather,
        picture: pixabayData?.hits?.[0] || {},
        date: departureDate
    }).status(200);
    } catch (error) {
        res.send(error).status(500);
    }

})