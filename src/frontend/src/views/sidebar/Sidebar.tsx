import React from 'react';
import './Sidebar.css';

export default function Sidebar({ onClose, showCloseButton }) {
  const onCloseHandler = (e: any) => {
    e.stopPropagation();

    onClose();
  };

  return (
    <section>
      {showCloseButton && <button onClick={onCloseHandler}>X</button>}
    </section>
  );
}
