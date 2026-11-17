import React from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

export default function Philosophy() {
  const { navigateTo } = useApp();

  return (
    <section className="silver-section section" id="philosophySection">
      <div className="container about-preview">
        <div className="about-stamp reveal">
          <span className="eyebrow">02 / The philosophy</span>
          <div className="stamp-orbit continuous-spin">
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="stamp-infinity">
              <span>∞</span>
            </div>
          </div>
          <div className="mono" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#696b76', marginTop: '18px' }}>
            SINGULARITY AS A STARTING POINT
          </div>
        </div>

        <div className="about-copy reveal delay-1">
          <h2>
            <SplitText text="Ketika cara lama mencapai batasnya," speed={0.02} baseDelay={0.05} />{' '}
            <SplitText text="ciptakan pendekatan baru." speed={0.02} baseDelay={0.6} className="purple-accent-text" />
          </h2>
          <p>
            SNG terinspirasi dari konsep <b>Singularity</b> dalam matematika dan sains—titik ketika suatu nilai menjadi tidak terhingga atau tidak terdefinisi, sehingga pendekatan konvensional tidak lagi cukup.
          </p>
          <p>
            Bagi SNG, singularity adalah simbol transformasi. Kami mempertemukan data, kreativitas, dan teknologi untuk merancang strategi digital yang adaptif, terintegrasi, serta sesuai karakter setiap bisnis.
          </p>
          <div className="about-bottom">
            <span>SNG is more than a name</span>
            <button
              className="philosophy-text-link"
              onClick={() => navigateTo('about')}
            >
              Baca filosofi lengkap ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
