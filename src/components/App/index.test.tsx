import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './';

it('should render App Component', async () => {
  const history = createMemoryHistory();
  const route = '/';

  history.push(route);

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>,
  );

  screen.getAllByText('Onboarding Tasks');
});
