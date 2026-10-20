const NWS_HEADERS = {
    "User-Agent": "jroblesWeatherapp (na, rjosepha@byui.edu)",
    "Accept": "application/geo+json"
}; // geo+json includes additional Geo data. Replace with ld+json and program will fail. 


document.getElementById('fetchForecast').addEventListener('click', fetchForecast);



function fetchForecast() {
    const apiUrl = 'https://api.weather.gov/gridpoints/PIH/127,97/forecast'; // this is an api for Rexburg Idaho.

    fetch(apiUrl, {headers: NWS_HEADERS})
        .then(response => response.json())
        .then(data => {
            document.getElementById('forecastDump').textContent = JSON.stringify(data, null, 2);
            document.getElementById('preID').textContent = "API Response:";
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });

    
}
