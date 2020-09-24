import axios from 'axios';
const baseUrl = '/api/persons';


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request
    .then((response) => ({ response: response.data }))
    .catch((err) => {
      return { error: err.response.data.error };
    });
}

const update = (personId, personData) => {
  const request = axios.put(`${baseUrl}/${personId}`, personData);
  return request.then((response) => response.data);
}

const remove = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
}

export default { getAll, create, remove, update };