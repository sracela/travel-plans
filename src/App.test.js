import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a div', () => {
  const component = render(<App />);
  const div = component.container.querySelector('div')
  expect(div).toBeDefined()
});
