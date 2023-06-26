import './App.css';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import LoginRegister from './Pages/Login_Register/loginRegister';
import { useEffect } from 'react';
import { auth } from './Firebase/base';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Users/Users';

function App() {
  // Redirect the page
  const navigate = useNavigate()
  // to listen the user login or not
  useEffect(() => {
    const subscribe = auth
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          navigate("/home")
        }
        else {
          navigate("/")
        }
      })
    subscribe()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
