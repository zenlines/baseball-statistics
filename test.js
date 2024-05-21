const axios = require('axios');

const requestData = {
    "pitch_date": "2023-10-01",
    "highest_recorded_mph": 95.5,
    "total_pitches": 100,
    "total_strikes": 60,
    "first_pitch_strikes": 20,
    "fastball_strikes": 30,
    "curveball_strikes": 20,
    "changeup_strikes": 10,
    "batters_faced": 25,
    "hits": 5,
    "walks": 3,
    "strikeouts": 8,
    "innings_pitched": 7,
    "total_fastballs": 50,
    "total_curveballs": 30,
    "total_changeups": 20
};

axios.post('http://localhost:3001/calculate', requestData, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response data:', response.data);
})
.catch(error => {
    console.error('Error:', error);
});
