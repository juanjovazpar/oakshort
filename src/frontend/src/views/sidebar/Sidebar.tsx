import React from 'react';
import './Sidebar.css';

export default function Sidebar({ onClose }) {
  const onCloseHandler = (e: any) => {
    e.stopPropagation();

    onClose();
  };

  return (
    <section>
      <button onClick={onCloseHandler}>X</button>
    </section>
  );
}
