import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';
import CitySelect from '../../components/CitySelect';
import DatePicker from '../../components/DatePicker';
import PassengerSelect from '../../components/PassengerSelect';
import FlightList from '../../components/FlightList';

import useFetchFlightsApi from '../../hooks/useFetchFlightsApi';
import useFetchCities from '../../hooks/useFetchCities';
import useFetchFlightClassList from '../../hooks/useFetchFlightClassList';

import './Main.css';

const { Content } = Layout;
const { Text } = Typography;

const Main = ({
}) => {
  const [passengerAmount, setPassengerAmount] = useState();
  const [flightClass, setFlightClass] = useState()
  const [roundtrip, setRoundtrip] = useState(false);
  const [dates, setDates] = useState();
  const [departureCity, setDepartureCity] = useState();
  const [arrivalCity, setArrivalCity] = useState();

  const {
    flights: dirFlights,
    limit: dirLimit,
    page: dirPage,
    length: dirLength,
    setEndCity: setDirEndCity,
    setStartCity: setDirStartCity,
    setDate: setDirDate,
    setAddFlightId: setDirAddFlightId,
    setFlightClass: setDirFlightClass,
    handleSetPage: setDirHandleSetPage
  } = useFetchFlightsApi();

  const {
    flights: retFlights,
    limit: retLimit,
    page: retPage,
    length: retLength,
    setEndCity: setRetEndCity,
    setStartCity: setRetStartCity,
    setDate: setRetDate,
    setAddFlightId: setRetAddFlightId,
    setFlightClass: setRetFlightClass,
    handleSetPage: setRetHandleSetPage
  } = useFetchFlightsApi();

  const { cities } = useFetchCities();

  const { flightClassList } = useFetchFlightClassList();

  useEffect(() => {
    if (dates) {
      if (dates[1]) {
        setRoundtrip(true);
        setDirDate(dates[0]);
        setRetDate(dates[1]);
      }
      else {
        console.log(dates[0]);
        setRoundtrip(false);
        setDirDate(dates[0]);
      }
    }
  }, [dates]);

  useEffect(() => {
    setDirStartCity(departureCity);
    setRetEndCity(departureCity);
  }, [departureCity]);

  useEffect(() => {
    setDirEndCity(arrivalCity);
    setRetStartCity(arrivalCity);
  }, [arrivalCity]);

  useEffect(() => {
    setDirFlightClass(flightClass);
    setRetFlightClass(flightClass)
  }, [flightClass])

  const flightList = () => {
    return roundtrip ? (
      <div style={{ margin: 'auto' }}>
        <div 
          style={{ minHeight: 'calc(100vh - 64px - 70px - 104px - 50px)' }}
          className="site-layout-content"
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Card title={<Text style={{ fontSize: '30px' }} strong>Туда</Text>}>
                <FlightList
                  data={dirFlights}
                  length={dirLength}
                  setPage={setDirHandleSetPage}
                  limit={dirLimit}
                  page={dirPage}
                  setAddFlightId={setDirAddFlightId}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title={<Text style={{ fontSize: '30px' }} strong>Обратно</Text>}>
                <FlightList
                  data={retFlights}
                  length={retLength}
                  setPage={setRetHandleSetPage}
                  limit={retLimit}
                  page={retPage}
                  setAddFlightId={setRetAddFlightId}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    ) : (
      <div></div>
    )
  }

  return (
      <Content style={{ padding: '0 50px' }}>
        <div style={{ maxWidth: '950px', margin: 'auto'}}>
          <div className="site-layout-content">
            <Row gutter={16}>
              <Col span={5}>
                <CitySelect
                  placeholder="Откуда"
                  data={cities}
                  onChange={setDepartureCity}
                />
              </Col>
              <Col span={5}>
                <CitySelect
                  placeholderhandleSetPage="Куда"
                  data={cities}
                  onChange={setArrivalCity}
                />
              </Col>
              <Col span={7}>
                <DatePicker
                  placeholder={['Туда', 'Обратно']}
                  onChange={setDates}
                />
              </Col>
              <Col span={7}>
                <PassengerSelect
                  flightClassList={flightClassList}
                  onFlightClassChange={setFlightClass}
                  onPassengerAmountChange={setPassengerAmount}
                />
              </Col>
            </Row>
          </div>
        </div>
        { flightList() }
      </Content>
  );
}

export default Main;
