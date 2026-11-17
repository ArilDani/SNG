import React from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

export default function ClosingCTA() {
  const { navigateTo } = useApp();

  return (
    <section className="closing" id="closingSection">
      <div className="container">
        <div className="closing-panel reveal">
          <span className="eyebrow">Your next point starts here</span>
          <h2>
            <SplitText text="Setiap bisnis punya titik" speed={0.02} baseDelay={0.05} />{' '}
            <SplitText text="tumbuh berikutnya." speed={0.02} baseDelay={0.45} />
          </h2>
          <p>
            Mari temukan strategi digital yang paling relevan untuk kebutuhan bisnis Anda bersama SNG Agency.
          </p>
          <button className="btn btn-closing-magnetic" onClick={() => navigateTo('contact')}>
            Mulai percakapan ↗
          </button>
        </div>
      </div>
    </section>
  );
}
