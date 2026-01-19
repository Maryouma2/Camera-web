// src/utils/imageUpload.js
import axios from 'axios';

const IMGBB_API_KEY = '146a4454d239db1730e71c67788aa0b8';//REACT_APP_IMGBB_KEY || 'your-imgbb-api-key-here';
const STORAGE_KEY = 'cameraApp_photos';

/**
 * Upload image to ImgBB cloud storage
 */
export const uploadImageToCloud = async (fileOrBlob) => {
  try {
    if (!IMGBB_API_KEY || IMGBB_API_KEY === 'your-imgbb-api-key-here') {
      console.warn('⚠️ ImgBB API key not configured');
      return {
        success: false,
        error: 'API key not configured. Please add REACT_APP_IMGBB_KEY to your .env file'
      };
    }

    const formData = new FormData();
    formData.append("image", fileOrBlob);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData
    );

    if (!response.data.success) {
      return { success: false, error: response.data.error?.message };
    }

    return {
      success: true,
      url: response.data.data.url,
      displayUrl: response.data.data.display_url,
      thumb: response.data.data.thumb?.url || response.data.data.url, // Add thumb
      deleteUrl: response.data.data.delete_url
    };
  } catch (error) {
    console.error('❌ Upload error:', error);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Save photo data to localStorage
 */
export const savePhotoLocally = (photoData) => {
  try {
    const photos = getLocalPhotos();
    const newPhoto = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...photoData,
    };
    
    photos.unshift(newPhoto); // Add to beginning of array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    
    console.log('✅ Photo saved locally:', newPhoto.id);
    return true;
  } catch (error) {
    console.error('❌ Error saving photo locally:', error);
    return false;
  }
};

/**
 * Get all photos from localStorage
 */
export const getLocalPhotos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('📷 No photos in localStorage yet');
      return [];
    }
    
    const photos = JSON.parse(stored);
    console.log(`✅ Loaded ${photos.length} photos from localStorage`);
    return photos;
  } catch (error) {
    console.error('❌ Error loading photos:', error);
    return [];
  }
};

/**
 * Delete a photo from localStorage
 */
export const deleteLocalPhoto = (photoId) => {
  try {
    const photos = getLocalPhotos();
    const filteredPhotos = photos.filter(photo => photo.id !== photoId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPhotos));
    console.log('✅ Photo deleted:', photoId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting photo:', error);
    return false;
  }
};

/**
 * Clear all photos from localStorage
 */
export const clearAllPhotos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ All photos cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing photos:', error);
    return false;
  }
};