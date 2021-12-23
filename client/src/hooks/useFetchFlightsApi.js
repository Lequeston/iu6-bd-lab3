import { useState, useEffect, useCallback } from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import dayjs from 'dayjs';
import apiService from '../service/api.service';

const useFetchFlightsApi = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const limit = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState(undefined);
  const [clientToken, setClientToken] = useState();

  const [loginCredentials, setLoginCredentials] = useState();
  const [startCity, setStartCity] = useState(searchParams.get('startPoint'));
  const [endCity, setEndCity] = useState(searchParams.get('endPoint'));
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
  const [maxPage, setMaxPage] = useState(1);
  const [length, setLength] = useState(0);

  const [addFlightId, setAddFlightId] = useState(undefined);

  useEffect(() => {
    try {
      const addFlight = async(flight) => {
        const req = await apiService.post('/order', {
          flightId: flight.id,
          priceId: flight.price.id
        });
      }
      if (addFlightId && flights) {
        const flight = flights.find(flight => addFlightId === flight.id);
        addFlight(flight);
      }
    } catch(e) {
      console.error(e);
    }
  }, [addFlightId, flights]);

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

  useEffect(() => {
    const createSearchParams = () => {
      const searchParams = new URLSearchParams();
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
        .forEach(({key, value}) => value && searchParams.append(key, value));
      navigate(`${location.pathname}?${searchParams}`)
      return searchParams;
    }

    const getFlights = async() => {
      try {
        const res = await apiService.get(`/flight/decoration?${createSearchParams()}`);
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
          },
          airline: value['airlineTitle']
        }));
        setLength(length);
        setMaxPage(maxPage);
        setFlights(flights);
      } catch(e) {
        console.error(e);
      }
    }
    if (!addFlightId) {
      getFlights();
    }
  }, [startCity, endCity, API_URL, page, addFlightId]);

  useEffect(() => {
    // Очень умная и продвинутая авторизация
    setClientToken(1);
  }, [loginCredentials]);

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
    setAddFlightId,
    setPage,
    setStartCity,
    setEndCity,
    setLoginCredentials,
    handleSetPage
  }
}

export default useFetchFlightsApi;