import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

function StoreCard({ store, user }) {
  const [userRating, setUserRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user's rating for this store
  useEffect(() => {
    if (user) {
      const fetchUserRating = async () => {
        try {
          const response = await axios.get(`/api/ratings/${store.id}`);
          setUserRating(response.data.rating);
          setSelectedRating(response.data.rating || 0);
        } catch (error) {
          console.error('Error fetching rating:', error);
        }
      };
      fetchUserRating();
    }
  }, [store.id, user]);

  const handleRatingSubmit = async () => {
    if (!user || !selectedRating) return;
    
    setIsSubmitting(true);
    try {
      await axios.post('/api/ratings', {
        storeId: store.id,
        rating: selectedRating
      });
      setUserRating(selectedRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{store.name}</h5>
        <p className="card-text text-muted">
          <i className="fas fa-map-marker-alt"></i> {store.address}
        </p>
        
        <div className="mb-2">
          <strong>Average Rating:</strong> 
          <StarRating rating={store.average_rating} />
          <span className="ms-2">
            ({store.average_rating ? store.average_rating.toFixed(1) : 'No ratings'})
          </span>
        </div>

        {user && (
          <div className="mt-3">
            <div className="mb-2">
              <strong>Your Rating:</strong>
              <StarRating 
                rating={selectedRating} 
                editable={true}
                onRatingChange={setSelectedRating}
              />
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleRatingSubmit}
              disabled={isSubmitting || !selectedRating || selectedRating === userRating}
            >
              {isSubmitting ? 'Submitting...' : userRating ? 'Update Rating' : 'Submit Rating'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreCard;