import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import UserList from './';

const users: IUser[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: -37.3159,
        lng: 81.1496,
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: -43.9509,
        lng: -34.4618,
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
];

it('should render UserList Component with Loading icon', async () => {
  const history = createMemoryHistory();
  const route = '/users/1';

  history.push(route);

  render(
    <Router location={history.location} navigator={history}>
      <UserList isLoading={true} users={[]} />
    </Router>,
  );

  screen.getByTestId('loading-icon');
});

it('should render UserList Component with Loading data', async () => {
  const history = createMemoryHistory();
  const route = '/users/1';

  history.push(route);

  render(
    <Router location={history.location} navigator={history}>
      <UserList isLoading={false} users={users} />
    </Router>,
  );

  screen.getAllByText('Leanne Graham');
  screen.getAllByText('Ervin Howell');
});

it('should render UserList Component with select option', async () => {
  const history = createMemoryHistory();
  const route = '/users/1';

  history.push(route);

  render(
    <Router location={history.location} navigator={history}>
      <UserList isLoading={false} users={users} />
    </Router>,
  );

  expect(screen.getAllByRole('option').length).toBe(2);
  expect(
    (screen.getByRole('option', { name: 'Leanne Graham' }) as HTMLOptionElement)
      .selected,
  ).toBe(true);
  expect(
    (screen.getByRole('option', { name: 'Ervin Howell' }) as HTMLOptionElement)
      .selected,
  ).toBe(false);

  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Ervin Howell' }),
  );

  expect(
    (screen.getByRole('option', { name: 'Ervin Howell' }) as HTMLOptionElement)
      .selected,
  ).toBe(true);
});
