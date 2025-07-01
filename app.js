document.getElementById('fetchForecast').addEventListener('click', fetchForecast);



async function fetchForecast() {

    try {
        let location = await getLocation();
        const lat = location.lat;
        const lon = location.lon;

        const forecastUrl = await fetchLatLonAPIurl(lat, lon);

        const response = await fetch(forecastUrl);
        const data = await response.json();
        displayForecast(data, lat, lon);


        getNWSoffice();

    }
    catch (error) {
        console.error('Error Fetching forecast:', error);
    }
}

async function getNWSoffice() {
    try {
        const location = await getLocation();
        const forecastAPI = await fetchLatLonAPIurl(location.lat, location.lon);

        const parts = forecastAPI.split("/");
        const officeCallsign = parts[4]; // This pulls the office 3 digit ID from the URL.
        try{
        const officeLocation = NWSofficeIDs[officeCallsign];
        console.log(officeCallsign);
        console.log(officeLocation);
        return officeLocation;
        }
        catch {
            return officeCallsign;
        }
    }
    catch {
        (error =>
            console.log('There is an error fiding the NWS office.', error)
        )
    }

}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({ lat, lon });
            },
                (error) => {
                    reject(error);
                }
            );

        } else {
            reject(new Error('Geolocation is not allowed by user.'));
        }

    })
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
    monthInt = monthInt - 1;
    if (Number.isInteger(monthInt) && monthInt <= 12 && monthInt >= 1) {
        return months[monthInt - 1];
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

function displayForecast(data, lat, lon) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous content

    const weatherProperties = document.getElementById('weatherProperties');
    weatherProperties.innerHTML = '';

    const properties = data.properties;
    let createForecastDateJSON = createForecastDateString(data);


    weatherProperties.innerHTML = `<h4> Forecast at your location (${lat}, ${lon})</h4>
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
            <p><strong>precipitation Probability:</strong> ${period.probabilityOfPrecipitation.value}${precipitationUnit}</p>
            <p><strong>Forecast:</strong> ${period.detailedForecast}</p>
            </div>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

const NWSofficeIDs = {
    // office locations sourced from 'https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices'
    
    // Alaska Region
    'AFC': 'Anchorage Alaska',
    'AFG': 'Fairbanks Alaska',
    'AJK': 'Juneau Alaska',

    // Central Region
    'BOU': 'Denver/Boulder - Colorado',
    'GJT': 'Grand Junction - Colorado',
    'PUB': 'Pueblo - Colorado',
    'LOT': 'Chicago - Illinois',
    'ILX': 'Lincoln - Illinois',
    'IND': 'Indianapolis - Indiana',
    'IWX': 'Northern Indiana - Indiana',
    'DVN': 'Davenport/Quad Cities Iowa',
    'DMX': 'Des Moines - Iowa',
    'DDC': 'Dodge City - Kansas',
    'GLD': 'Goodland - Kansas',
    'TOP': 'Topeka - Kansas',
    'ICT': 'Wichita - Kansas',
    'JKL': 'Jackson - Kentucky',
    'LMK': 'Louisville - Kentucky',
    'PAH': 'Paducah - Kentucky',
    'DTX': 'Detroit/Pontiac - Michigan',
    'APX': 'Gaylord - Michigan',
    'GRR': 'Grand Rapids - Michigan',
    'MQT': 'Marquette - Michigan',
    'DLH': 'Duluth - Minnesota',
    'MPX': 'Chanhassen/Twin Cities - Minnesota',
    'EAX': 'Kansas City/Pleasant Hill - Missouri',
    'SGF': 'Springfield - Missouri',
    'LSX': 'St. Louis - Missouri',
    'GID': 'Hastings - Nebraska',
    'LBF': 'North Platte - Nebraska',
    'OAX': 'Omaha/Valley - Nebraska',
    'BIS': 'Bismarck - North Dakota',
    'FGF': 'Grand Forks - North Dakota',
    'ABR': 'Aberdeen - South Dakota',
    'UNR': 'Rapid City - South Dakota',
    'FSD': 'Sioux Falls - South Dakota',
    'GRB': 'Green Bay - Wisconsin',
    'ARX': 'La Crosse - Wisconsin',
    'MKX': 'Milwaukee/Sullivan - Wisconsin',
    'CYS': 'Cheyenne - Wyoming',
    'RIW': 'Riverton - Wyoming',

    // Easter Region 


    // Wester Region
    'PIH': 'Pocatello - Idaho',
    'BOI': 'Boise - Idaho'
}
