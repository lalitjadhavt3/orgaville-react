import axios from 'axios';
export const ENV = 'PROD';
export const BASE_URL =
  ENV == 'PROD' ? 'https://admin.orgaville.com' : 'http://192.168.1.5:8000'; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use(
  async config => {
    if (1) {
      config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWEzOTQ1NjlhOTg1YjdmZTYyMWJjNzU2OWJjYjFkYjUxN2Y5NDgyODkxODAyNGI2MTYzOGZjOGE1NmRiZjc0ZGViYWJiZDAwMDkzNWY5NDkiLCJpYXQiOjE3MTk0Njc2NDYuNjA1MTQsIm5iZiI6MTcxOTQ2NzY0Ni42MDUxNDMsImV4cCI6MTc1MTAwMzY0Ni41MDQ4MTMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Q8FIrMi3DDAepCYFZYZ7tNFBUXRO2to7_O3lcWwKmrqvFzwklQAl_eD2lUD7UCOw4xM-M70HkwiPxUuj1Kh1JY9ujXODGtoOxZpawgDWghfX_9OuXABmATGh_6VZm-pRziUFc5_VVUnqw2f13sXXGrBg8PtB-U41muXuh0fBAUIb-rW_5rhEKTX9eFXPi8ro4nONXjV2yb0N7jh7hzwec0nWexUHLg53888exCkxjCrR38FIpJPR_669129wRewCyVFBBU-qm2BmuHdXzlIJ3hv99cOUKmnZ9HbMCnboAArlbLwyOk_dJR8y1WMCvfplBn5VetM7_qZ9leqEAINotZYWgxWLaHvxhb6LGXaqzZHl3-dVtTJr5VyxWKrJTRUJhf5SvnlcuKWe8AP1_Y87Y9u0RUSgFTm9aJxfVSOPqrav4CIz0xdKOelv6pdXXxYfKKAqqcwGI8TCPa-iDCA-p2CFczQY2OCkdCq0Z_4ylEpHoo_leJdKbz0e01aEc_b42a3LviKnX8ygdhMZQY_xqMAVpu74EUy7r7yb8a8eg3oheZLjqEHB3UpBSABWxAu-qiDDOcqqbOpie000OQcI1pjiBteUxZV7GyrY_LiXdIsx4B8kg3WCTRo67OOZYG5Z2AAcglz_RZI0MhdvyycYApLukLkpoIJc-kY8ZBZa8zA`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default api;
export const getImageUrl = imageName => {
  const isProd = ENV === 'PROD';
  // Base URL without /public
  const baseUrl = isProd ? `${BASE_URL}/public` : BASE_URL;
  // Append imageName to base URL
  //console.log(`${baseUrl}${imageName}`);
  return `${baseUrl}${imageName}`;
};
