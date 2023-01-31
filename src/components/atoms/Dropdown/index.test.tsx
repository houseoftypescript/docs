import Dropdown from '.';
import { render } from '@testing-library/react';

describe('Dropdown', () => {
  test('render default', () => {
    const wrapper = render(<Dropdown icon={<></>} title="title" />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
