import { useState, useEffect } from 'react'
import styles from './weather.module.css'
import axios from 'axios'

const Weather = () => {
	const [weather, setWeather] = useState(null)
	const [city, setCity] = useState('')
	const [loading, setLoading] = useState(false)

	const getWeather = async () => {
		const API_KEY = '54b1407dcc4d3ca0d88eefdeca4dd8a4'
		const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

		try {
			const response = await axios.get(URL)
			setWeather(response.data)
		} catch (error) {
			console.error('Error fetching weather data:', error)
			setWeather(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!city) {
			setWeather(null)
			setLoading(false)
			return
		}

		setLoading(true)

		const debouncingTimeout = setTimeout(() => getWeather(), 1000)

		return () => clearTimeout(debouncingTimeout)

		// eslint-disable-next-line
	}, [city])

	return (
		<div className={`${styles.container}`}>
			<h1 className={styles.title}>Write your country</h1>
			<input className={styles.input} type='text' value={city} onChange={e => setCity(e.target.value)} />
			{loading && <p>Loading...</p>}
			{weather && !loading && (
				<div>
					<p className={styles.city}>{weather.name}</p>
					<p>{weather.weather[0].description}</p>
					<p>{weather.main.temp}°C</p>
					<p>Wind: {weather.wind.speed} m/s</p>
					<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
				</div>
			)}
		</div>
	)
}

export default Weather;