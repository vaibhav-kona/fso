import React from 'react';

function Button({ name, handleClick }) {
  return (
    <button onClick={handleClick}>{name}</button>
  );
}

export default Button;