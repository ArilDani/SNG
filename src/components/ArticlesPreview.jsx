import React from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

export default function ArticlesPreview() {
  const { articles, navigateTo } = useApp();
  const displayArticles = articles.slice(0, 3);

  return (
    <section className="article-strip section" id="insightsSection">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">06 / SNG insights</span>
            <h2>
              <SplitText text="Perspektif untuk" speed={0.025} baseDelay={0.05} />{' '}
              <SplitText text="bertumbuh." className="gradient-text" speed={0.025} baseDelay={0.4} />
            </h2>
          </div>
          <p>
            Catatan seputar strategi, data, dan ekosistem digital untuk membantu UMKM mengambil keputusan lebih baik.
          </p>
        </div>

        <div className="article-grid" id="homeArticleGrid">
          {displayArticles.map((a, idx) => (
            <article key={a.id || a._id} className={`article-card interactive-article-card reveal delay-${idx + 1}`}>
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
                <button
                  className="article-read-btn"
                  onClick={() => navigateTo('article-detail', a.id)}
                >
                  Baca artikel ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button className="btn btn-outline" onClick={() => navigateTo('articles')}>
            Lihat semua artikel ↗
          </button>
        </div>
      </div>
    </section>
  );
}
