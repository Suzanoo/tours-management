import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = (props) => {
  const { rating, fullIconColor, halfIconColor, emptyIconColor } = props;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} color={fullIconColor} />);
    } else if (rating >= i + 0.5) {
      stars.push(<FaStarHalfAlt key={i} color={halfIconColor} />);
    } else {
      stars.push(<FaRegStar key={i} color={emptyIconColor} />);
    }
  }

  return (
    <div
      style={{
        width: '100px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {stars}
    </div>
  );
};

StarRating.defaultProps = {
  fullIconColor: '#ffc107',
  halfIconColor: '#ffc107',
  emptyIconColor: '#e4e5e9',
};

export default StarRating;
