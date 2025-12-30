import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const EditModal = ({ photoId, currentCaption, onSave, onClose }) => {
  const [caption, setCaption] = useState(currentCaption);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSave = () => {
    onSave(photoId, caption);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <h3>Edit Caption</h3>
        <label htmlFor="caption-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#FFFFFF' }}>
          New Caption
        </label>
        <input
          id="caption-input"
          ref={inputRef}
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            fontSize: '1rem',
            marginBottom: '1rem',
            transition: 'border-color 0.2s ease',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF'
          }}
          onFocus={(e) => e.target.style.borderColor = '#00D4FF'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
        />
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button onClick={handleCancel} style={{ padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #00D4FF 0%, #FF0080 100%)', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  photoId: PropTypes.number.isRequired,
  currentCaption: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModal;