import React, { useState, useEffect } from 'react';
import { Select, Row, Col, Typography, Button, Tooltip, Radio, Space, Divider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import './PassengerSelect.css';

const { Text } = Typography;

const PassengerSelect = ({ flightClassList, onFlightClassChange, onPassengerAmountChange }) => {
  const [flightClass, setFlightClass] = useState(1);
  const [passengerAmount, setPassengerAmount] = useState(0);

  useEffect(() => {
    onFlightClassChange(flightClass);
    onPassengerAmountChange(passengerAmount);
  }, [flightClass, passengerAmount, onFlightClassChange, onPassengerAmountChange])

  return (
    <Select
      value={`${passengerAmount}, ${flightClassList[flightClass - 1].name}`}
      style={{ width: '100%' }}
      size="large"
      dropdownMatchSelectWidth={false}
      dropdownRender={() => {
        return (
          <div className="passenger-select">
            <Row gutter={[8, 0]} align="middle">
              <Col flex="auto"><Text>Количество</Text></Col>
              <Col>
                <Tooltip title="search">
                  <Button
                    onClick={() => {if (passengerAmount > 0) setPassengerAmount(passengerAmount - 1)}}
                    type="primary"
                    shape="circle"
                    icon={<MinusOutlined />}
                  />
                </Tooltip>
              </Col>
              <Col><Text>{passengerAmount}</Text></Col>
              <Col>
                <Tooltip title="search">
                  <Button
                    onClick={() => {setPassengerAmount(passengerAmount + 1)}}
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Divider />
            <Radio.Group
              value={flightClass}
              onChange={(event) => {setFlightClass(event.target.value)}}
            >
              <Space direction="vertical">
                {flightClassList.map((flightClass) => {
                  return (<Radio key={flightClass.key} value={flightClass.key}>{flightClass.name}</Radio>);
                })}
              </Space>
            </Radio.Group>
          </div>
        )
      }}
    />
  );
};

export default PassengerSelect;
