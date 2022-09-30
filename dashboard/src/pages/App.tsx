import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import Auth from "./auth";
import Dashboard from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
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
