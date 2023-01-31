import Logo from '.';
import { render } from '@testing-library/react';

describe('Logo', () => {
  test('render default', () => {
    const wrapper = render(<Logo teamId="teamId" />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
