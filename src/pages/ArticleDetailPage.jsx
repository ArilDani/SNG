import React from 'react';
import { useApp } from '../context/AppContext';
import { IconSparkles, IconQuote } from '../components/Icons';

export default function ArticleDetailPage() {
  const { articles, routeParam, navigateTo } = useApp();

  const article = articles.find((a) => a.id === routeParam || a._id === routeParam) || articles[0];

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

  // Normalize paragraphs/blocks
  let rawBlocks = [];
  if (Array.isArray(article.body)) {
    rawBlocks = article.body;
  } else if (typeof article.body === 'string') {
    rawBlocks = article.body.split('\n\n').filter((p) => p.trim().length > 0);
  } else {
    rawBlocks = [article.excerpt];
  }

  return (
    <div className="app-page active">
      <div className="page-hero">
        <div className="container">
          <button className="text-link" onClick={() => navigateTo('articles')} style={{ marginBottom: '24px' }}>
            ← Kembali ke semua artikel
          </button>

          <div className="article-detail">
            {article.coverImage && (
              <div className="article-hero-cover" style={{ marginBottom: '28px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(180, 140, 255, 0.2)' }}>
                <img
                  src={article.coverImage}
                  alt={article.title}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div className="article-meta-badges" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="eyebrow" style={{ margin: 0 }}>
                {article.category}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>·</span>
              <span style={{ color: '#bca6ff', fontFamily: 'var(--mono)', fontSize: '11px' }}>
                {article.date}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>·</span>
              <span style={{ color: '#88849b', fontFamily: 'var(--mono)', fontSize: '11px' }}>
                {article.read || '4 MIN READ'}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15, marginBottom: '16px' }}>
              {article.title}
            </h1>

            <p className="lead" style={{ fontSize: '15px', color: '#c7c4d8', lineHeight: 1.7, marginBottom: '32px', borderLeft: '3px solid #8a50f5', paddingLeft: '16px' }}>
              {article.excerpt}
            </p>

            <div className="article-content-flow">
              {rawBlocks.map((block, idx) => {
                const trimmed = block.trim();

                // Headings
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="blog-preview-h2" style={{ margin: '32px 0 16px', fontSize: '24px', color: '#ffffff' }}>
                      {trimmed.replace(/^##\s+/, '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="blog-preview-h3" style={{ margin: '24px 0 12px', fontSize: '18px', color: '#dfdbed' }}>
                      {trimmed.replace(/^###\s+/, '')}
                    </h3>
                  );
                }

                // Divider
                if (trimmed === '---') {
                  return (
                    <hr key={idx} style={{ border: 'none', borderTop: '1px solid rgba(180, 140, 255, 0.2)', margin: '36px 0' }} />
                  );
                }

                // Callout Box
                if (trimmed.startsWith(':::callout')) {
                  const lines = trimmed.split('\n');
                  const calloutTitle = lines[0].replace(':::callout', '').replace(':::', '').trim();
                  const calloutContent = lines.slice(1).join('\n').replace(/:::\s*$/, '').trim();
                  return (
                    <div key={idx} className="blog-callout-box" style={{ margin: '28px 0' }}>
                      <div className="blog-callout-head">
                        <IconSparkles size={16} className="blog-callout-icon" />
                        <strong>{calloutTitle || 'INSIGHT STRATEGIS'}</strong>
                      </div>
                      <p style={{ margin: 0 }}>{calloutContent}</p>
                    </div>
                  );
                }

                // Blockquote
                if (trimmed.startsWith('> ')) {
                  const quoteText = trimmed.split('\n').map((l) => l.replace(/^>\s*/, '')).join(' ');
                  return (
                    <blockquote key={idx} className="blog-preview-quote" style={{ margin: '24px 0' }}>
                      <IconQuote size={20} className="blog-quote-icon" />
                      <p style={{ margin: 0 }}>{quoteText}</p>
                    </blockquote>
                  );
                }

                // Bullet List
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
                  return (
                    <ul key={idx} className="blog-preview-bullet-list" style={{ margin: '16px 0' }}>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                // Numbered List
                if (/^\d+\.\s+/.test(trimmed)) {
                  const items = trimmed.split('\n').map((l) => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
                  return (
                    <ol key={idx} className="blog-preview-number-list" style={{ margin: '16px 0' }}>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  );
                }

                // Standard Paragraph
                return (
                  <p key={idx} style={{ fontSize: '14px', lineHeight: 1.85, color: '#e2dfed', marginBottom: '18px' }}>
                    {trimmed}
                  </p>
                );
              })}
            </div>

            <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <small style={{ color: '#9d99b2', display: 'block', marginBottom: '4px' }}>PUBLIKASI RESMI</small>
                <b style={{ color: '#fff' }}>SNG Growth & Strategy Editorial</b>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => navigateTo('services')}
              >
                Diskusikan strategi dengan SNG ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
