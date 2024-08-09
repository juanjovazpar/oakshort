import React from 'react';

export interface SidebarComponentProps {
  metrics: any;
}

const Engagement: React.FC<SidebarComponentProps> = ({ metrics }) => {
  return (
    <section>
      <p>Metrics</p>
    </section>
  );
};

export default Engagement;
