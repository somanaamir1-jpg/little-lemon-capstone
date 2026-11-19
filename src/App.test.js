import { render, screen } from '@testing-library/react';
import App, { initializeTimes, updateTimes } from './App';

test('renders Reserve a Table heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Reserve a Table/i });
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns expected default times', () => {
  const times = initializeTimes();
  expect(times).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00']);
});

test('updateTimes returns updated times array', () => {
  const state = ['17:00'];
  const nextState = updateTimes(state, { type: 'UPDATE_TIMES', date: '2026-12-01' });
  expect(nextState.length).toBeGreaterThan(0);
});
