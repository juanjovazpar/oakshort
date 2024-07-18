import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';

import './Hello.css';

export default function Hello({ onSubmit }) {
  const isCollapsed = useSelector((state: any) => state.layout.isCollapsed);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="hello-section">
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" />
        <button type="submit">Cut</button>
      </form>
      {isCollapsed && (
        <>
          <a href="/">Hello!</a>
          <a href="/signin">Login</a>
          <a href="/signup">Create account</a>
        </>
      )}
    </section>
  );
}
