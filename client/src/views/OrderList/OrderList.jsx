import React from 'react';
import { Layout, List, Row, Col, Typography } from 'antd';
import dayjs from 'dayjs';

import './OrderList.css'
import useFetchOrdersApi from '../../hooks/useFetchOrdersApi';

const { Content } = Layout;
const { Text } = Typography;

const OrderList = () => {
  const {
    orders: clientOrders
  } = useFetchOrdersApi();

  const printTime = (hour, minute) => {
    if (minute === '0')
      return `${hour} ч.`;
    if (hour === '0')
      return `${minute} мин.`
    return `${hour} ч. ${minute} мин.`;
  };

  const convertHours = (hours) => {
    let [hour, minute] = hours.toFixed(2).toString().split('.');
    if (minute !== 0)
      minute = (parseInt(minute) * 60 / 100).toString();
    return [hour, minute];
  };

  const calcDifference = (early, late) => {
    return late.diff(early, 'hour', true);
  };

  return (
    <Content
      style={{
        padding: '0 50px',
        margin: 'auto'
      }}
    >
      <div style={{ minHeight: 'calc(100vh - 64px - 70px - 50px)' }} className="site-layout-content">
        <List
          itemLayout="vertical"
          pagination={{
            pageSize: 15,
          }}
          dataSource={clientOrders}
          renderItem={item => (
            <List.Item
              key={item.id}
              
            >
              <Row gutter={[16, 0]} justify="space-between">
                <Col><Text strong style={{ fontSize: '20px' }}>{item.route.airDeparture.city}</Text>, {item.route.airDeparture.title}</Col>
                <Col>
                  <Row>{dayjs(item.airDepartureData).format('HH:mm')}</Row>
                  <Row>{dayjs(item.airDepartureData).format('DD MMMM')}</Row>
                </Col>
                <Col >
                  <Row justify="center">{printTime(...convertHours(calcDifference(dayjs(item.airDepartureData), dayjs(item.airArrivalData))))}</Row>
                  <Row>{'--------------------------------->'}</Row>
                </Col>
                <Col>
                  <Row>{dayjs(item.airArrivalData).format('HH:mm')}</Row>
                  <Row>{dayjs(item.airArrivalData).format('DD MMMM')}</Row>
                </Col>
                <Col><Text strong style={{ fontSize: '20px' }}>{item.route.airArrival.city}</Text>, {item.route.airArrival.title}</Col>
              </Row>
              <div style={{height: '20px'}}></div>
              <Row gutter={[16, 0]}>
                <Col>{item.flightNumber}</Col>
                <Col>
                  <Row>{item.comfortClass} класс</Row>
                  <Row><Text type="secondary">{item.planeType}</Text></Row>
                </Col>
                <Col>{item.price}</Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};

export default OrderList;
