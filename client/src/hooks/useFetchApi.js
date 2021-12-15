import { useState, useEffect, useCallback } from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import dayjs from 'dayjs';

const useFetchApi = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const limit = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState(undefined);
  const [clientToken, setClientToken] = useState();
  const [clientOrders, setClientOrders] = useState();

  const [loginCredentials, setLoginCredentials] = useState();
  const [startCity, setStartCity] = useState(searchParams.get('startPoint'));
  const [endCity, setEndCity] = useState(searchParams.get('endPoint'));
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
  const [maxPage, setMaxPage] = useState(1);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await fetch(`${API_URL}/city`);
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

  useEffect(() => {
    const createURL = () => {
      console.log(searchParams);
      const url = new URL(`${API_URL}/flight/decoration`);
      const array = [
        {
          key: 'startPoint',
          value: startCity
        },
        {
          key: 'endPoint',
          value: endCity
        },
        {
          key: 'page',
          value: page
        },
        {
          key: 'limit',
          value: limit
        }
      ];
      array
        .filter(value => value)
        .forEach(({key, value}) => value && url.searchParams.append(key, value));
      navigate(`${location.pathname}?${url.searchParams}`)
      return url;
    }

    const getFlights = async() => {
      try {
        const res = await fetch(createURL());
        const body = await res.json();
        const array = body['res']['array'];
        const length = body['res']['length'];
        const maxPage = (length + limit) / limit;
        const flights = array.map(value => ({
          id: value['id'],
          airArrivalData: dayjs(value['airArrivalData']),
          airDepartureData: dayjs(value['airDepartureData']),
          flightCode: value['flightCode'],
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
          planeType: value['planeType'],
          price: {
            id: value['price']['id'],
            price: value['price']['price'],
          },
          comfortClass: {
            id: value['comfortClass']['id'],
            title: value['comfortClass']['title']
          }
        }));
        setLength(length);
        setMaxPage(maxPage);
        setFlights(flights);
      } catch(e) {
        console.error(e);
      }
    }
    getFlights();
  }, [startCity, endCity, API_URL, page]);

  useEffect(() => {
    // Очень умная и продвинутая авторизация
    setClientToken(1);
  }, [loginCredentials]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`${API_URL}/order`, {
        headers: {
          authorization: 1
        }
      }); 
      const body = await res.json();
      const orders = body['res']['array'];
      setClientOrders(orders)
    }
    getOrders()
  }, [clientToken, setClientOrders, API_URL]);

  const handleSetPage = useCallback(
    (page) => {
      setPage(lastPage => (page < 1 || page > maxPage) ? lastPage : page);
    },
    [maxPage],
  );

  return {
    cities,
    startCity,
    endCity,
    flights,
    limit,
    page,
    length,
    maxPage,
    clientToken,
    clientOrders,
    setPage,
    setStartCity,
    setEndCity,
    setLoginCredentials,
    handleSetPage
  }
}

export default useFetchApi;