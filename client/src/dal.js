import axios from 'axios';

export default async message => {
  const resp = await axios.post('http://localhost:3001', message);
  return resp.data;
}