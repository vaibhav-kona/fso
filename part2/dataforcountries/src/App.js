import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MAX_LIMIT = 10;

function CapitalWeather({ weatherData }) {
  return (
    <>
      <p><b>temperature: </b>{weatherData.temperature} Celcius</p>
      <img src={weatherData.weather_icons[0]} alt="weather" />
      <p>
        <b>wind: </b>

        {`${weatherData.wind_speed} mph direction ${weatherData.wind_dir}`} Celcius
      </p>
    </>
  )
}

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => <li key={language.name}>{language.name}</li>)}
    </ul>
  );
}

function Country({ country, isTooLessMatches }) {
  const initialWeatherData = {
    temperature: '',
    wind_degree: '',
    wind_dir: '',
    wind_speed: '',
    weather_icons: [],
  };

  const [showDetails, setShowDetails] = useState(false);
  const [weatherData, setWeatherData] = useState(initialWeatherData);

  const KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if ((showDetails || isTooLessMatches)) {
      axios.get(`http://api.weatherstack.com/current?access_key=${KEY}&query=${country.capital}`)
        .then((response) => {
          const current = response.data?.current || {};
          const weatherData = {
            temperature: current.temperature || '',
            wind_degree: current.wind_degree || '',
            wind_dir: current.wind_dir || '',
            wind_speed: current.wind_speed || '',
            weather_icons: current.weather_icons || [],
          };
          setWeatherData(weatherData);
        })
        .catch((err) => {
          console.log('err : ', err);
        })
    }
  }, [showDetails, isTooLessMatches, country.capital, KEY]);

  return (
    <section>
      <h1>
        {country.name}

        {!isTooLessMatches && (
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'hide' : 'show'}
          </button>
        )}
      </h1>

      {(isTooLessMatches || showDetails) && (
        <>
          <p>capital {country.capital}</p>

          <p>population {country.population}</p>

          <h2>languages</h2>
          <Languages languages={country.languages} />

          <img
            src={country.flag}
            style={{ maxWidth: 300 }}
            alt={`country flag for ${country.name}`}
          />

          <h2>{`Weather in ${country.capital}`}</h2>
          <CapitalWeather weatherData={weatherData} />
        </>
      )}
    </section>
  );
}

const FindCountriesForm = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then((response) => {
          if (response.data.length <= MAX_LIMIT) {
            const formattedCountryData = response.data.map(
              (countryData) => ({ data: countryData, shouldShow: false })
            );
            setCountries(formattedCountryData);
          } else {
            setCountries(response.data);
          }
        })
        .catch((err) => {
          setCountries([]);
        })
    }
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const totalCountries = countries.length;
  const isTooManyMatches = totalCountries > MAX_LIMIT;
  const isTooLessMatches = totalCountries <= 1;

  return (
    <div className="App">

      <FindCountriesForm filter={filter} handleFilterChange={handleFilterChange} />

      {isTooManyMatches && <p>Too many matches specify another filter</p>}

      {totalCountries === 0 && <p>No matches found specify another filter</p>}

      {!isTooManyMatches && countries.map((country) => (
        <Country
          key={country.data.numericCode}
          country={country.data}
          isTooLessMatches={isTooLessMatches}
        />
      ))}

    </div>
  );
}

export default App;
