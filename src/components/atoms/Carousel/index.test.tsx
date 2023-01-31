import Carousel from '.';
import { render } from '@testing-library/react';

describe('Carousel', () => {
  test('render default', () => {
    const wrapper = render(<Carousel />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
