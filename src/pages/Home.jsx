import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        <h1 style={{ color: 'white', margin: 0 }}>📸 Camera App</h1>
        <div>
          <button
            onClick={() => navigate('/camera')}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            📷 Camera
          </button>
          <button
            onClick={() => navigate('/gallery')}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🖼️ Gallery
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              background: 'rgba(255,0,0,0.3)',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{
        textAlign: 'center',
        color: 'white',
        marginTop: '100px'
      }}>
        <h2>Welcome! You are authenticated.</h2>
        <p>Click Camera to take photos or Gallery to view them.</p>
      </div>
    </div>
  );
}