import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'controllers/auth/useAuth';
import { ROUTES } from 'routes';
import './App.css';

import Auth from './auth';
import Dashboard from './dashboard';
import SignUp from './sign-up';
import { UsersPage } from './users';
import { LogsPage } from './userlogs';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.HOME} element={<Dashboard />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} />
            <Route path={ROUTES.LOGS} element={<LogsPage />} />
            <Route path={ROUTES.AUTH} element={<Auth />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
