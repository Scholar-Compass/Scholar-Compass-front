import axios from 'axios';

const API_END_POINT = import.meta.env.VITE_PUBLIC_API_END_POINT;

const request = axios.create({
  baseURL: API_END_POINT,
  headers: {
    'Content-Type': 'text/plain',
  },
});

export default request;
