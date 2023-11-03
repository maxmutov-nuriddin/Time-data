import PropTypes from 'prop-types';
import { useState } from 'react';

const Card = ({ item, index }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className="todo__box" key={index}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <p className={isChecked ? 'cheked' : ''}>{item.data}</p>
        <p className={isChecked ? 'cheked' : ''}>{item.date}</p>
        <p className={isChecked ? 'cheked' : ''}>{item.time}</p>
      </div>
    </>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  data: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  index: PropTypes.number
};

export default Card;