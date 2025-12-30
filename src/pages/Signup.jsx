import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        signup(name, email, password);
        setSuccess('Signup successful! You can now log in.');
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        // Navigate to login
        setTimeout(() => navigate('/login'), 2000); // Delay to show message
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
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
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
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
          Signup
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {generalError && <p className="error-message">{generalError}</p>}
    </div>
  );
};

export default Signup;