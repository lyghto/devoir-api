import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard/Dashboard';
import ReservationList from './pages/reservations/ReservationList';
import UserList from './pages/users/UserList';
import CatwayList from './pages/catways/CatwayList';
import AddReservation from './pages/reservations/AddReservation';
import EditReservation from './pages/reservations/EditReservation';
import AddUser from './pages/users/AddUser';
import AddCatway from './pages/catways/AddCatways';
import ApiDoc from './pages/ApiDoc';
import DeleteUser from './pages/users/DeleteUser';
import EditUser from './pages/users/EditUser';

function AppContent() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const showNavbar = isLoggedIn && location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/reservations/add" element={<AddReservation />} />
        <Route path="/reservations/edit/:id" element={<EditReservation />} />
        <Route path="/catways" element={<CatwayList />} />
        <Route path="/catways/edit/:id" element={<AddCatway />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />
        <Route path="/documentation" element={<ApiDoc />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;