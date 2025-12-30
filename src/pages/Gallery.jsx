import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import SearchBar from '../components/SearchBar';

const mockPhotos = [
  {
    id: 1,
    url: 'https://via.placeholder.com/300x200?text=Photo+1',
    caption: 'Beautiful sunset',
    date: '2023-10-01'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/300x200?text=Photo+2',
    caption: 'Mountain view',
    date: '2023-10-02'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/300x200?text=Photo+3',
    caption: 'City skyline',
    date: '2023-10-03'
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/300x200?text=Photo+4',
    caption: 'Forest trail',
    date: '2023-10-04'
  },
  {
    id: 5,
    url: 'https://via.placeholder.com/300x200?text=Photo+5',
    caption: 'Ocean waves',
    date: '2023-10-05'
  },
  {
    id: 6,
    url: 'https://via.placeholder.com/300x200?text=Photo+6',
    caption: 'Desert landscape',
    date: '2023-10-06'
  }
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPhotos(mockPhotos);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter(photo => photo.id !== id));
      setMessage('Photo deleted successfully!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const filteredPhotos = photos.filter(photo =>
    photo.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {message && (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#d4edda', color: '#155724', marginBottom: '1rem' }}>
          {message}
        </div>
      )}
      <SearchBar onSearch={handleSearch} />
      {filteredPhotos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>{searchQuery ? `No photos found matching "${searchQuery}"` : 'No photos available'}</h2>
        </div>
      ) : (
        <div className="gallery">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              {...photo}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
