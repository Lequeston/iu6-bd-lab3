import React, { useState } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CitySelect from '../../components/CitySelect';
import DatePicker from '../../components/DatePicker';
import PassengerSelect from '../../components/PassengerSelect';
import FlightList from '../../components/FlightList';

import './Main.css';

const {Content } = Layout;

const flightClassList = [
  {key: 1, name:'Первый класс'},
  {key: 2, name:'Бизнес класс'},
  {key: 3, name:'Премиумный экономный класс'},
  {key: 4, name:'Экономный класс'}

];

const Main = ({
  cities,
  flights,
  limit,
  page,
  length,
  setEndCity,
  setStartCity,
  handleSetPage
}) => {
  const [departureCity, setDepartureCity] = useState();
  const [arrivalCity, setArrivalCity] = useState();
  const [dateRange, setDateRange] = useState();
  const [flightClass, setFlightClass] = useState();
  const [passengerAmount, setPassengerAmount] = useState();

  const fetchAPI = () => {
    setStartCity(departureCity);
    setEndCity(arrivalCity);
  };

  return (
    <div>
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
                  placeholder="Куда"
                  data={cities}
                  onChange={setArrivalCity}
                />
              </Col>
              <Col span={7}>
                <DatePicker
                  placeholder={['Туда', 'Обратно']}
                  onChange={setDateRange}
                />
              </Col>
              <Col span={4}>
                <PassengerSelect
                  flightClassList={flightClassList}
                  onFlightClassChange={setFlightClass}
                  onPassengerAmountChange={setPassengerAmount}
                />
              </Col>
              <Col span={3}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="large"
                  style={{ width: '100%' }}
                  onClick={fetchAPI}
                >
                  Найти
                </Button>
              </Col>
            </Row>
          </div>
          <div style={{ minHeight: 'calc(100vh - 64px - 70px - 104px)' }} className="site-layout-content">
            <FlightList
              data={flights}
              length={length}
              setPage={handleSetPage}
              limit={limit}
              page={page}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}

export default Main;