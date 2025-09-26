import { useState } from 'react';
import { FaBalanceScale } from 'react-icons/fa';

const Button = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div>
      <button className="bg-dark rounded-5" onClick={handleClick}>
        {isLoggedIn ? (
          <div className="text-info ">
            My Principle's
            <FaBalanceScale className="ms-1 text-info" />
          </div>
        ) : (
          <div className="text-danger">
            My Principle's
            <FaBalanceScale className="ms-1 text-danger" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Button;
