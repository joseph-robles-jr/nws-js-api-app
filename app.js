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
    'CAR': 'Caribou - Maine',
    'GYX': 'Gray/Portland - Maine',
    'BOX': 'Boston/Norton - Massachusetts',
    'PHI': 'Mount Holly/Philidelphia - New Jersey',
    'ALY': 'Albany - New York',
    'BGM': 'Binghamton - New York',
    'BUF': 'Buffalo - New York',
    'OKX': 'New York/Upton - New York',
    'MHX': 'Newport/Morehead City - North Carolina',
    'RAH': 'Raleigh - North Carolina',
    'ILM': 'Wilmington - Ohio',
    'PBZ': 'Pittsburgh - Pennsylvania',
    'CTP': 'State College - Pennsylvania',
    'CHS': 'charleston - South Carolina',
    'CAE': 'Columbia - South Carolina',
    'GSP': 'Greenville/Spartanburg - South Carolina',
    'BTV': 'Burlington - Vermont',
    'LWX': 'Baltimore/Washington - Virginia',
    'RNK': 'Blacksburg/Roanoke - Virginia',
    'AKQ': 'Wakefield - Virginia',
    'RLX': 'Charleston - West Virginia',
    
    // Pacific Region
    'GUM': 'Guam',
    'HFO': 'Honolulu - Hawaii',
    
    // Southern Region
    'BMX': 'Birmingham - Alabama',
    'HUN': 'Huntsville - Alabama',
    'MOB': 'Mobile/Pensacola - Alabama',
    'LZX': 'Little Rock - Arkansas',
    'JAX': 'Jacksonville - Florida',
    'KEY': 'Key West - Florida',
    'MLB': 'Melbourne - Florida',
    'MFL': 'Miami - Florida',
    'TAE': 'Tallahassee - Florida',
    'TBW': 'Tampa - Florida',
    'FFC': 'Peachtree City/Atlanta - Georgia',
    'LCH': 'Lake Charles - Louisiana',
    'LIX': 'New Orleans/Baton Rouge - Louisian',
    'SHV': 'Shreveport - Louisiana',
    'JAN': 'Jackson - Mississippi',
    'ABQ': 'Albuquerque - New Mexico',
    'OUN': 'Norman/Oklahoma City - Oklahoma',
    'TSA': 'Tulsa - Oklahoma',
    'SJU': 'San Juan - Puerto Rico',
    'MEG': 'Memphis - Tennessee',
    'MRX': 'Morristown/Knoxville - Tennesee',
    'OHX': 'Nashville - Tennessee', 
    'AMA': 'Amarillo - Texas',
    'EWX': 'Austin/San Antonio - Texas',
    'BRO': 'Brownsville - Texas',
    'CRP': 'Corpus Christi - Texas',
    'EPZ': 'El Paso - Texas',
    'FWD': 'Fort Worth/Dallas - Texas',
    'HGX': 'Houston/Galveston - Texas',
    'LUB': 'Lubbock - Texas',
    'MAF': 'Midland/Odessa - Texas',
    'SJT': 'San Angelo - Texas',

    // Wester Region
    'FGZ': 'Flagstaff - Arizona',
    'PSR': 'Phoenix - Arizona',
    'TWC': 'Tucson - Arizona',
    'EKA': 'Eureka - California',
    'LOX': 'Los Angeles/Oxnard - California',
    'STO':'Sacramento - California',
    'SGX': 'San Diego - California',
    'MTR': 'San Fransisco Bay Area/Monterey - California',
    'HNX': 'San Joaquin Valley/Hanford - California',
    'BOI': 'Boise - Idaho',
    'PIH': 'Pocatello - Idaho',
    'BYZ': 'Billings - Montana',
    'GGW': 'Glasgow - Montana',
    'TFX': 'Great Falls - Montana',
    'MSO': 'Missoula - Montana',
    'LKN': 'Elko - Nevada',
    'VEF': 'Las Vegas - Nevada',
    'REV': 'Reno - Nevada',
    'MFR': 'Medford - Oregon',
    'PDT': 'Pendelton - Oregon',
    'PQR': 'Portland - Oregon',
    'SLC': 'Salt Lake City - Utah',
    'SEW': 'Seattle - Washington',
    'OTX': 'Spokane - Washington'

    


}
