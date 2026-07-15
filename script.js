const apiKey = "7d8688756c164d03aa463318260407";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weather").style.display = "none";
            document.getElementById("error").innerHTML = data.error.message;
            return;
        }

        document.getElementById("error").innerHTML = "";
        document.getElementById("weather").style.display = "block";

        document.getElementById("cityName").innerHTML =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temperature").innerHTML =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").innerHTML =
            data.current.condition.text;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("feelsLike").innerHTML =
            `${data.current.feelslike_c}°C`;

        document.getElementById("humidity").innerHTML =
            `${data.current.humidity}%`;

        document.getElementById("wind").innerHTML =
            `${data.current.wind_kph} km/h`;

        document.getElementById("time").innerHTML =
            data.location.localtime;

    } catch (error) {

        document.getElementById("weather").style.display = "none";
        document.getElementById("error").innerHTML =
            "Something went wrong. Please try again.";

        console.log(error);
    }
}