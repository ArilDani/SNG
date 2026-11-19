import React from 'react';
import { useApp } from '../context/AppContext';
import TeamSection from '../components/TeamSection';

export default function AboutPage() {
  const { settings } = useApp();

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">SNG / About us</span>
          <h1 className="hero-fade-up">
            <span>We turn new</span><br />
            <span className="gradient-text">possibilities into growth.</span>
          </h1>
          <p>
            Kami percaya bahwa pertumbuhan digital yang berkelanjutan dimulai dari pemahaman yang tepat, strategi yang terukur, dan koneksi antarkanal yang saling mendukung.
          </p>
        </div>
      </div>

      <div className="page-content silver-section">
        <div className="container about-two">
          <div className="copy-panel vision-panel">
            <span className="eyebrow">01 / Our vision</span>
            <h2>Arah yang ingin kami wujudkan.</h2>
            <p>
              {settings.aboutVision ||
                'Menjadi agensi digital berbasis data yang inovatif dan adaptif dalam membantu UMKM mengembangkan bisnis melalui pemasaran digital yang terintegrasi, terukur, dan sesuai dengan kebutuhan mitra.'}
            </p>
            <div className="stamp-orbit continuous-spin vision-orbit">
              <div className="orbit-ring ring-1"></div>
              <div className="orbit-ring ring-2"></div>
              <div className="stamp-infinity">
                <span>∞</span>
              </div>
            </div>
            <div className="mono vision-orbit-caption">
              SINGULARITY AS A STARTING POINT
            </div>
            <div className="vision-pillars">
              <span className="vision-tag">✦ Data-Driven</span>
              <span className="vision-tag">✦ Adaptive Strategy</span>
              <span className="vision-tag">✦ Integrated Growth</span>
            </div>
          </div>

          <div className="copy-panel">
            <span className="eyebrow">02 / Our mission</span>
            <h2>Bagaimana kami bergerak.</h2>
            <div className="mission-list mission-grid">
              <div className="mission-item">
                <b>01 — Adapt to the audience</b>
                <p>
                  Mengoptimalkan media sosial dengan menyesuaikan strategi dan konten terhadap tren, karakteristik audiens, serta perkembangan platform.
                </p>
              </div>
              <div className="mission-item">
                <b>02 — Plan with intention</b>
                <p>
                  Merancang kampanye terstruktur mulai dari perencanaan konten, target audiens, pelaksanaan, hingga evaluasi.
                </p>
              </div>
              <div className="mission-item">
                <b>03 — Decide with data</b>
                <p>
                  Memanfaatkan data, social media analytics, CRM, SEO, dan teknik digital marketing sebagai dasar keputusan.
                </p>
              </div>
              <div className="mission-item">
                <b>04 — Connect the ecosystem</b>
                <p>
                  Mengintegrasikan media sosial, e-commerce, website, Blogger, WhatsApp, dan platform lainnya.
                </p>
              </div>
              <div className="mission-item">
                <b>05 — Build relevant solutions</b>
                <p>
                  Mengidentifikasi masalah, kebutuhan, dan karakteristik UMKM untuk menentukan layanan yang tepat sasaran.
                </p>
              </div>
              <div className="mission-item">
                <b>06 — Optimize for growth</b>
                <p>
                  Mendorong pertumbuhan melalui evaluasi, analisis performa, dan optimasi strategi digital secara berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ background: '#11111a' }}>
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / The SNG philosophy</span>
              <h2>
                Singularity is<br />
                <span className="gradient-text">a point of change.</span>
              </h2>
            </div>
            <p>
              Ketika pendekatan konvensional tidak lagi cukup, pendekatan baru membuka kemungkinan yang berbeda.
            </p>
          </div>

          <div className="principle-grid">
            <article className="principle">
              <div className="letter">S</div>
              <h3>Strategy</h3>
              <p>Merancang arah berdasarkan data, tren, dan kebutuhan mitra.</p>
            </article>

            <article className="principle">
              <div className="letter">N</div>
              <h3>Nexus</h3>
              <p>Menghubungkan data, teknologi, kreativitas, dan kanal digital.</p>
            </article>

            <article className="principle">
              <div className="letter">G</div>
              <h3>Growth</h3>
              <p>Mendorong pertumbuhan melalui evaluasi dan optimasi.</p>
            </article>
          </div>
        </div>
      </div>

      {/* 04 / Behind the SNG Team Section */}
      <TeamSection inAboutPage={true} />
    </div>
  );
}

