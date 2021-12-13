import React, { useState } from 'react';
import { Typography, Image, Layout, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import LoginForm from '../components/LoginForm';
import CitySelect from '../components/CitySelect';
import DatePicker from '../components/DatePicker';
import PassengerSelect from '../components/PassengerSelect';
import FlightList from '../components/FlightList';

import './Main.css';
import useFetchApi from '../hooks/useFetchApi';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const cityList = [
  {key: 1, name: 'Москва'},
  {key: 2, name: 'Мо'},
  {key: 3, name: 'Молотов'},
  {key: 4, name: 'Молодечно'}
];

const flightList = [
  {key: 1, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 2, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 3, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 22:00', 'YYYY-MM-DD hh:mm'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 4, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: true, price: 14436},
  {key: 5, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 0, transferTime: 0, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 6, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 7, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 8, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 9, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 10, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 11, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 12, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 13, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 15, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 16, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 17, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436},
  {key: 18, airline: 'Turkish Airlines', departure: dayjs('2021-11-12 12:09', 'YYYY-MM-DD hh:mm'), arrival: dayjs('2021-11-12 23:09', 'YYYY-MM-DD hh:mm'), transfer: 1, transferTime: 1.5, flightCode: 'BY7120', roundtrip: false, price: 14436}
];

const flightClassList = [
  {key: 1, name:'Первый класс'},
  {key: 2, name:'Бизнес класс'},
  {key: 3, name:'Премиумный экономный класс'},
  {key: 4, name:'Экономный класс'}

];

const Main = () => {
  const [departureCity, setDepartureCity] = useState();
  const [arrivalCity, setArrivalCity] = useState();
  const [dateRange, setDateRange] = useState();
  const [flightClass, setFlightClass] = useState();
  const [passengerAmount, setPassengerAmount] = useState();
  const [clientEmail, setClientEmail] = useState();

  const {
    cites,
    flights,
    limit,
    page,
    setEndCity,
    setStartCity,
    length,
    handleSetPage
  } = useFetchApi();
  return (
    <Layout className="layout">

      <Header style={{ background: '#fff' }}>
        <Row
          style={{
            height: "100%",
            flexFlow: "nowrap",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Col style={{
            display: 'flex',
            alignItems: "center",
            columnGap: "16px"
            }}
          >
            <Image
              width={44}
              height={44}
              src="error"
              fallback="data:image/png;base64,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"
            />
            <Title 
              style={{
                fontSize: '25px',
                fontWeight: '50',
                height: 'fit-content',
                margin: '0'
                }}
            >
              Заказ авиабилетов
            </Title>
          </Col>
          <Col style={{
            display: 'flex',
            alignItems: "center",
            }}
          >
            <LoginForm onFinish={setClientEmail}/>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <div style={{ maxWidth: '950px', margin: 'auto'}}>
          <div className="site-layout-content">
            <Row gutter={16}>
              <Col span={5}>
                <CitySelect
                  placeholder="Откуда"
                  data={cites}
                  onChange={setStartCity}
                />
              </Col>
              <Col span={5}>
                <CitySelect
                  placeholder="Куда"
                  data={cites}
                  onChange={setEndCity}
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

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>

    </Layout>
  );
}

export default Main;
