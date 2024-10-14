import { useState } from "react";
import clear from "../assets/clear.png";
import clouds from "../assets/clouds.png";
import humidity from '../assets/humidity.png';
import search from "../assets/search.png";
import winds from "../assets/wind.png";

function Weather() {
    const ApiKey = "8f9737e555c1db5b5892bac3372a96f2";
    const Apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

    const [city, setCity] = useState("");
    const [data, setData] = useState({ temp: "", humidity: "", wind: "", cityname: "", imgset: "" });

    function cityHandler(e) {
        setCity(e.target.value);
    }

    function downHandler(e) {
        if (e.key === "Enter") {
            onClickHandler();
        }
    }

    async function onClickHandler() {
        try {
            let response = await fetch(Apiurl + `${city}&appid=${ApiKey}`);
            let dat = await response.json();

            setData({
                temp: dat.main.temp,
                humidity: dat.main.humidity,
                wind: dat.wind.speed,
                cityname: dat.name,
                imgset: dat.weather[0].main.toLowerCase()
            });
        } catch (error) {
            alert("Please enter a valid city name");
        }
    }

    function getImage(weather) {
        switch (weather) {
            case "clear":
                return clear;
            case "clouds":
                return clouds;
            default:
                return clear;
        }
    }

    return (
        <div className="container flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="input-group flex items-center mb-6">
                <input
                    className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={cityHandler}
                    onKeyDown={downHandler}
                />
                <div onClick={onClickHandler}>
                    <img
                        className="ml-4 w-10 h-10 cursor-pointer hover:bg-blue-200 p-2 rounded-full"
                        src={search}
                        alt="search"
                    />
                </div>
            </div>

            <div className="weather-image mb-6">
                <img src={getImage(data.imgset)} alt="weather condition" className="w-32 h-32" />
            </div>

            <div className="weather-info text-center">
                <h1 className="text-3xl font-bold mb-2">{data.temp ? `${data.temp} °C` : "..."}</h1>
                <h2 className="text-xl mb-2">{data.cityname ? data.cityname : "City"}</h2>

                <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center">
                        <img src={humidity} alt="humidity" className="w-8 h-8" />
                        <div className="ml-2">
                            <h2 className="text-lg">{data.humidity ? `${data.humidity} %` : "..."}</h2>
                            <h3 className="text-sm text-gray-500">Humidity</h3>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src={winds} alt="wind speed" className="w-8 h-8" />
                        <div className="ml-2">
                            <h2 className="text-lg">{data.wind ? `${data.wind} km/h` : "..."}</h2>
                            <h3 className="text-sm text-gray-500">Wind Speed</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
