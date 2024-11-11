import type { Meta } from '@storybook/react';
import Ping from './Ping';

const meta: Meta<typeof Ping> = {
  component: Ping,
  title: 'Feedback/Ping',
};
export default meta;

export const Primary = {
  args: {
    label: '',
    children: (
      <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
        Button with ping
      </button>
    ),
  },
};
