import React, { useEffect, useState } from 'react';

// Rating Component
const Rating = ({ initialRating = 0, onRate }) => {
  // State variables
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Function to handle rating selection
  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value); // Call the onRate function if provided
  };

  // Effect to update rating when initialRating changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  // Render stars
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1; // Calculate the star value (1 to 5)
        return (
          <span
            key={index}
            style={{
              fontSize: '2rem', // Size of the stars
              cursor: 'pointer', // Pointer cursor on hover
              color: starValue <= (hover || rating) ? 'gold' : 'lightgray', // Color based on hover or rating
              transition: 'color 0.2s ease, transform 0.2s ease', // Smooth color and transform transition
              marginRight: index !== 4 ? '8px' : '0', // Spacing between stars
              transform: starValue <= (hover || rating) ? 'scale(1.1)' : 'scale(1)', // Scale effect on hover
            }}
            onClick={() => handleRating(starValue)} // Handle star click
            onMouseEnter={() => setHover(starValue)} // Set hover state on mouse enter
            onMouseLeave={() => setHover(0)} // Reset hover state on mouse leave
          >
            &#9733; {/* Star character */}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
