import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './pages/ProtectedRoute';
import FormTemplatePage from './pages/FormTemplatePage';
import FormPage from './pages/FormPage';
import { User, StorageUser } from './types';
import LocalStorage from './services/LocalStorage';
import ProfileUserIdPage from './pages/ProfileUserIdPage';
import UsersSubdivision from './pages/UsersSubvision';

export const AppContext = React.createContext<{
  user: StorageUser,
}>({
  user: null,
})

const App: React.FC = () => {
  const [activeUser, setActiveUser] = useState<StorageUser>(
    LocalStorage.get<User>("activeUser"),
  );

  useEffect(() => {
    console.log('activeUser', activeUser);
  }, [activeUser])

  console.log('activeUser123', activeUser);

  return (
    <AppContext.Provider value={{
      user: activeUser
    }}>
      <Routes>
        <Route path="/profile" element={<ProtectedRoute onUnAuthPath="/users" />}>
          <Route path="/profile" element={<ProfilePage activeUser={activeUser as User} setActiveUser={setActiveUser} />} />
        </Route>

        <Route path="/profile/:profileId" element={<ProfileUserIdPage />} />
        
        <Route path="/main" element={<ProtectedRoute onUnAuthPath="/users" />}>
          <Route path="/main" element={<MainPage activeUser={activeUser as User} />} />
        </Route>

        <Route path="/userssubdivision" element={<ProtectedRoute onUnAuthPath="/users" />}>
          <Route path="/userssubdivision" element={<UsersSubdivision activeUser={activeUser as User} />} />
        </Route>

        <Route path="/formTemplate/:templateId" element={<ProtectedRoute onUnAuthPath="/users" />}>
          <Route path="/formTemplate/:templateId" element={<FormTemplatePage activeUser={activeUser as User} />} />
        </Route>

        <Route path="/form/:formId" element={<ProtectedRoute onUnAuthPath="/users" />}>
          <Route path="/form/:formId" element={<FormPage activeUser={activeUser as User} />} />
        </Route>
        {!activeUser && <Route path={"/users"} element={<UsersPage setActiveUser={setActiveUser} />} />}
        <Route path="*" element={<Navigate to="/main"/>} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;