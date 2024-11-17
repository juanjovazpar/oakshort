import { render } from '@testing-library/react';

import HorizontalBarsChart from './HorizontalBarsChart';

describe('HorizontalBarsChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalBarsChart />);
    expect(baseElement).toBeTruthy();
  });
});
