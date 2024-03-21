import axios from 'axios';
const ENV = 'TEST';
export const BASE_URL =
  ENV == 'PROD' ? 'https://admin.orgaville.com' : 'http://192.168.1.5:8000/'; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
