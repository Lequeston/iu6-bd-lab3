import React from 'react';
import { Select as AntSelect } from 'antd';

import './Select.css';

const { Option } = AntSelect;

const Select = ({ placeholder, data, onChange}) => {
  return (
    <AntSelect
      style={{ width: '100%' }}
      showSearch
      size="large"
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {data.map((element) => {
        return (<Option key={element.key}>{element.name}</Option>)
      })}
    </AntSelect>
  );
};

export default Select;
