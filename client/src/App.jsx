import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header'
import Main from './views/Main';
import OrderList from './views/OrderList';
import Footer from './components/Footer'

const App = () => {
  return (
    <Layout className="layout">
      <Header />
      <Routes>
        <Route 
          path='/'
          element={
            <Main/>
          }
        />
        <Route 
          path='/orders'
          element={
            <OrderList/>
          }
        />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
