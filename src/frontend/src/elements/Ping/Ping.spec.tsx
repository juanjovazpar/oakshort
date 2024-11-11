import { render } from '@testing-library/react';

import Ping from './Ping';

describe('Ping', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ping />);
    expect(baseElement).toBeTruthy();
  });
});
