import { useState, useEffect, useCallback } from 'react';

import dayjs from 'dayjs';

const useFetchApi = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const limit = 10;


  const [cites, setCites] = useState([]);
  const [flights, setFlights] = useState(undefined);

  const [startCity, setStartCity] = useState(undefined);
  const [endCity, setEndCity] = useState(undefined);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const getCites = async () => {
      try {
        const res = await fetch(`${API_URL}/city`);
        const body = await res.json();
        const result = body['res'];
        const cites = result.map(value => ({
          id: value['id'],
          title: value['title'],
          country: value['country']
        }));
        setCites(cites);
      } catch(e) {
        console.error(e);
      }
    }
    getCites();
  }, [API_URL]);

  useEffect(() => {
    const createUrl = () => {
      const array = [
        startCity && `startPoint=${startCity}`,
        endCity && `endPoint=${endCity}`,
        `page=${page}`,
        `limit=${limit}`
      ]
      .filter(value => value)
      .map((value, iter) => iter === 0 ? `?${value}` : `&${value}`);
      return `${API_URL}/flight/decoration${array.join('')}`;
    }

    const getFlights = async() => {
      try {
        const res = await fetch(createUrl());
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

  const handleSetPage = useCallback(
    (page) => {
      setPage(lastPage => (page < 1 || page > maxPage) ? lastPage : page);
    },
    [maxPage],
  );

  return {
    cites,
    flights,
    limit,
    page,
    length,
    maxPage,
    setPage,
    setStartCity,
    setEndCity,
    handleSetPage
  }
}

export default useFetchApi;