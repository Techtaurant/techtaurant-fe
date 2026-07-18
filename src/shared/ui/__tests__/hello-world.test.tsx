import { render, screen } from '@testing-library/react';

describe('test environment', () => {
  it('renders Hello, world!', () => {
    render(<h1>Hello, world!</h1>);

    expect(screen.getByRole('heading', { name: 'Hello, world!' })).toBeInTheDocument();
  });
});
