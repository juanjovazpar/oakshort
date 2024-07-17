import React from 'react';
import './Signin.css';

export default function Signin() {
  return (
    <form>
      <input type="text" name="email" />
      <input type="text" name="password" />
      <button type="submit">Signin</button>
    </form>
  );
}
