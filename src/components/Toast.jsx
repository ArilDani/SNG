import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMessage, toastVisible } = useApp();

  return (
    <div
      className={`toast ${toastVisible ? 'show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {toastMessage}
    </div>
  );
}

