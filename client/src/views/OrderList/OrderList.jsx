import React from 'react';
import { Layout, List, Row, Col, Typography, Image, Empty } from 'antd';
import dayjs from 'dayjs';

import './OrderList.css'
import useFetchOrdersApi from '../../hooks/useFetchOrdersApi';

const { Content } = Layout;

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
        width: '1000px',
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
                  <Row gutter={[16, 0]} justify="center">
                    <Col>{item.route.airDeparture.city}, {item.route.airDeparture.title}</Col>
                    <Col>
                      <Row>{dayjs(item.airDepartureData).format('HH:mm')}</Row>
                      <Row>{dayjs(item.airDepartureData).format('DD MMMM')}</Row>
                    </Col>
                    <Col >
                      <Row>{printTime(...convertHours(calcDifference(dayjs(item.airDepartureData), dayjs(item.airArrivalData))))}</Row>
                      <Row>{'--------------------------------->'}</Row>
                    </Col>
                    <Col>
                      <Row>{dayjs(item.airArrivalData).format('HH:mm')}</Row>
                      <Row>{dayjs(item.airArrivalData).format('DD MMMM')}</Row>
                    </Col>
                    <Col>{item.route.airArrival.city}, {item.route.airArrival.title}</Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col>{item.flightNumber}</Col>
                    <Col>
                      <Row>{item.planeType}</Row>
                      <Row>{item.comfortClass} класс</Row>
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
