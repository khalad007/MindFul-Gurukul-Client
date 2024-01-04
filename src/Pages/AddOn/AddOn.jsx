import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';

const AddOn = () => {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const webcamRef = React.useRef(null);

  const handleTakePhoto = () => {
    const photoData = webcamRef.current.getScreenshot();
    setCapturedPhoto(photoData);
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Add-On Camera</h2>

      {/* Camera Section */}
      <div className="mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded"
        />
      </div>

      <button
        onClick={handleTakePhoto}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        <FaCamera className="mr-2" /> Take Photo
      </button>

      {capturedPhoto && (
        <div className="mt-4">
          <p className="text-xl font-semibold mb-2">Captured Photo:</p>
          <img src={capturedPhoto} alt="Captured" className="rounded" />
        </div>
      )}

      {/* Gallery Section */}
      <div className="mt-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          className="mb-2"
        />

        {selectedImage && (
          <div>
            <p className="text-xl font-semibold mb-2">Selected Image:</p>
            <img src={selectedImage} alt="Selected" className="rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOn;
