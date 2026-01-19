import React, { useEffect, useState } from 'react';
// import { getLocalPhotos, deleteLocalPhoto } from '../utils/imageUpload';
import { photoAPI } from '../services/api';
export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');

  useEffect(() => {
    loadPhotos();
  }, []);

  // const loadPhotos = () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const localPhotos = getLocalPhotos();
  //     setPhotos(localPhotos);
  //   } catch (err) {
  //     console.error('Error loading photos:', err);
  //     setError('Failed to load photos. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const loadPhotos = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await photoAPI.getAllPhotos();
    setPhotos(data);
  } catch (err) {
    console.error('Error loading photos:', err);
    setError('Failed to load photos. Please try again.');
  } finally {
    setLoading(false);
  }
};
  // const handleDelete = (photoId) => {
  //   if (window.confirm('Are you sure you want to delete this photo?')) {
  //     try {
  //       const success = deleteLocalPhoto(photoId);
  //       if (success) {
  //         loadPhotos();
  //         alert('✅ Photo deleted successfully');
  //       } else {
  //         alert('❌ Failed to delete photo');
  //       }
  //     } catch (err) {
  //       console.error('Delete error:', err);
  //       alert('❌ Error deleting photo: ' + err.message);
  //     }
  //   }
  // };

  const handleDelete = async (photoId) => {
  if (window.confirm('Are you sure you want to delete this photo?')) {
    try {
      await photoAPI.deletePhoto(photoId);
      loadPhotos();
      alert('✅ Photo deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Error deleting photo: ' + err.message);
    }
  }
};
  const startEditing = (photo) => {
    setEditingId(photo._id);
    setEditCaption(photo.caption || '');
  };

// const saveCaption = (photoId) => {
//   try {
//     const allPhotos = JSON.parse(localStorage.getItem('cameraApp_photos')) || [];
//     const updatedPhotos = allPhotos.map(photo => 
//       photo.id === photoId ? { ...photo, caption: editCaption } : photo
//     );
//     localStorage.setItem('cameraApp_photos', JSON.stringify(updatedPhotos));
//     setEditingId(null);
//     setEditCaption('');
//     loadPhotos(); // This will refresh the display
//   } catch (err) {
//     console.error('Failed to save caption:', err);
//     alert('❌ Failed to save caption');
//   }
// };
//    const saveCaption = (photoId) => {
//   try {
//     const allPhotos = JSON.parse(localStorage.getItem('photos')) || [];
//     const updatedPhotos = allPhotos.map(photo => 
//       photo.id === photoId ? { ...photo, caption: editCaption } : photo
//     );
//     localStorage.setItem('photos', JSON.stringify(updatedPhotos));
//     setEditingId(null);
//     setEditCaption('');
//     loadPhotos(); // This will refresh the display
//   } catch (err) {
//     console.error('Failed to save caption:', err);
//     alert('❌ Failed to save caption');
//   }
// };
  const saveCaption = async (photoId) => {
  try {
    await photoAPI.updateCaption(photoId, editCaption);
    setEditingId(null);
    setEditCaption('');
    loadPhotos();
  } catch (err) {
    console.error('Failed to save caption:', err);
    alert('❌ Failed to save caption');
  }
};
const cancelEditing = () => {
    setEditingId(null);
    setEditCaption('');
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="%23999"%3EImage Error%3C/text%3E%3C/svg%3E';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white', fontSize: '20px' }}>⏳ Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <p style={{ color: 'white', fontSize: '20px' }}>❌ {error}</p>
        <button onClick={loadPhotos} style={{ marginTop: '20px', padding: '10px 20px', background: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      {/* Navigation Bar */}
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
          <button onClick={() => window.location.href = '/home'} style={{ padding: '10px 20px', margin: '0 10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>
            🏠 Home
          </button>
          <button onClick={() => window.location.href = '/camera'} style={{ padding: '10px 20px', margin: '0 10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>
            📷 Camera
          </button>
        </div>
      </nav>

      {/* Gallery Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0 }}>🖼️ Photo Gallery ({photos.length})</h2>
          <button onClick={loadPhotos} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            🔄 Refresh
          </button>
        </div>

        {photos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '80px' }}>📷</div>
            <p style={{ fontSize: '24px', color: '#666', marginTop: '20px' }}>No photos yet</p>
            <p style={{ color: '#999' }}>Go to Camera and take some photos!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {photos.map((photo) => (
              <div key={photo._id} style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '10px', 
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <img
                  src={photo.photoURL}
                  alt="Photo"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onError={handleImageError}
                  loading="lazy"
                />
                <div style={{ padding: '15px' }}>
                  {/* Caption Section */}
                  {editingId === photo._id ? (
                    <div style={{ marginBottom: '10px' }}>
                      <input
                        type="text"
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Enter caption..."
                        style={{ 
                          width: '100%', 
                          padding: '8px', 
                          border: '1px solid #ddd', 
                          borderRadius: '5px',
                          marginBottom: '10px'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => saveCaption(photo._id)}
                          style={{ flex: 1, padding: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          ✓ Save
                        </button>
                        <button 
                          onClick={cancelEditing}
                          style={{ flex: 1, padding: '8px', background: '#999', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          ✗ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>
                        {photo.caption || 'No caption'}
                      </p>
                      <button 
                        onClick={() => startEditing(photo)}
                        style={{ padding: '5px 10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ✏️ Edit Caption
                      </button>
                    </div>
                  )}

                  {/* Date */}
                  <p style={{ fontSize: '12px', color: '#666', margin: '10px 0' }}>
  📅 {new Date(photo.createdAt).toLocaleDateString()} at {new Date(photo.createdAt).toLocaleTimeString()}
</p>
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <a 
                      href={photo.photoURL} 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        flex: 1, 
                        padding: '10px', 
                        background: '#667eea', 
                        color: 'white', 
                        textAlign: 'center', 
                        textDecoration: 'none', 
                        borderRadius: '5px' 
                      }}
                    >
                      🔍 View Full
                    </a>
                    <button 
                      onClick={() => handleDelete(photo._id)}
                      style={{ 
                        flex: 1, 
                        padding: '10px', 
                        background: '#f44336', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}