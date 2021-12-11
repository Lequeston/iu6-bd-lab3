import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Select from '../components/Select';

import './Main.css';

const { Header, Content, Footer } = Layout;

const cityList = [
  {key: 1, name: 'Москва'},
  {key: 2, name: 'Мо'},
  {key: 3, name: 'Молотов'},
  {key: 4, name: 'Молодечно'},
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
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default Main;
