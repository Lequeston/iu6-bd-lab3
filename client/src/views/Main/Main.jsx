import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import CitySelect from '../../components/CitySelect';
import DatePicker from '../../components/DatePicker';
import PassengerSelect from '../../components/PassengerSelect';
import FlightList from '../../components/FlightList';

import useFetchFlightsApi from '../../hooks/useFetchFlightsApi';
import useFetchCities from '../../hooks/useFetchCities';
import useFetchFlightClassList from '../../hooks/useFetchFlightClassList';

import './Main.css';

const {Content } = Layout;

const Main = ({
}) => {
  const [flightClass, setFlightClass] = useState();
  const [passengerAmount, setPassengerAmount] = useState();

  const {
    flights,
    limit,
    page,
    length,
    setEndCity,
    setStartCity,
    setDate,
    setAddFlightId,
    handleSetPage
  } = useFetchFlightsApi();

  const { cities } = useFetchCities();

  const { flightClassList } = useFetchFlightClassList();

  const onDatesChange = (dates) => {
    if (dates) {
      setDate(dates[0])
    }
  };

  return (
      <Content style={{ padding: '0 50px' }}>
        <div style={{ maxWidth: '950px', margin: 'auto'}}>
          <div className="site-layout-content">
            <Row gutter={16}>
              <Col span={5}>
                <CitySelect
                  placeholder="Откуда"
                  data={cities}
                  onChange={setStartCity}
                />
              </Col>
              <Col span={5}>
                <CitySelect
                  placeholder="Куда"
                  data={cities}
                  onChange={setEndCity}
                />
              </Col>
              <Col span={7}>
                <DatePicker
                  placeholder={['Туда', 'Обратно']}
                  onChange={onDatesChange}
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
          <div style={{ minHeight: 'calc(100vh - 64px - 70px - 104px - 50px)' }} className="site-layout-content">
            <FlightList
              data={flights}
              length={length}
              setPage={handleSetPage}
              limit={limit}
              page={page}
              setAddFlightId={setAddFlightId}
            />
          </div>
        </div>
      </Content>
  );
}

export default Main;
