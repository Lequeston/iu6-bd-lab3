import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Select from '../components/Select';
import FlightList from '../components/FlightList';

import './Main.css';

const { Header, Content, Footer } = Layout;

const cityList = [
  {key: 1, name: 'Москва'},
  {key: 2, name: 'Мо'},
  {key: 3, name: 'Молотов'},
  {key: 4, name: 'Молодечно'},
]

const flightList = [
  {key: 1, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 2, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 3, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 22:00', 'YYYY-MM-DD HH:MM'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 4, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 5, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 6, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 7, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 8, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 9, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 10, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 11, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 12, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 13, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 15, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 16, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 17, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 18, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD HH:MM'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD HH:MM'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436}
]

const Main = () => {
  const [departureCity, setDepartureCity] = useState();
  const [arrivalCity, setArrivalCity] = useState();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ maxWidth: '950px', margin: 'auto'}}>
          <div className="site-layout-content">
            <Row gutter={16}>
              <Col span={6}>
                <Select
                  placeholder="Откуда"
                  data={cityList}
                  onSelected={setDepartureCity}
                />
              </Col>
              <Col span={6}>
                <Select
                  placeholder="Куда"
                  data={cityList}
                  onSelected={setArrivalCity}
                />
              </Col>
              <Col span={9}></Col>
              <Col span={3}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="large"
                  style={{ width: '100%' }}
                >
                  Найти
                </Button>
              </Col>
            </Row>
          </div>
          <div style={{ minHeight: 'calc(100vh - 64px - 70px - 104px)' }} className="site-layout-content">
            <FlightList
              data={flightList}
              />
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default Main;
