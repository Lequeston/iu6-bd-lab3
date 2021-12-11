import React from 'react';
import { List, Row, Col } from 'antd';

import './FlightList.css';

const FlightList = ({ data }) => {
  
  return (
    <List
    itemLayout="vertical"
    pagination={{
      pageSize: 10,
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item
        key={item.key}
      >
        <Row>
          <Col span={5}></Col>
          <Col span={5}>{`${item.departure.format()} - ${item.arrival.format()}`}</Col>
          <Col span={4}>{(item.arrival.subtract(item.departure)).format('HH:MM')}</Col>
          <Col span={5}></Col>
          <Col span={5}></Col>
        </Row>
        <Row>
          <Col span={5}></Col>
          <Col span={5}></Col>
          <Col span={4}></Col>
          <Col span={5}></Col>
          <Col span={5}></Col>
        </Row>
      </List.Item>
    )}
  />
  );
};

export default FlightList;
