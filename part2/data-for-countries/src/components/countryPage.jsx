import axios from "axios";
import { useEffect, useState, useRef } from "react";

const CountryPage = ({ country }) => {
	const [weatherData, setWeatherData] = useState({});
	const [coordinates, setCoordinates] = useState({});
	useEffect(() => {
		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${
					country.capital
				}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
			)
			.then((response) => {
				setCoordinates({
					lat: response.data[0].lat,
					lon: response.data[0].lon,
				});
			});
	}, [country]);

	useEffect(() => {
		if (Object.keys(coordinates).length === 0) return;
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${
					coordinates.lat
				}&lon=${coordinates.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
			)
			.then((response) => {
				setWeatherData(response.data);
			});
	}, [coordinates]);

	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h3>Languages</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={`${country.name.common} flag`}></img>

			<h3>Weather in {country.capital}</h3>
			<p>
				<b>Temperature:</b>{" "}
				{Object.keys(weatherData).length === 0
					? "Loading..."
					: (weatherData.main.temp - 273.15).toFixed(2)}{" "}
				Celsius
			</p>
			<img
				src={
					Object.keys(weatherData).length === 0
						? ""
						: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
				}
				alt={
					Object.keys(weatherData).length === 0
						? ""
						: `${weatherData.weather[0].description}`
				}
			></img>

			<p>
				<b>Wind:</b>{" "}
				{Object.keys(weatherData).length === 0 ? "" : weatherData.wind.speed}{" "}
				m/s
			</p>
		</div>
	);
};

export { CountryPage };
