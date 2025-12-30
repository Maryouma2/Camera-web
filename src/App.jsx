import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';

function AppContent() {
  return (
    <>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/gallery" style={{ margin: '0 1rem' }}>Gallery</Link>
        <Link to="/login" style={{ margin: '0 1rem' }}>Login</Link>
        <Link to="/signup" style={{ margin: '0 1rem' }}>Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;