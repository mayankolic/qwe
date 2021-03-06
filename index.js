const api = {
    key: "153296fe3cf11cca57073070114f002f",
    base: "https://api.openweathermap.org/data/2.5/"
        // base: "Defa153296fe3cf11ult"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);

}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name},${weather.sys.country}`;
    let nowdate = new Date;
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(nowdate);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let weather_ele = document.querySelector('.current .weather');
    weather_ele.innerHTML = weather.weather[0].description;
    let hilo = document.querySelector('.current .hi-low');
    hilo.innerHTML = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}