import axios from 'axios';
import { GET_ALL_CARS } from './routes';

export const fetchCars = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get(GET_ALL_CARS, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const fetchCarDetails = async (id: string) => {
  const response = await axios.get(GET_ALL_CARS, {
    params: { id },
  });
  return response.data.car;
};
