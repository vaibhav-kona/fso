import React, { useState, useEffect } from 'react'
import axios from 'axios';

const FilterForm = ({ filter, handleFilterChange }) => (
  <>
    <form>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  </>
);

const NewPersonForm = (
  { newName, newNumber, handleNameChange, handleNumberChange, handleNameSubmission }
) => (
    <>
      <form onSubmit={handleNameSubmission}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );

const Persons = ({ persons, filter }) => (
  <>
    {persons.map((person) => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <Person key={person.name} person={person} />
        );
      }

      return null;
    })}
  </>
);

const Person = ({ person }) => <p>{person.name} {person.number}</p>;

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      });
  }, []);

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  const handlePersonSubmission = (e) => {
    e.preventDefault();

    const present = persons.reduce((p, pr) => pr.name === newName ? true : p, false);

    if (present) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      axios.post('http://localhost:3001/persons', newPerson)
        .then((response) => {
          console.log('response.data : ', response.data);
          axios.get('http://localhost:3001/persons')
            .then((response) => {
              setPersons(response.data);
            });
        })
        .catch((err) => {
          window.alert(err);
        })

      // setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <NewPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleNameSubmission={handlePersonSubmission}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />

    </div>
  )
}

export default App