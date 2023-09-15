
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/profile';
import Home from '../pages/Home';
import { useContext } from 'react';
import { AuthContext } from '../contextapi/Authcontext';

function AppRouter() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute>{<Profile />}</ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute>{<Home />}</ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
