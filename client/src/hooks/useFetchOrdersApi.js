import { useState, useEffect } from 'react';
import apiService from '../service/api.service';

const useFetchOrdersApi = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const userId = 1;
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    const getOrders = async () => {
      const req = await apiService.get('/order');
      const body = await req.json();
      const array = body['res']['array'];
      const orders = array.map((value) => ({
        price: value['price'],
        comfortClass: value['comfortClass'],
        planeType: value['planeType'],
        airArrivalData: value['airArrivalData'],
        airDepartureData: value['airDepartureData'],
        route: {
          airArrival: {
            title: value['route']['airArrival']['title'],
            city: value['route']['airArrival']['city']
          },
          airDeparture: {
            title: value['route']['airDeparture']['title'],
            city: value['route']['airDeparture']['city']
          }
        },
        flightNumber: value['flightNumber']
      }));
      setOrders(orders);
    }
    getOrders();
  }, [userId, setOrders, API_URL]);

  return {
    orders
  }
}

export default useFetchOrdersApi;