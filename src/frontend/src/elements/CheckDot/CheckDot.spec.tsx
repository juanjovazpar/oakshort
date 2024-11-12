import { render } from '@testing-library/react';

import CheckDot from './CheckDot';

describe('CheckDot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckDot />);
    expect(baseElement).toBeTruthy();
  });
});
