import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import Auth from './auth';
import Dashboard from './dashboard';
import SignUp from './sign-up';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
