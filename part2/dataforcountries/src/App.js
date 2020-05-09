import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MAX_LIMIT = 10;

function Country({ country, isTooLessMatches }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <section>
      <p>
        {country.name}

        {!isTooLessMatches && (
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'hide' : 'show'}
          </button>
        )}
      </p>

      {(isTooLessMatches || showDetails) && (
        <>
          <p>capital {country.capital}</p>

          <p>population {country.population}</p>

          <img
            src={country.flag}
            style={{ maxWidth: 300 }}
            alt={`country flag for ${country.name}`}
          />

          {country?.languages.map((language) => (
            <p key={language.name}>{language.name}</p>
          ))}
        </>
      )}
    </section>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then((response) => {
          console.log('response : ', response.data);
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

      <form>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>

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
