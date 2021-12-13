import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import Main from './views/Main';
import Orders from './views/Orders/Orders';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
  );
}

export default App;
