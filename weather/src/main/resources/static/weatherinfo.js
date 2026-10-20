{
  "@context": [
    "https://geojson.org/geojson-ld/geojson-context.jsonld",
    {
      "@version": "1.1",
      "wx": "https://api.weather.gov/ontology#",
      "geo": "http://www.opengis.net/ont/geosparql#",
      "unit": "http://codes.wmo.int/common/unit/",
      "@vocab": "https://api.weather.gov/ontology#"
    }
  ],
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -112.0185,
          43.972
        ],
        [
          -112.0222,
          43.9934
        ],
        [
          -112.0519,
          43.9906999
        ],
        [
          -112.04820000000001,
          43.9692999
        ],
        [
          -112.0185,
          43.972
        ]
      ]
    ]
  },
  "properties": {
    "units": "us",
    "forecastGenerator": "BaselineForecastGenerator",
    "generatedAt": "2025-06-17T19:48:41+00:00",
    "updateTime": "2025-06-17T19:38:30+00:00",
    "validTimes": "2025-06-17T13:00:00+00:00/P7DT15H",
    "elevation": {
      "unitCode": "wmoUnit:m",
      "value": 1542.8976
    },
    "periods": [
      {
        "number": 1,
        "name": "This Afternoon",
        "startTime": "2025-06-17T13:00:00-06:00",
        "endTime": "2025-06-17T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 79,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 4
        },
        "windSpeed": "10 mph",
        "windDirection": "W",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 79. West wind around 10 mph."
      },
      {
        "number": 2,
        "name": "Tonight",
        "startTime": "2025-06-17T18:00:00-06:00",
        "endTime": "2025-06-18T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 48,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 4
        },
        "windSpeed": "7 to 10 mph",
        "windDirection": "ESE",
        "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
        "shortForecast": "Partly Cloudy",
        "detailedForecast": "Partly cloudy. Low around 48, with temperatures rising to around 50 overnight. East southeast wind 7 to 10 mph."
      },
      {
        "number": 3,
        "name": "Wednesday",
        "startTime": "2025-06-18T06:00:00-06:00",
        "endTime": "2025-06-18T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 84,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 0
        },
        "windSpeed": "6 to 18 mph",
        "windDirection": "SSE",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny. High near 84, with temperatures falling to around 82 in the afternoon. South southeast wind 6 to 18 mph, with gusts as high as 29 mph."
      },
      {
        "number": 4,
        "name": "Wednesday Night",
        "startTime": "2025-06-18T18:00:00-06:00",
        "endTime": "2025-06-19T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 51,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 0
        },
        "windSpeed": "8 to 18 mph",
        "windDirection": "SSE",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 51. South southeast wind 8 to 18 mph, with gusts as high as 29 mph."
      },
      {
        "number": 5,
        "name": "Juneteenth",
        "startTime": "2025-06-19T06:00:00-06:00",
        "endTime": "2025-06-19T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 92,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 2
        },
        "windSpeed": "7 to 17 mph",
        "windDirection": "SE",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 92. Southeast wind 7 to 17 mph, with gusts as high as 28 mph."
      },
      {
        "number": 6,
        "name": "Thursday Night",
        "startTime": "2025-06-19T18:00:00-06:00",
        "endTime": "2025-06-20T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 53,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 9
        },
        "windSpeed": "7 to 22 mph",
        "windDirection": "E",
        "icon": "https://api.weather.gov/icons/land/night/wind_bkn?size=medium",
        "shortForecast": "Mostly Cloudy",
        "detailedForecast": "Mostly cloudy, with a low around 53."
      },
      {
        "number": 7,
        "name": "Friday",
        "startTime": "2025-06-20T06:00:00-06:00",
        "endTime": "2025-06-20T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 84,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 2
        },
        "windSpeed": "7 to 25 mph",
        "windDirection": "S",
        "icon": "https://api.weather.gov/icons/land/day/wind_sct?size=medium",
        "shortForecast": "Mostly Sunny",
        "detailedForecast": "Mostly sunny, with a high near 84."
      },
      {
        "number": 8,
        "name": "Friday Night",
        "startTime": "2025-06-20T18:00:00-06:00",
        "endTime": "2025-06-21T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 47,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 4
        },
        "windSpeed": "10 to 26 mph",
        "windDirection": "SSW",
        "icon": "https://api.weather.gov/icons/land/night/wind_sct?size=medium",
        "shortForecast": "Partly Cloudy",
        "detailedForecast": "Partly cloudy, with a low around 47."
      },
      {
        "number": 9,
        "name": "Saturday",
        "startTime": "2025-06-21T06:00:00-06:00",
        "endTime": "2025-06-21T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 72,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 8
        },
        "windSpeed": "13 to 28 mph",
        "windDirection": "SSW",
        "icon": "https://api.weather.gov/icons/land/day/wind_few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 72."
      },
      {
        "number": 10,
        "name": "Saturday Night",
        "startTime": "2025-06-21T18:00:00-06:00",
        "endTime": "2025-06-22T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 39,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 15
        },
        "windSpeed": "12 to 25 mph",
        "windDirection": "SSW",
        "icon": "https://api.weather.gov/icons/land/night/rain_showers,20/wind_sct?size=medium",
        "shortForecast": "Slight Chance Rain Showers then Partly Cloudy",
        "detailedForecast": "A slight chance of rain showers before midnight. Partly cloudy, with a low around 39. Chance of precipitation is 20%."
      },
      {
        "number": 11,
        "name": "Sunday",
        "startTime": "2025-06-22T06:00:00-06:00",
        "endTime": "2025-06-22T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 64,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 21
        },
        "windSpeed": "10 to 17 mph",
        "windDirection": "SSW",
        "icon": "https://api.weather.gov/icons/land/day/sct/rain_showers,20?size=medium",
        "shortForecast": "Mostly Sunny then Slight Chance Rain Showers",
        "detailedForecast": "A slight chance of rain showers after noon. Mostly sunny, with a high near 64. Chance of precipitation is 20%."
      },
      {
        "number": 12,
        "name": "Sunday Night",
        "startTime": "2025-06-22T18:00:00-06:00",
        "endTime": "2025-06-23T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 36,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 9
        },
        "windSpeed": "8 to 17 mph",
        "windDirection": "SE",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 36."
      },
      {
        "number": 13,
        "name": "Monday",
        "startTime": "2025-06-23T06:00:00-06:00",
        "endTime": "2025-06-23T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 72,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 8
        },
        "windSpeed": "7 to 12 mph",
        "windDirection": "SE",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 72."
      },
      {
        "number": 14,
        "name": "Monday Night",
        "startTime": "2025-06-23T18:00:00-06:00",
        "endTime": "2025-06-24T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 43,
        "temperatureUnit": "F",
        "temperatureTrend": "",
        "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 2
        },
        "windSpeed": "8 to 14 mph",
        "windDirection": "S",
        "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
        "shortForecast": "Partly Cloudy",
        "detailedForecast": "Partly cloudy, with a low around 43."
      }
    ]
  }
}