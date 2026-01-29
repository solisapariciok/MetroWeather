document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;

    // Open-Meteo API URL (current weather)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            const weatherCode = data.current_weather.weathercode;

            // Convert weather code to readable condition
            const conditions = {
                0: "Clear sky",
                1: "Mainly clear",
                2: "Partly cloudy",
                3: "Overcast",
                45: "Fog",
                48: "Depositing rime fog",
                51: "Drizzle: Light",
                53: "Drizzle: Moderate",
                55: "Drizzle: Dense",
                56: "Freezing Drizzle: Light",
                57: "Freezing Drizzle: Dense",
                61: "Rain: Slight",
                63: "Rain: Moderate",
                65: "Rain: Heavy",
                66: "Freezing Rain: Light",
                67: "Freezing Rain: Heavy",
                71: "Snow fall: Slight",
                73: "Snow fall: Moderate",
                75: "Snow fall: Heavy",
                77: "Snow grains",
                80: "Rain showers: Slight",
                81: "Rain showers: Moderate",
                82: "Rain showers: Violent",
                85: "Snow showers: Slight",
                86: "Snow showers: Heavy",
                95: "Thunderstorm: Slight or moderate",
                96: "Thunderstorm with slight hail",
                99: "Thunderstorm with heavy hail"
            };

            document.getElementById('temperature').textContent = temp;
            document.getElementById('condition').textContent = conditions[weatherCode] || "Unknown";
        })
        .catch(error => {
            document.getElementById('temperature').textContent = "-";
            document.getElementById('condition').textContent = "Error fetching weather";
            console.error("Error fetching weather data:", error);
        });
});
