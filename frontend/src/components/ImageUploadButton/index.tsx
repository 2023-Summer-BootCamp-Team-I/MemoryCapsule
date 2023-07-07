import React, { useState, useRef } from 'react';

function ImageUploadButton() {
  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 필드 비우기
      fileInputRef.current.click();
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setFile(e.target.result.toString());
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={handleImageClick}
      >
        {file ? (
          <img
            src={file}
            alt="Uploaded Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Upload Image
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {file && <button onClick={handleRemove}>Remove Image</button>}
    </div>
  );
}

export default ImageUploadButton;
