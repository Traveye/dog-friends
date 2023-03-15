import React from 'react';

export default function DogImage() {
  const placeholder =
    'https://res.cloudinary.com/datl67gp3/image/upload/v1677887118/cld-sample.jpg';

  const style = {
    backgroundImage: `url(${placeholder})`,
    backgroundSize: "contain",
    borderRadius: '50%',
    width: '250px',
    height: '250px',
    border: '5px solid rgb(223, 207, 62)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={style}>
      <img src={placeholder} alt="dog" style={{ display: 'none' }} />
    </div>
  );
}