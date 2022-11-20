import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'controllers/auth/useAuth';

import './App.css';
import Auth from './auth';
import Dashboard from './dashboard';
import SignUp from './sign-up';
import { UsersPage } from './users';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
