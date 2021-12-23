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

  const [flights, setFlights] = useState(undefined);
  const [startCity, setStartCity] = useState(searchParams.get('startPoint'));
  const [endCity, setEndCity] = useState(searchParams.get('endPoint'));
  const [date, setDate] = useState();
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
        },
        {
          key: 'date',
          value: date
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
  }, [startCity, endCity, date, API_URL, page, addFlightId]);

  const handleSetPage = useCallback(
    (page) => {
      setPage(lastPage => (page < 1 || page > maxPage) ? lastPage : page);
    },
    [maxPage],
  );

  return {
    startCity,
    endCity,
    flights,
    limit,
    page,
    length,
    maxPage,
    setAddFlightId,
    setPage,
    setStartCity,
    setEndCity,
    setDate,
    handleSetPage
  }
}

export default useFetchFlightsApi;