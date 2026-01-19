import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setErrors({});
    setSuccess('');
    setGeneralError('');
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setGeneralError('');
    if (validate()) {
      try {
        await login(email, password);
        setSuccess('Login successful! Redirecting...');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/home');
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px' 
    }}>
      <div style={{ 
        maxWidth: '900px', 
        width: '100%', 
        background: 'white', 
        padding: '60px 80px', 
        borderRadius: '20px', 
        boxShadow: '0 15px 35px rgba(0,0,0,0.3)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>📸</div>
          <h1 style={{ 
            color: '#2c3e50', 
            margin: 0,
            fontSize: '36px',
            fontWeight: '700'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#7f8c8d', marginTop: '10px', fontSize: '15px' }}>
            Login to continue to Camera App
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50', 
              fontSize: '15px',
              fontWeight: '600'
            }}>
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50', 
              fontSize: '15px',
              fontWeight: '600'
            }}>
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '17px',
              width: '100%',
              fontWeight: '600',
              marginTop: '15px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Login
          </button>
        </form>
        
        {success && (
          <div style={{ 
            color: '#27ae60', 
            textAlign: 'center', 
            marginTop: '20px',
            padding: '12px',
            background: '#d4edda',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✓ {success}
          </div>
        )}
        
        {generalError && (
          <div style={{ 
            color: '#e74c3c', 
            textAlign: 'center', 
            marginTop: '20px',
            padding: '12px',
            background: '#f8d7da',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✗ {generalError}
          </div>
        )}
        
        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          paddingTop: '25px',
          borderTop: '1px solid #ecf0f1'
        }}>
          <span style={{ color: '#7f8c8d', fontSize: '15px' }}>
            Don't have an account?{' '}
          </span>
          <a 
            href="/signup" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;