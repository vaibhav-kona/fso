import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const NotificationMessage = ({ message, type }) => {
  let clsName = '';

  if (type === 'success') clsName = 'success-message';

  if (type === 'error') clsName = 'error-message';

  if (!type || !message) return null;

  return (
    <div className={clsName}>
      {message}
    </div>
  )
}

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

const Persons = ({ persons, filter, handlePersonDeletion }) => (
  <>
    {persons.map((person) => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <Person
            key={person.name}
            person={person}
            handlePersonDeletion={handlePersonDeletion}
          />
        );
      }

      return null;
    })}
  </>
);

const Person = ({ person, handlePersonDeletion }) => {
  return (
    <p>
      <span>{person.name} {person.number}</span>
      <button onClick={() => handlePersonDeletion(person)}>delete</button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({ message: '', type: '' })

  useEffect(() => {
    personsService.getAll().then((responseData) => {
      setPersons(responseData);
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

  const fetchAllPersons = () => {
    personsService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }

  const clearForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const handlePersonSubmission = (e) => {
    e.preventDefault();

    const confirmationMessage = `${newName} is already added to phonebook, replace the old number with new one?`;

    const personPresentInCurrentData = persons.find(p => p.name === newName);

    const person = { name: newName, number: newNumber };

    if (personPresentInCurrentData) {
      if (window.confirm(confirmationMessage)) {
        personsService.update(personPresentInCurrentData.id, person)
          .then(() => {
            setNotificationMessage({ message: `Added ${newName}`, type: 'success' });
            clearNotificationMessage();
            fetchAllPersons();
          })
          .catch((err) => {
            window.alert(err);
          })

        clearForm();
      }
    } else {
      personsService.create(person)
        .then(() => {
          setNotificationMessage({ message: `Updated ${newName}`, type: 'success' });
          clearNotificationMessage();
          fetchAllPersons();
        })
        .catch((err) => {
          setNotificationMessage({ message: err, type: 'error' });
          clearNotificationMessage();
        })

      clearForm();
    }
  }

  const handlePersonDeletion = (person) => {
    if (!person) {
      throw new Error('person is not valid');
    }
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id)
        .then(() => {
          personsService.getAll().then((responseData) => { setPersons(responseData); })
        })
    }
  }

  const clearNotificationMessage = () => {
    setTimeout(() => { setNotificationMessage({ message: '', type: '' }); }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationMessage message={notificationMessage.message} type={notificationMessage.type} />

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

      <Persons
        persons={persons}
        filter={filter}
        handlePersonDeletion={handlePersonDeletion}
      />

    </div>
  )
}

export default App