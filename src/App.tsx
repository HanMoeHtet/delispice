import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, Guest } from './composables/auth';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import RestaurantPage from './pages/RestaurantPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/login"
            element={
              <Guest>
                <LogInPage />
              </Guest>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantPage />}
          />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </AuthProvider>{' '}
    </BrowserRouter>
  );
}

export default App;
