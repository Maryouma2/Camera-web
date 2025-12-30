import { useState } from 'react';
import PropTypes from 'prop-types';
import EditModal from './EditModal';

const PhotoCard = ({ id, url, caption, date, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = (photoId, newCaption) => {
    // Mock update - in real app, this would call an API
    alert(`Caption for photo ${photoId} updated to: "${newCaption}"`);
    // Here you would update the state or call a prop function
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="photo-card">
        <div className="photo-image-container">
          <img src={url} alt={caption} />
        </div>
        <div className="photo-info">
          <p className="photo-caption">{caption}</p>
          <small className="photo-date">{date}</small>
        </div>
        <div className="photo-actions">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <EditModal
          photoId={id}
          currentCaption={caption}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </>
  );
};

PhotoCard.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PhotoCard;