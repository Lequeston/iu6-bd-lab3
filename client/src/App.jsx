import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import useFetchApi from '../src/hooks/useFetchApi';

import Header from './components/Header'
import Main from './views/Main';
import Orders from './views/Orders/Orders';

import useFetchApi from '../src/hooks/useFetchApi';

const App = () => {
  const {
    cities,
    flights,
    limit,
    page,
    length,
    setEndCity,
    setStartCity,
    setClientId,
    handleSetPage
  } = useFetchApi();

  return (
    <Layout className="layout">
      <Header onLoginFinish={setClientId} />
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
              setEndCity={setEndCity}
              setStartCity={setStartCity}
              handleSetPage={handleSetPage}
            />
          }
        />
        <Route 
          path='/orders'
          element={
            <Orders

            />
          }
        />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
