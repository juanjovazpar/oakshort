import React from 'react';
import './Signup.css';

export default function Signup() {
  return (
    <form>
      <input type="text" name="email" />
      <input type="text" name="password" />
      <button type="submit">Signup</button>
    </form>
  );
}
