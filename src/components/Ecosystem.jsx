import React, { useState } from 'react';
import SplitText from './SplitText';
import sngLogo from '../assets/sng-logo-clean.png';

const NODES = [
  { id: 'n1', icon: '◎', label: 'Social Media', desc: 'Membangun jangkauan, interaksi komunitas, dan pengenalan brand melalui Instagram & TikTok.' },
  { id: 'n2', icon: '▣', label: 'E-commerce', desc: 'Optimasi pengalaman belanja dan konversi transaksi di Shopee, Tokopedia, dan TikTok Shop.' },
  { id: 'n3', icon: '⌘', label: 'Website', desc: 'Pusat informasi resmi, landing page terstruktur, dan representasi identitas brand terpercaya.' },
  { id: 'n4', icon: '◉', label: 'WhatsApp', desc: 'Kanal komunikasi langsung bernilai tinggi untuk konsultasi, closing penjualan, dan retensi.' },
  { id: 'n5', icon: '⌕', label: 'SEO', desc: 'Memastikan bisnis ditemukan saat calon pembeli mencari solusi relevan di mesin pencari Google.' },
  { id: 'n6', icon: '◫', label: 'CRM & Data', desc: 'Pengelolaan data pelanggan dan riwayat transaksi sebagai dasar keputusan pemasaran masa depan.' }
];

export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section className="ecosystem section" id="ecosystemSection">
      <div className="container ecosystem-layout">
        <div className="ecosystem-copy reveal">
          <span className="eyebrow">05 / The nexus ecosystem</span>
          <h2>
            <SplitText text="Bukan sekadar hadir di banyak kanal." speed={0.02} baseDelay={0.05} />{' '}
            <SplitText text="Semua harus terhubung." className="gradient-text" speed={0.02} baseDelay={0.65} />
          </h2>
          <p>
            Media sosial, e-commerce, website, Blogger, WhatsApp, CRM, dan SEO memiliki peran berbeda. SNG membantu menyelaraskan semuanya agar perjalanan pelanggan lebih utuh—dari mengenal brand hingga bertransaksi.
          </p>
          <div className="ecosystem-tags">
            <span className="eco-tag">Connected touchpoints</span>
            <span className="eco-tag">Consistent brand</span>
            <span className="eco-tag">Measurable journey</span>
          </div>

          {/* Reserved height container to completely prevent layout jumping / jitter */}
          <div className="node-callout-shelf">
            {activeNode ? (
              <div className="active-node-callout active">
                <b>
                  <span className="callout-icon">{activeNode.icon}</span> {activeNode.label}
                </b>
                <p>{activeNode.desc}</p>
              </div>
            ) : (
              <div className="active-node-callout idle">
                <span className="mono" style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#888496' }}>
                  ✦ ARAHKAN KURSOR KE SALAH SATU SIMPUL DI SEBELAH KANAN
                </span>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#7a7687' }}>
                  Setiap simpul mewakili titik sentuh penting dalam ekosistem terintegrasi SNG.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="network reveal delay-1">
          <div className={`network-core ${activeNode ? 'core-pulsing' : ''}`}>
            <div className="network-core-inner">
              <img src={sngLogo} alt="SNG Agency" className="network-core-logo" />
              <small>THE NEXUS</small>
            </div>
          </div>

          {NODES.map((n) => {
            const isCurrent = activeNode?.id === n.id;
            return (
              <div
                key={n.id}
                className={`node ${n.id} ${isCurrent ? 'active-node' : ''}`}
                onPointerEnter={() => setActiveNode(n)}
                onPointerLeave={() => setActiveNode(null)}
              >
                <b>{n.icon}</b> {n.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
