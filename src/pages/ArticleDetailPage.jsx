import React from 'react';
import { useApp } from '../context/AppContext';

export default function ArticleDetailPage() {
  const { articles, routeParam, navigateTo } = useApp();

  const article = articles.find((a) => a.id === routeParam) || articles[0];

  if (!article) {
    return (
      <div className="app-page active">
        <div className="page-hero">
          <div className="container">
            <button className="text-link" onClick={() => navigateTo('articles')}>
              ← Kembali ke artikel
            </button>
            <div className="article-detail">
              <h1>Artikel Tidak Ditemukan</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = Array.isArray(article.body)
    ? article.body
    : (typeof article.body === 'string' ? [article.body] : [article.excerpt]);

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <button className="text-link" onClick={() => navigateTo('articles')}>
            ← Kembali ke artikel
          </button>
          <div className="article-detail">
            <span className="eyebrow">
              {article.category} / {article.read || '4 MIN READ'}
            </span>
            <h1>{article.title}</h1>
            <p className="lead">{article.excerpt}</p>
            <div className="article-art">
              <span>{article.date}</span>
            </div>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <button
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
              onClick={() => navigateTo('services')}
            >
              Diskusikan strategi dengan SNG ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
