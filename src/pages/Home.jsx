import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Please log in to access your dashboard.</p>
        <a href="/login" style={{ color: '#00D4FF', textDecoration: 'none' }}>Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! You are authenticated.</p>
      <button
        onClick={logout}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #00D4FF 0%, #FF0080 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'background 0.2s ease, transform 0.1s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #00FFFF 0%, #FF1493 100%)'}
        onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #00D4FF 0%, #FF0080 100%)'}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;