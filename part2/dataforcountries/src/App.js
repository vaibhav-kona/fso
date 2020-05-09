import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then((response) => {
          console.log('response : ', response.data);
          setCountries(response.data);
        });
    }
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const totalCountries = countries.length;
  const isTooManyMatches = totalCountries > 10;
  const isTooLessMatches = totalCountries <= 1;

  return (
    <div className="App">

      <form>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>

      {isTooManyMatches && <p>Too many matches specify another filter</p>}

      {!isTooManyMatches && !isTooLessMatches && countries.map((country) => (
        <p key={country.numericCode}>{country.name}</p>
      ))}

      {isTooLessMatches && countries.map((country) => {
        return (
          <section key={country.numericCode}>
            <p>{country.name}</p>

            <p>capital {country.capital}</p>

            <p>population {country.population}</p>

            <img
              src={country.flag}
              style={{ maxWidth: 300 }}
              alt={`country flag for ${country.name}`}
            />

            {country.languages.map((language) => (
              <p key={language.name}>{language.name}</p>
            ))}
          </section>
        );
      })}

    </div>
  );
}

export default App;
