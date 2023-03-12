import { useState } from 'react';
import StarRating from '../components/StarRating';

const TourDetail = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send the review data to your server or do something else with it
    console.log(`Rating: ${rating}, Review: ${review}`);
  };

  return (
    <div>
      <h2>Tour Program Name</h2>
      <p>Location: Paris, France</p>
      <p>Duration: 7 days</p>
      <h3>Description</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo
        tortor eget justo tristique, sed posuere ipsum volutpat. Sed eu magna
        vel risus molestie commodo at et urna. Nulla venenatis euismod
        efficitur. Morbi faucibus velit a nisi dictum luctus.
      </p>
      <h3>Rating</h3>
      <form onSubmit={handleSubmit}>
        <StarRating rating={rating} setRating={setRating} />
        <label htmlFor="review">Leave a review:</label>
        <br />
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default TourDetail;
