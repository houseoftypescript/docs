import PageFooter from '.';
import { render } from '@testing-library/react';

describe('PageFooter', () => {
  test('render default', () => {
    const wrapper = render(<PageFooter />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
