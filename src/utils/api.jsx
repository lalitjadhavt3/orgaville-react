import axios from 'axios';
export const ENV = 'PROD';
export const BASE_URL =
  ENV == 'PROD' ? 'https://admin.orgaville.com' : 'http://192.168.1.5:8000'; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
export const getImageUrl = imageName => {
  const isProd = ENV === 'PROD';
  // Base URL without /public
  const baseUrl = isProd ? `${BASE_URL}/public` : BASE_URL;
  // Append imageName to base URL
  //console.log(`${baseUrl}${imageName}`);
  return `${baseUrl}${imageName}`;
};
