import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();

describe('Button component', () => {
  test('Button renders', () => {
    render(<Button children='Button' onClick={onClick} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/button/i)).toBeInTheDocument();
  });

  test('onClick works', () => {
    const AnotherOnClick = jest.fn();
    render(<Button children='Button' onClick={AnotherOnClick} />);
    userEvent.click(screen.getByRole('button'))
    expect(AnotherOnClick).toHaveBeenCalled();
  });

  test('Button snapshot', () => {
    const btn = render(<Button children='Button' onClick={onClick} />);
    expect(btn).toMatchSnapshot();
  });
});