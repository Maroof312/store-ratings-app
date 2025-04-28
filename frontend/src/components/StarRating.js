import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating = 0, editable = false, onRatingChange = () => {} }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (editable) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (newRating) => {
    if (editable) {
      setHoverRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="d-inline-flex ms-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: editable ? 'pointer' : 'default' }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          <FaStar
            color={(hoverRating || rating) >= star ? '#ffc107' : '#e4e5e9'}
            size={18}
          />
        </span>
      ))}
    </div>
  );
}

export default StarRating;