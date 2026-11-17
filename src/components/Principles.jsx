import React from 'react';

export default function Principles() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section className="principles section" id="principlesSection">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">01 / The SNG principles</span>
            <h2>
              Tiga nilai. <span className="gradient-text">Satu arah pertumbuhan.</span>
            </h2>
          </div>
          <p>Fondasi cara kami berpikir, menghubungkan, dan membantu bisnis bergerak maju.</p>
        </div>

        <div className="principle-grid">
          <article
            className="principle interactive-tilt reveal"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-sheen"></div>
            <small>01 — THINK</small>
            <div className="letter">S</div>
            <h3>Strategy</h3>
            <p>Strategi digital marketing yang berangkat dari data, tren, dan kebutuhan nyata setiap mitra.</p>
          </article>

          <article
            className="principle interactive-tilt reveal delay-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-sheen"></div>
            <small>02 — CONNECT</small>
            <div className="letter">N</div>
            <h3>Nexus</h3>
            <p>Menghubungkan data, teknologi, kreativitas, dan kanal digital dalam satu ekosistem.</p>
          </article>

          <article
            className="principle interactive-tilt reveal delay-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-sheen"></div>
            <small>03 — GROW</small>
            <div className="letter">G</div>
            <h3>Growth</h3>
            <p>Pertumbuhan yang diarahkan melalui pengukuran, evaluasi, dan optimasi berkelanjutan.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
