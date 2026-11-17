import React from 'react';
import { useApp } from '../context/AppContext';

export default function ArticlesPage() {
  const { articles, navigateTo } = useApp();

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">SNG / Articles & insights</span>
          <h1 className="hero-fade-up">
            <span>Ideas that move</span><br />
            <span className="gradient-text">business forward.</span>
          </h1>
          <p>
            Wawasan ringkas tentang pemasaran digital, strategi berbasis data, pengelolaan kanal, dan pertumbuhan UMKM.
          </p>
        </div>
      </div>

      <div className="page-content" style={{ background: '#11111a' }}>
        <div className="container">
          <div className="article-list">
            {articles.map((a) => (
              <article key={a.id || a._id} className="article-card">
                <div className="article-art">
                  <span>{a.category}</span>
                </div>
                <div className="article-body">
                  <div className="article-meta">
                    <span>{a.date}</span>
                    <span>{a.read}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <button onClick={() => navigateTo('article-detail', a.id)}>
                    Baca artikel ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

