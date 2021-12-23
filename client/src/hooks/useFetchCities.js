import { useState, useEffect } from 'react';
import apiService from '../service/api.service';

const useFetchCities = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await apiService.get('/city');
        const body = await res.json();
        const result = body['res'];
        const cities = result.map(value => ({
          id: value['id'],
          title: value['title'],
          country: value['country']
        }));
        setCities(cities);
      } catch(e) {
        console.error(e);
      }
    }
    getCities();
  }, [API_URL]);

  return { cities };
};

export default useFetchCities;
