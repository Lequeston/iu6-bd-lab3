import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';

import CitySelect from '../components/CitySelect/CitySelect';

import './Main.css';

const { Header, Content, Footer } = Layout;

const cityList = [
  {id: 1, title: 'Москва'},
  {id: 2, title: 'Мо'},
  {id: 3, title: 'Молотов'},
  {id: 4, title: 'Молодечно'},
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
        <div className="site-layout-content">
          <Row gutter={16}>
            <Col span={6}>
              <CitySelect
                placeholder="Откуда"
                setCity={setDepartureCity}
                cityList={cityList}
              />
            </Col>
            <Col span={6}>
              <CitySelect
                placeholder="Куда"
                setCity={setArrivalCity}
                cityList={cityList}
              />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        </div>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default Main;
