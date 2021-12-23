import React from 'react';
import { Select } from 'antd';

import './CitySelect.css';

const { Option } = Select;

const CitySelect = ({ placeholder, data, onChange, value}) => {
  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      size="large"
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {data.map((element) => {
        return (<Option key={element.id}>{element.title}</Option>)
      })}
    </Select>
  );
};

export default CitySelect;
