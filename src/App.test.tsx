import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { App } from './App';

describe('App', () => {
  it('Renders Count', () => {
    render(
      <Router basename="/">
        <App />
      </Router>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Count');
  });
});
