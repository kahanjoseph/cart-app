import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const linkElement = screen.getByText(/left to check out these items!/i);
  expect(linkElement).toBeInTheDocument();
});

test('adds product to cart', () => {

})
