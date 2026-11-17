import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

const STEPS = [
  {
    num: '01',
    title: 'Research & Discovery',
    tag: 'EXPLORE',
    icon: '⌕',
    desc: 'Memahami tujuan bisnis, kebutuhan mitra, audiens, kompetitor, serta peluang pasar melalui audit data mendalam.',
    details: [
      'Audit kehadiran digital & media sosial saat ini',
      'Analisis karakter audiens dan preferensi segmen',
      'Benchmarking kompetitor langsung & positioning pasar',
      'Identifikasi peluang diferensiasi dan kanal prioritas'
    ],
    deliverable: 'Digital Audit Report & Opportunity Matrix'
  },
  {
    num: '02',
    title: 'Strategic Planning',
    tag: 'DESIGN',
    icon: '⌁',
    desc: 'Menyusun arah komunikasi terintegrasi, target audiens, perencanaan pilar konten, alokasi kanal, dan indikator performa (KPI).',
    details: [
      'Penyusunan Content Pillars & Brand Voice Guidelines',
      'Pemetaan Customer Journey dari awareness hingga konversi',
      'Rencana kampanye bulanan & kalender editorial',
      'Penetapan KPI realistis dan metrik evaluasi berkala'
    ],
    deliverable: 'Integrated Marketing Playbook & Editorial Calendar'
  },
  {
    num: '03',
    title: 'Creative Execution',
    tag: 'LAUNCH',
    icon: '✳',
    desc: 'Mengembangkan konten multimedia kreatif, pengelolaan kanal harian, dan eksekusi kampanye yang relevan dengan tren.',
    details: [
      'Produksi konten visual, copywriting, dan format video pendek',
      'Distribusi terjadwal di kanal prioritas (Social, Web, Chat)',
      'Community management dan interaksi responsif dengan audiens',
      'Penerapan teknik SEO dan optimasi katalog digital'
    ],
    deliverable: 'Published Content Assets & Active Campaign Run'
  },
  {
    num: '04',
    title: 'Measure & Optimize',
    tag: 'ITERATE',
    icon: '↗',
    desc: 'Mengevaluasi jangkauan, interaksi, konversi, dan performa kanal secara berkala untuk menentukan optimasi berkelanjutan.',
    details: [
      'Pelaporan performa berbasis data analitik real-time',
      'Evaluasi efektivitas konten terbaik vs perlu perbaikan',
      'A/B testing format dan sudut komunikasi baru',
      'Rekomendasi iterasi strategis untuk siklus pertumbuhan berikutnya'
    ],
    deliverable: 'Monthly Performance Analytics & Growth Action Plan'
  }
];

export default function Approach() {
  const { navigateTo } = useApp();
  // Closed by default as requested: none open initially
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (idx) => {
    setOpenStep((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="approach section" id="approachSection">
      <div className="container approach-layout">
        <div className="approach-intro reveal">
          <span className="eyebrow">03 / How we work</span>
          <h2>
            <SplitText text="Dari insight menuju" speed={0.025} baseDelay={0.05} />{' '}
            <SplitText text="impact." className="gradient-text" speed={0.025} baseDelay={0.45} />
          </h2>
          <p>
            Setiap proyek dimulai dengan memahami kondisi bisnis. Kami merancang strategi, menjalankan solusi, lalu mengevaluasi performanya untuk menentukan langkah berikutnya.
          </p>
          <div className="approach-note">
            <span className="mono">INTERACTIVE WORKFLOW</span>
            <p style={{ fontSize: '11px', color: '#9e9aa9', margin: '6px 0 0', lineHeight: '1.6' }}>
              Klik tiap tahapan untuk melihat ruang lingkup dan output kerja nyata tim SNG.
            </p>
          </div>
          <button
            className="btn btn-outline"
            style={{ marginTop: '24px' }}
            onClick={() => navigateTo('about')}
          >
            Pelajari pendekatan SNG ↗
          </button>
        </div>

        <div className="steps-accordion reveal delay-1">
          {STEPS.map((step, idx) => {
            const isOpen = openStep === idx;
            return (
              <div
                key={step.num}
                className={`accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleStep(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="accordion-left">
                    <span className="accordion-num">{step.num}</span>
                    <div>
                      <h3 className="accordion-title">{step.title}</h3>
                      <span className="accordion-tag">{step.tag}</span>
                    </div>
                  </div>
                  <div className="accordion-right">
                    <span className="accordion-icon">{step.icon}</span>
                    <span className={`accordion-chevron ${isOpen ? 'rotated' : ''}`}>▾</span>
                  </div>
                </button>

                <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                  <div className="accordion-body-inner">
                    <div className="accordion-body-content">
                      <p className="accordion-desc">{step.desc}</p>
                      <div className="accordion-details-grid">
                        <div className="accordion-subcol">
                          <small className="mono">AKTIVITAS UTAMA</small>
                          <ul className="accordion-list">
                            {step.details.map((item, dIdx) => (
                              <li key={dIdx}>
                                <span className="bullet-point">▸</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="accordion-subcol deliverable-box">
                          <small className="mono">DELIVERABLE UTAMA</small>
                          <b>{step.deliverable}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
