import { render } from '@testing-library/react';
import InputMessage from './InputMessage';

describe('InputMessage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputMessage label="Error" />);
    expect(baseElement).toBeTruthy();
  });
});
