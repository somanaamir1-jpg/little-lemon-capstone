import React, { useReducer, useState } from 'react';
import BookingForm from './BookingForm';

export const initializeTimes = () => ['17:00', '18:00', '19:00', '20:00', '21:00'];

export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    return ['17:00', '18:00', '19:00', '20:00', '21:00'];
  }
  return state;
};

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const submitForm = (formData) => {
    setBookingConfirmed(formData);
  };

  return (
    <>
      <header>
        <h1 style={{ color: '#f4ce14', margin: 0 }}>Little Lemon</h1>
        <nav aria-label="Main Navigation">
          <ul>
            <li><a href="#reserve">Reserve a Table</a></li>
          </ul>
        </nav>
      </header>

      <main id="reserve">
        <h2>Reserve a Table</h2>
        {bookingConfirmed ? (
          <section className="confirmation" aria-live="polite">
            <h3>Booking Confirmed!</h3>
            <p>
              Thank you, <strong>{bookingConfirmed.name}</strong>. Your table for{' '}
              <strong>{bookingConfirmed.guests}</strong> on{' '}
              <strong>{bookingConfirmed.date}</strong> at{' '}
              <strong>{bookingConfirmed.time}</strong> ({bookingConfirmed.occasion}) is reserved.
            </p>
            <button type="button" onClick={() => setBookingConfirmed(null)}>
              Book Another Table
            </button>
          </section>
        ) : (
          <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        )}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
