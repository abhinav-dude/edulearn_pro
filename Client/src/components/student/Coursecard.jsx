import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

// Predefined prices for demo
const predefinedPrices = [9200, 5500, 7500, 6400, 6500, 5400];

const Coursecard = ({ course }) => {
  const { currency } = useContext(AppContext);

  // Consistent index from hash
  const getPriceIndex = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // 32-bit int
    }
    return Math.abs(hash) % predefinedPrices.length;
  };

  // Consistent rating count between 200 - 300
  const getRandomRatingCount = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 7) - hash);
    }
    const randomSeed = Math.abs(hash) % 101;
    return 200 + randomSeed;
  };

  const price = predefinedPrices[getPriceIndex(course._id)];
  const rating = 4.2;
  const ratingCount = getRandomRatingCount(course._id);

  return (
    <Link 
      to={'/course/' + course._id} 
      onClick={() => scrollTo(0, 0)} 
      className="border rounded-lg overflow-hidden shadow-sm pb-6 transition-colors duration-300
                 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">{course.courseTitle}</h3>
        
        {/* Hard-coded instructor name */}
        <p className="text-gray-500 dark:text-gray-400">GreatStack</p>
        
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-yellow-600">{rating.toFixed(1)}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500 dark:text-gray-400">({ratingCount})</p>
        </div>

        <p className="text-base font-semibold text-gray-800 dark:text-white">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default Coursecard;
