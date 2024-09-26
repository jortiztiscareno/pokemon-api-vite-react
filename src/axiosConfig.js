import axios from 'axios';

// Crear una instancia de Axios con la URL base de la API de Pokémon
const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // URL base de la API de Pokémon
  timeout: 10000, // Tiempo máximo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar interceptores aquí si los necesitas (opcional)
axiosInstance.interceptors.request.use(
  config => {
    // Puedes modificar el request aquí, como añadir un token de autorización si fuera necesario
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    // Aquí puedes manejar la respuesta exitosa
    return response;
  },
  error => {
    // Aquí puedes manejar errores de la API
    console.error('Error in response:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
