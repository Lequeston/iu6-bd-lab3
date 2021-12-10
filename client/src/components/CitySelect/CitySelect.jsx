import React from 'react';
import { Select } from 'antd';

import './CitySelect.css';

const { Option } = Select;

const CitySelect = ({ placeholder, setCity, cityList }) => {
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setCity(value)
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      size="large"
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
    >
      {cityList.map((city) => {
        return (<Option key={city.id}>{city.title}</Option>)
      })}
    </Select>
  );
};

export default CitySelect;
