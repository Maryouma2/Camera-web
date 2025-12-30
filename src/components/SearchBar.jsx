import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="search-container">
      <label htmlFor="search-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#FFFFFF' }}>
        Search Photos by Caption
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.75rem',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          fontSize: '1rem',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#00D4FF';
          e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;