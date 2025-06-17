document.getElementById('fetchForecast').addEventListener('click', fetchForecast);

function fetchForecast() {
    const apiUrl = 'https://api.weather.gov/gridpoints/PIH/127,97/forecast';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('forecastData').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
}
