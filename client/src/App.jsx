import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header'
import Main from './views/Main';
import OrderList from './views/OrderList';
import Footer from './components/Footer'

import useFetchApi from '../src/hooks/useFetchApi';

const App = () => {
  const {
    cities,
    flights,
    startCity,
    endCity,
    limit,
    page,
    length,
    clientOrders,
    setEndCity,
    setStartCity,
    setLoginCredentials,
    handleSetPage
  } = useFetchApi();

  return (
    <Layout className="layout">
      <Header onLoginFinish={setLoginCredentials} />
      <Routes>
        <Route 
          path='/'
          element={
            <Main
              cities={cities}
              flights={flights}
              limit={limit}
              page={page}
              length={length}
              startCity={startCity}
              endCity={endCity}
              setEndCity={setEndCity}
              setStartCity={setStartCity}
              handleSetPage={handleSetPage}
            />
          }
        />
        <Route 
          path='/orders'
          element={
            <OrderList
              clientOrders={clientOrders}
            />
          }
        />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
