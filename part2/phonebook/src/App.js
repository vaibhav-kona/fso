import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

  const handleNameSubmission = (e) => {
    e.preventDefault();

    const present = persons.reduce((p, pr) => pr.name === newName ? true : p, false);

    if (present) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>

      <h2>Add a new</h2>
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

      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>{person.name} {person.number}</p>
          );
        }
        return null;
      })}

    </div>
  )
}

export default App