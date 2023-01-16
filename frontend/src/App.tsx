import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './pages/ProtectedRoute';
import FormTemplatePage from './pages/FormTemplatePage';
import FormPage from './pages/FormPage';
import ProfileUserIdPage from './pages/ProfileUserIdPage';
import { LoginPage } from './pages/LoginPage';
import { AuthorizeUserStatus, getMe } from './redux/slices/userSlice';
import { RootState, useAppDispatch } from './redux/store/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authorizeStatus } = useSelector((root: RootState) => root.user);

  useEffect(() => {
    console.log('getMe')
    dispatch(getMe());
  }, [dispatch]);

  if (authorizeStatus === AuthorizeUserStatus.UNKNOWN) {
    return (
      <LoadingShadow disabled={false}>
      </LoadingShadow>
    )
  }

  return (
    <Routes>
      <Route path="/profile" element={<ProtectedRoute onUnAuthPath="/sign" />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* <Route path="/profile/:profileId" element={<ProfileUserIdPage />} /> */}
      
      <Route path="/main" element={<ProtectedRoute onUnAuthPath="/sign" />}>
        <Route path="/main" element={<MainPage />} />
      </Route>

      {/* <Route path="/formTemplate/:templateId" element={<ProtectedRoute onUnAuthPath="/sign" />}>
        <Route path="/formTemplate/:templateId" element={<FormTemplatePage />} />
      </Route> */}

      {/* <Route path="/form/:formId" element={<ProtectedRoute onUnAuthPath="/sign" />}>
        <Route path="/form/:formId" element={<FormPage />} />
      </Route> */}
      <Route path={"/sign"} element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/main"/>} />
    </Routes>
  );
};

export default App;

interface LoadProps {
  disabled: boolean;
}

const LoadingShadow = styled.div<LoadProps>`
  position: fixed;
  inset: 0;
  background: #FFF;

  z-index: 10;

  transition: .2s background;

  ${props => props.disabled && `
    background: red;
  `}
`;