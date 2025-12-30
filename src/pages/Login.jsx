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
    // Clear form fields when the page loads
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    setGeneralError('');
    if (validate()) {
      try {
        login(email, password);
        setSuccess('Login successful! Redirecting...');
        // Reset form
        setEmail('');
        setPassword('');
        setErrors({});
        // Navigate to home
        navigate('/');
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #00D4FF 0%, #FF0080 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            width: '100%',
            transition: 'background 0.2s ease, transform 0.1s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #00FFFF 0%, #FF1493 100%)'}
          onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #00D4FF 0%, #FF0080 100%)'}
        >
          Login
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {generalError && <p className="error-message">{generalError}</p>}
    </div>
  );
};

export default Login;