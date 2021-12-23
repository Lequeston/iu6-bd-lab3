import { useState, useEffect } from 'react';
import apiService from '../service/api.service';

const useFetchFlightClassList = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [flightClassList, setFlightClassList] = useState();

  useEffect(() => {
    const getFlightClassList = async () => {
      try{
        const req = await apiService.get('/comfort')
        const body = await req.json();
        const array = body['res'];
        const flightClassList = array.map(element => ({
          key: element['id'],
          name: element['title']
        }))
        setFlightClassList(flightClassList);
      } catch (e) {
        console.error(e);
      }
    }
    getFlightClassList();
  }, [API_URL]);

  return { flightClassList }
};
export default useFetchFlightClassList;
