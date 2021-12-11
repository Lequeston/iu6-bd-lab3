import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

moment.locale('ru')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
