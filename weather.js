const CITYINPUT=document.querySelector(".city-input");
const SEARCHBUTTON=document.querySelector(".search-btn");
const LOCATIONBUTTON=document.querySelector(".location-btn");
const CURRENTWEATHERDIV=document.querySelector(".current-weather");
const WEATHERCARDSDIV=document.querySelector(".weather-cards");

const API_KEY="823fda755acd09ca98a338ea93ca8b38";

const createWeatherCard=(cityName,weatherItem,index)=>{
    if(index===0){
        return `<div class="details">
        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
    </div>
    <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h6>${weatherItem.weather[0].description}</h6>
    </div>`;
    }else{
        return `
            <li class="card">
            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
            <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
            <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
            <h6>Humidity: ${weatherItem.main.humidity}%</h6>
            </li>
        `
    }
}

const getWeatherDetails=(cityName,latitude,longitude)=>{
    const WEATHER_API_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    fetch(WEATHER_API_URL).then(response=>response.json()).then(data=>{
        const uniqueForecastDays=[];
        const fiveDaysForecast=data.list.filter(forecast=>{
            const forecastDate=new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        })

        CITYINPUT.value="";
        CURRENTWEATHERDIV.innerHTML="";
        WEATHERCARDSDIV.innerHTML="";

        fiveDaysForecast.forEach((weatherItem,index)=>{
            const HTML=createWeatherCard(cityName,weatherItem,index)
            if(index===0){
                CURRENTWEATHERDIV.insertAdjacentHTML("beforeend",HTML);
            }else{
                WEATHERCARDSDIV.insertAdjacentHTML("beforeend",HTML);
            }
        })
    }).catch(()=>{
        alert("an error occurred while fetching the weather forecast!")
    })
}

const getCityCoordinates=()=>{
    const cityName=CITYINPUT.value.trim();
    if(cityName==="")return;
    const API_URL=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(API_URL).then(response=>response.json()).then(data=>{
        if(!data.length)return alert(`No coordinates found for ${cityName}`)
        const {lat,lon,name}=data[0];

        getWeatherDetails(name, lat, lon);
    }).catch(()=>{
        alert("an error occured while fetching the coordinates")
    })
}

const getUserCoordinates=()=>{
    navigator.geolocation.getCurrentPosition(
        position=>{
            const {latitude,longitude}=position.coords
            const API_URL=`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            fetch(API_URL).then(response=>response.json()).then(data=>{
                const {name}=data[0];

                getWeatherDetails(name,latitude,longitude);
            }).catch(()=>{
                alert("an error occurred while fetching the coordinates")
            });
        },
        error =>{
            if(error.code===error.PERMISSION_DENIED){
                alert("Geolocation request denied. Please reset location permission to grant access again.")
            }else{
                alert("Geolocation request error. Please reset location permission")
            }
        }
    )
}

LOCATIONBUTTON.addEventListener("click",getUserCoordinates);
SEARCHBUTTON.addEventListener("click",getCityCoordinates);
CITYINPUT.addEventListener("keyup",e=>e.key==="Enter" && getCityCoordinates())