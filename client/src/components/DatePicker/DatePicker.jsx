import React from 'react';
import { DatePicker as AntDatePicker } from '../Ant'

import './DatePicker.css';

const { RangePicker } = AntDatePicker;

const DatePicker = ({ placeholder, onChange }) => {
  return (
    <RangePicker
      format='DD.MM.YYYY'
      placeholder={placeholder}
      allowEmpty={[false, true]}
      size="large"
      style={{ width: '100%' }}
      onChange={(dates, ...other) => {
        onChange(dates);
      }}
    />
  );
};

export default DatePicker;
