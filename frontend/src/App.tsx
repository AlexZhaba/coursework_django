import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UsersPage from './pages/UsersPage';

const App: React.FC = () => (
  <Routes>
    <Route path="/main" element={<MainPage />} />
    <Route path="/users" element={<UsersPage />} />
  </Routes>
);

export default App;