document.getElementById('fetchForecast').addEventListener('click', fetchForecast);

function fetchForecast() {
    const apiUrl = 'https://api.weather.gov/gridpoints/PIH/127,97/forecast'; // Pocatello 
    // const apiUrl = 'https://api.weather.gov/gridpoints/EPZ/31,80/forecast'; //El Paso


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
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

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous content

    const weatherProperties = document.getElementById('weatherProperties');
    weatherProperties.innerHTML = '';

    const properties = data.properties;
    // var rawDate = new Date(properties.generatedAt);
    // var year = rawDate.getFullYear().toString();
    // var month = rawDate.getMonth(); //needs to be converted from month number to month name.
    // var day = rawDate.getDate().toString();
    // var hour = rawDate.getHours().toString();
    // var minute = rawDate.getMinutes().toString();
    // var seconds = rawDate.getSeconds().toString();

    // try {
    //     month = convertNumberToMonth(month);
    // }
    // catch (error) {
    //     console.error("Error Parsing month: ", error.message);

    //     if (Number.isInteger(month)) {
    //         month = `${month} - `;
    //     }
    //     else {
    //         month = '';
    //     }
    // }

    let createForecastDateJSON = createForecastDateString(data);


    weatherProperties.innerHTML = `<h4>Weather Units: ${properties.units.toUpperCase()}<h4>
        <h4>Forecast generated on ${createForecastDateJSON.month} ${createForecastDateJSON.day}, ${createForecastDateJSON.year} at ${createForecastDateJSON.hour}:${createForecastDateJSON.minute}:${createForecastDateJSON.seconds} UTC</h4>`;

    const periods = data.properties.periods;

    periods.forEach(period => {
        var percipitationUnit = '';
        if (period.probabilityOfPrecipitation.unitCode === 'wmoUnit:percent') {
            percipitationUnit = '%';
        }
        else {
            percipitationUnit = '';
        };
        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
            <h2>${period.name}</h2> <img class="weatherimg" alt="weatherimg" src=${period.icon}> </img>
            <p><strong>Temperature:</strong> ${period.temperature} ${period.temperatureUnit}</p>
            <p><strong>Wind:</strong> ${period.windSpeed} ${period.windDirection}</p>
            <p><strong>Percipitation Probability:</strong> ${period.probabilityOfPrecipitation.value}${percipitationUnit}</p>
            <p><strong>Forecast:</strong> ${period.detailedForecast}</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}
