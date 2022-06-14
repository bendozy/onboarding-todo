import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Route, Router, Routes } from 'react-router-dom';

import * as api from '../../api/tasks';
import TaskList from './index';

jest.mock('../../api/tasks');

expect.extend(toHaveNoViolations);

describe('<TaskList />', () => {
  const tasks: ITask[] = [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    },
  ];

  it('has no accessibility violations and show loading icon', async () => {
    jest.spyOn(api, 'getUserTasks').mockResolvedValue([]);

    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    const { container } = render(
      <Router location={history.location} navigator={history}>
        <TaskList defaultUserId={1} />
      </Router>,
    );

    screen.getByText('Task List');
    screen.getByTestId('loading-icon');

    await waitFor(() => {
      expect(screen.queryByTestId('loading-icon')).not.toBeInTheDocument();
    });

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render all items in a TaskList Component', async () => {
    jest.spyOn(api, 'getUserTasks').mockResolvedValue(tasks);

    const history = createMemoryHistory();
    const route = '/users/1';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/users/:userId" element={<TaskList />} />
        </Routes>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('delectus aut autem')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('fugiat veniam minus')).toBeInTheDocument();
    });

    expect(screen.getByText('et porro tempora')).toBeInTheDocument();
  });

  it('should click Task Component', async () => {
    jest.spyOn(api, 'getUserTasks').mockResolvedValue(tasks);
    jest
      .spyOn(api, 'updateUserTask')
      .mockResolvedValue({ ...tasks[0], completed: true });

    const history = createMemoryHistory();
    const route = '/users/1';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/users/:userId" element={<TaskList />} />
        </Routes>
      </Router>,
    );

    userEvent.click(
      await screen.findByRole('button', { name: 'delectus aut autem' }),
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-icon')).not.toBeInTheDocument();
    });

    expect(api.updateUserTask).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('delectus aut autem')).toBeInTheDocument();
    });
  });
});
