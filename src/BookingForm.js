import React, { useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(availableTimes[0] || '17:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('Birthday');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
  };

  const isFormValid = date && time && guests >= 1 && guests <= 10 && name.trim().length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Please enter your name (at least 2 characters) and valid booking details.');
      return;
    }
    setError('');
    submitForm({ name, date, time, guests, occasion });
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Table Reservation Form">
      <label htmlFor="res-name">Full Name</label>
      <input
        id="res-name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={2}
      />

      <label htmlFor="res-date">Choose date</label>
      <input
        id="res-date"
        type="date"
        min={today}
        value={date}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        {availableTimes.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        id="guests"
        type="number"
        placeholder="1"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Casual">Casual Dining</option>
      </select>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" aria-label="On Click" disabled={!isFormValid}>
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
