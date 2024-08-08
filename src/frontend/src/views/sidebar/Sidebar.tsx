import React from 'react';
import './Sidebar.css';

export interface SidebarComponentProps {
  onClose: Function;
  showCloseButton: Function;
}

const Sidebar: React.FC<SidebarComponentProps> = ({
  onClose,
  showCloseButton,
}) => {
  const onCloseHandler = (e: any) => {
    e.stopPropagation();

    onClose();
  };

  return (
    <section>
      {showCloseButton && <button onClick={onCloseHandler}>X</button>}
    </section>
  );
};

export default Sidebar;
