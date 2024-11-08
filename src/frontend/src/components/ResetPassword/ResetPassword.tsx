import React from 'react';

import './ResetPassword.css';

export default function ResetPassword() {
  return (
    <form>
      <input type="text" name="password" />
      <input type="text" name="passwordConfirmation" />
    </form>
  );
}
