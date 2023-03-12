import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div
      style={{
        width: '100px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {[...Array(5)].map((star, index) => {
        return (
          <FaStar
            key={index}
            size={20}
            color={index < rating ? '#ffc107' : '#e4e5e9'}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
