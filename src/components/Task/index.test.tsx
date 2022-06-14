import { fireEvent, render, screen } from '@testing-library/react';
import Task from './index';

it('should render Task Component', async () => {
  const task: ITask = {
    userId: 1,
    id: 13,
    title: 'Demo',
    completed: false,
  };

  render(<Task task={task} />);

  screen.getByText('Demo');
  screen.getByRole('button', {
    name: /Demo/i,
  });
});

it('renders a disabled button for a completed Task', async () => {
  const task: ITask = {
    userId: 1,
    id: 12,
    title: 'Completed Demo',
    completed: true,
  };

  render(<Task task={task} />);

  const button = screen.getByRole('button');

  expect(button).toBeDisabled();
});

it('completes an uncompleted Task', async () => {
  const task: ITask = {
    userId: 1,
    id: 13,
    title: 'Demo',
    completed: false,
  };
  const onComplete = jest.fn();

  render(<Task task={task} onComplete={onComplete} />);

  const button = screen.getByRole('button');

  expect(button).not.toBeDisabled();

  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(onComplete).toHaveBeenCalledTimes(1);
});
