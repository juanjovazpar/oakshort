import React, { FormEvent } from 'react';

import './Hello.css';

export default function Hello({ onSubmit }) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" />
        <button type="submit">Cut</button>
      </form>
      <a href="/signin">Login</a>
      <a href="/signup">Create account</a>
    </section>
  );
}
