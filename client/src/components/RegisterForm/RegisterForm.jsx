import React from 'react';
import { Select } from 'antd';

import './RegisterForm.css';

const RegisterForm = () => {
  return (
    <Select
      value="Регистрация"
      dropdownMatchSelectWidth={false}
      dropdownRender={() => {
        return (
          <div></div>
        );
      }}
    >
    </Select>
  );
};

export default RegisterForm;
