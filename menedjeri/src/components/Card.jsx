import PropTypes from 'prop-types';
import { useState } from 'react';

const Card = ({ item, index }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  console.log(item);

  return (
    <>
      <div className="todo__box" key={index}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <p className={isChecked ? 'cheked' : ''}>{item.data}</p>
        <p className={isChecked ? 'cheked' : ''}>{item.time}</p>
      </div>
    </>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;