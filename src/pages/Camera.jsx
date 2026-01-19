import React, { useRef, useState, useEffect } from 'react';
import { uploadImageToCloud, savePhotoLocally } from '../utils/imageUpload';
import '../App.css';
import { photoAPI } from '../services/api';
export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const startCamera = async () => {
    console.log('🎥 Starting camera...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      console.log('✅ Camera access granted');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          console.log('✅ Video metadata loaded');

          videoRef.current.play()
            .then(() => {
              console.log('✅ Video playing:', {
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
              });
              setIsStreaming(true);
            })
            .catch(err => {
              console.error('❌ Video play failed:', err);
              alert('Failed to play video: ' + err.message);
            });
        };
      }
    } catch (err) {
      console.error('❌ Camera error:', err);
      alert('Camera access denied: ' + err.message);
    }
  };

  const stopCamera = () => {
    console.log('⏹️ Stopping camera');
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const capturePhoto = () => {
    console.log('📸 Capture button clicked');

    if (!videoRef.current || !canvasRef.current) {
      alert('Video not ready');
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert('⚠️ Video dimensions not ready. Please wait a moment and try again.');
      console.log('Video readyState:', video.readyState);
      return;
    }

    console.log('✅ Capturing from video:', video.videoWidth, 'x', video.videoHeight);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
    console.log('✅ Image captured, size:', imageUrl.length, 'bytes');
    setCapturedImage(imageUrl);
    setUploadSuccess(false);
  };

  // const uploadPhoto = async () => {
  //   if (!capturedImage) return;
  //   setUploading(true);
  //   setUploadSuccess(false);

  //   try {
  //     const blob = await new Promise((resolve) =>
  //       canvasRef.current.toBlob(resolve, 'image/jpeg', 0.9)
  //     );

  //     const result = await uploadImageToCloud(blob);

  //     if (result.success) {
  //       const saved = savePhotoLocally({
  //         imageUrl: result.url,
  //         thumbUrl: result.thumb,
  //         displayUrl: result.displayUrl,
  //       });
        
  //       if (saved) {
  //         setUploadSuccess(true);
  //         alert('✅ Photo uploaded successfully!');
  //         setCapturedImage(null);
  //       } else {
  //         alert('⚠️ Photo uploaded but failed to save locally');
  //       }
  //     } else {
  //       alert('❌ Upload failed: ' + result.error);
  //     }
  //   } catch (err) {
  //     alert('❌ Upload error: ' + err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };
const uploadPhoto = async () => {
  if (!capturedImage) return;
  setUploading(true);
  setUploadSuccess(false);

  try {
    // Convert canvas to blob
    const blob = await new Promise((resolve) =>
      canvasRef.current.toBlob(resolve, 'image/jpeg', 0.9)
    );

    // Upload to ImgBB
    const result = await uploadImageToCloud(blob);

    if (result.success) {
      // Save to backend database
      await photoAPI.uploadPhoto(result.url, ''); // photoURL, empty caption
      
      setUploadSuccess(true);
      alert('✅ Photo uploaded successfully!');
      setCapturedImage(null);
    } else {
      alert('❌ Upload failed: ' + result.error);
    }
  } catch (err) {
    console.error('Upload error:', err);
    alert('❌ Upload error: ' + err.message);
  } finally {
    setUploading(false);
  }
};
  const retakePhoto = () => {
    setCapturedImage(null);
    setUploadSuccess(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>📸 Camera App</h1>
        <div>
          <button onClick={() => window.location.href = '/home'} style={{ padding: '10px 20px', margin: '0 10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>🏠 Home</button>
          <button onClick={() => window.location.href = '/gallery'} style={{ padding: '10px 20px', margin: '0 10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>🖼️ Gallery</button>
        </div>
      </nav>

      <div className="camera-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '15px' }}>
        <h2 className="camera-title">📸 Camera</h2>
        
        {/* ALWAYS show video element */}
        <div style={{ display: (isStreaming && !capturedImage) ? 'block' : 'none', marginBottom: '20px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="video-stream"
            style={{ width: '100%', maxWidth: '600px', height: 'auto',           // ✅ Add this
    aspectRatio: '16/9', display: 'block', margin: '0 auto', borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    backgroundColor: '#000',objectFit: 'cover'}}
          />
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {capturedImage && (
          <div className="preview-section">
            <h3 className="preview-title">Preview:</h3>//className="preview-image"
            <img src={capturedImage} alt="Captured"  style={{
    maxWidth: '100%',
    height: 'auto',
    aspectRatio: '16/9',      // ✅ Add this
    objectFit: 'contain',     // ✅ Add this
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  }}/>
          </div>
        )}

        <div className="button-group" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          {!isStreaming && !capturedImage && (
            <button onClick={startCamera} className="btn btn-primary" style={{ padding: '15px 30px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              📷 Start Camera
            </button>
          )}

          {isStreaming && !capturedImage && (
            <>
              <button onClick={capturePhoto} className="btn btn-success" style={{ padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                📸 Capture Photo
              </button>
              <button onClick={stopCamera} className="btn btn-danger" style={{ padding: '15px 30px', background: '#f44336', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ⏹️ Stop Camera
              </button>
            </>
          )}
          
          {capturedImage && (
            <>
              <button onClick={uploadPhoto} disabled={uploading} className={`btn ${uploading ? 'btn-disabled uploading' : 'btn-success'}`} style={{ padding: '15px 30px', background: uploading ? '#999' : '#2196F3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {uploading ? '⏳ Uploading...' : '☁️ Upload to Cloud'}
              </button>
              <button onClick={retakePhoto} disabled={uploading} className="btn btn-warning" style={{ padding: '15px 30px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                🔄 Retake
              </button>
            </>
          )}
        </div>

        {uploadSuccess && (
          <div className="success-message" style={{ marginTop: '20px', padding: '15px', background: '#4CAF50', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
            ✅ Photo uploaded successfully and saved to your gallery!
          </div>
        )}
      </div>
    </div>
  );
}