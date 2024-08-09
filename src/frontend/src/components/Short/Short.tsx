import React from 'react';
import { IShort } from '../../../../backend/models/short.model';
import Engagement from '../Engagement/Engagement';

interface ShortProps {
  short: IShort;
}

const Short: React.FC<ShortProps> = ({ short }) => {
  const metrics = {};

  return (
    <section>
      <div>
        <button>Clipboard</button>
      </div>
      <div>
        <h4>{short.name}</h4>
        <p>{short.short}</p>
        <p>{short.target}</p>
        <p>
          <span>{short.accessCount} views</span>
          <span>{short.accessLimit} limit</span>
          <span>{short.accessCount} las view</span>
        </p>
      </div>
      <div>
        <button>Copy</button>
        <button>Edit</button>
      </div>
      <Engagement metrics={metrics} />
    </section>
  );
};

export default Short;
