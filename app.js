import NWSofficeIDs from "./NWSofficeIDs.js"; // This is the JSON of the office 3 letter ID and their name. Used by the 'getNWSoffice()' function.

document.getElementById('fetchForecast').addEventListener('click', fetchForecast);


async function fetchForecast() {

    try {
        let location = await getLocation();
        const lat = location.lat;
        const lon = location.lon;

        const forecastUrl = await fetchLatLonAPIurl(lat, lon);
        const NWSofficeLocation = await getNWSoffice(forecastUrl);

        const response = await fetch(forecastUrl);
        const data = await response.json();
        displayForecast(data, lat, lon, NWSofficeLocation.officeCallsign || 'Unknown', NWSofficeLocation.officeLocation || 'Unknown');
    }
    catch (error) {
        console.error('Error Fetching forecast:', error);
    }
}

async function getNWSoffice(forecastUrl) {
    // Takes the URL provided by 'fetchLatLonAPIurl()', finds the 3 letter office ID, and looks it up in the 'NWSofficeIDs' array.
    try {

        const parts = forecastUrl.split("/");
        const officeCallsign = parts[4]; // This pulls the office 3 digit ID from the URL.
        const officeLocation = NWSofficeIDs[officeCallsign] || null;

        return { officeCallsign, officeLocation: officeLocation };
    }
    catch (error) {
        console.log('There is an error fiding the NWS office.', error);
        return { officeCallsign: null, officeLocation: null };

    }
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve({ lat, lon });
                },
                (error) => {
                    reject(new Error(`Geolocation error: ${error.message}`));
                },
                { timeout: 10000 }
            );
        } else {
            reject(new Error('Geolocation is not supported or permission was denied.'));
        }
    });
}

async function fetchLatLonAPIurl(lat, lon) {
    const apiurl = `https://api.weather.gov/points/${lat},${lon}`;

    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.properties.forecast;
}

function convertNumberToMonth(monthInt) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (Number.isInteger(monthInt) && monthInt <= 12 && monthInt >= 1) {
        return months[monthInt];
    }
    else if (!Number.isInteger(monthInt)) {
        throw new Error(`${monthInt} is NaN. Please enter an integer.`);

    }
    else if (Number.isInteger(monthInt) && (!monthInt <= 12 || !monthInt >= 1)) {

        throw new Error(`${monthInt} must be between 1 and 12.`);
    }
    else {
        throw new Error(`${monthInt} produced an unknown error. Please provide an integer between 1 and 12.`);
    }
}

function createForecastDateString(data) {
    let dateStringObj = {
        month: "",
        day: "",
        year: "",
        hour: "",
        minute: "",
        seconds: ""
    };

    const properties = data.properties;
    var rawDate = new Date(properties.generatedAt);
    var parsedYear = rawDate.getFullYear().toString();
    var parsedDay = rawDate.getDate().toString();
    var parsedHour = rawDate.getHours().toString();
    var parsedMinute = rawDate.getMinutes().toString();
    var parsedSeconds = rawDate.getSeconds().toString();

    var month = rawDate.getMonth(); //needs to be converted from month number to month name.
    try {
        month = convertNumberToMonth(month);
    }
    catch (error) {
        console.error("Error Parsing month: ", error.message);

        if (Number.isInteger(month)) {
            month = `${month} - `;
        }
        else {
            month = '';
        }
    }

    dateStringObj.month = month;
    dateStringObj.day = parsedDay;
    dateStringObj.year = parsedYear;
    dateStringObj.hour = parsedHour;
    dateStringObj.minute = parsedMinute;
    dateStringObj.seconds = parsedSeconds;

    return dateStringObj;
}

function displayForecast(data, lat, lon, NWSofficeCallsign, NWSofficeLocation) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous content

    const weatherProperties = document.getElementById('weatherProperties');
    weatherProperties.innerHTML = '';

    const properties = data.properties;
    let createForecastDateJSON = createForecastDateString(data);

    weatherProperties.innerHTML = `<h4> Forecast at your location (${lat}, ${lon}) from NWS Office ${NWSofficeLocation} (${NWSofficeCallsign})</h4>
        <h4>Weather Units: ${properties.units.toUpperCase()}</h4>
        <h4>Forecast generated on ${createForecastDateJSON.month} ${createForecastDateJSON.day}, ${createForecastDateJSON.year} at ${createForecastDateJSON.hour}:${createForecastDateJSON.minute}:${createForecastDateJSON.seconds} UTC</h4>`;

    const periods = data.properties.periods;

    periods.forEach(period => {
        var precipitationUnit = '';
        if (period.probabilityOfPrecipitation.unitCode === 'wmoUnit:percent') {
            precipitationUnit = '%';
        }
        else {
            precipitationUnit = '';
        };
        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
            <h2>${period.name}</h2> <img class="weatherimg" alt="weatherimg" src=${period.icon}> </img>
            <div class="forecastText">
            <p><strong>Temperature:</strong> ${period.temperature} ${period.temperatureUnit}</p>
            <p><strong>Wind:</strong> ${period.windSpeed} ${period.windDirection}</p>
            <p><strong>Precipitation Probability:</strong> ${period.probabilityOfPrecipitation.value}${precipitationUnit}</p>
            <p><strong>Forecast:</strong> ${period.detailedForecast}</p>
            </div>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}