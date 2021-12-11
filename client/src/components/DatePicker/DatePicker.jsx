import React from 'react';
import { DatePicker as AntDatePicker} from 'antd';
import moment from 'moment';

import './DatePicker.css';

const { RangePicker } = AntDatePicker;

const DatePicker = (dateFormat, onSelected) => {
  return (
    <RangePicker
      allowEmpty={[false, true]}
      size="large"
      style={{ width: '100%' }}
      onChange={(dates, dateStrings) => {
        console.log(dates);
        onSelected(dates);
      }}
      format={dateFormat}
    />
  );
};

export default DatePicker;
