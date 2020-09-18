import axios from 'axios';

const getAll = () => {
  const request = axios.get('http://localhost:3002/api/persons');
  return request.then((response) => response.data);
}

const create = (newPerson) => {
  const request = axios.post('http://localhost:3002/api/persons', newPerson);
  return request.then((response) => response.data);
}

const update = (personId, personData) => {
  const request = axios.put(`http://localhost:3002/api/persons/${personId}`, personData);
  return request.then((response) => response.data);
}

const remove = (personId) => {
  const request = axios.delete(`http://localhost:3002/api/persons/${personId}`);
  return request.then((response) => response.data);
}

export default { getAll, create, remove, update };