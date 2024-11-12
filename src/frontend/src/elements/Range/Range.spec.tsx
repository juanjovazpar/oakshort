import { render } from '@testing-library/react';

import Range from './Range';

describe('Range', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Range />);
    expect(baseElement).toBeTruthy();
  });
});
