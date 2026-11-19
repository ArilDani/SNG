import React, { useState, useEffect, useRef } from 'react';
import {
  IconCheck,
  IconEdit,
  IconArticles,
  IconImage,
  IconFileText,
  IconCode,
  IconQuote,
  IconList,
  IconLink,
  IconSparkles,
  IconEye
} from './Icons';

const CATEGORY_PRESETS = [
  'DIGITAL STRATEGY',
  'DATA & ANALYTICS',
  'UMKM GROWTH',
  'CONTENT & SOCIAL',
  'SEO & PERFORMANCE',
  'THE NEXUS ECOSYSTEM',
  'CUSTOM'
];

const COVER_PRESETS = [
  {
    label: 'Cosmic Nexus',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Digital Strategy',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Data Analytics',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Modern Growth',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
  }
];

const DEFAULT_ARTICLE_TEMPLATE = `Banyak bisnis merasa perlu hadir di setiap platform digital secara bersamaan. Namun, tanpa arah dan strategi data yang terhubung, energi serta anggaran pemasaran sering kali tersebar tanpa hasil yang terukur.

## Mengapa Keterhubungan Kanal Lebih Penting dari Kuantitas?

Strategi pemasaran modern bukan tentang seberapa banyak postingan yang Anda rilis setiap hari, melainkan bagaimana setiap titik sentuh (touchpoint) menuntun calon pelanggan dari fase menyadari kehadiran brand hingga melakukan transaksi berulang.

:::callout INSIGHT PERTUMBUHAN SNG
"Kanal digital yang tidak terintegrasi hanya memproduksi kebisingan. Pertumbuhan sejati lahir saat website, media sosial, e-commerce, dan CRM berbicara dalam satu bahasa data yang harmonis."
:::

### Tiga Pilar Ekosistem Digital Berkelanjutan:

- **Adapt to the Audience**: Sesuaikan format konten dan bahasa komunikasi dengan dinamika audiens di masing-masing platform.
- **Plan with Intention**: Susun kampanye yang memiliki tujuan jelas—apakah untuk awareness, pertimbangan, atau konversi langsung.
- **Decide with Data**: Evaluasi setiap metrik secara berkala. Metrik bukan sekadar angka di dashboard, melainkan bahan bakar untuk perbaikan berkelanjutan.

---

## Langkah Praktis untuk UMKM

Bagi pemilik bisnis atau tim pemasaran, mulailah dengan memetakan kanal utama yang paling sering dikunjungi target pembeli Anda. Pastikan informasi kontak, tautan katalog, dan pesan utama konsisten di seluruh platform.

Pertumbuhan bisnis di era digital adalah maraton terukur, bukan sprint sporadis. Ketika ekosistem Anda terhubung kuat, setiap rupiah anggaran pemasaran bekerja dengan efisiensi tertinggi.`;

export default function BlogWriterStudio({ isOpen, onClose, article, isEdit, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'DIGITAL STRATEGY',
    customCategory: '',
    date: '',
    excerpt: '',
    body: '',
    coverImage: '',
    read: '4 MIN READ'
  });

  const [viewMode, setViewMode] = useState('write'); // 'write' | 'preview'
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (article) {
      const isPreset = CATEGORY_PRESETS.includes(article.category);
      setFormData({
        id: article.id || article._id || '',
        title: article.title || '',
        category: isPreset ? article.category : (article.category ? 'CUSTOM' : 'DIGITAL STRATEGY'),
        customCategory: isPreset ? '' : (article.category || ''),
        date: article.date || `INSIGHT / 0${Date.now().toString().slice(-2)}`,
        excerpt: article.excerpt || '',
        body: Array.isArray(article.body) ? article.body.join('\n\n') : (article.body || ''),
        coverImage: article.coverImage || '',
        read: article.read || '4 MIN READ'
      });
    } else {
      setFormData({
        title: '',
        category: 'DIGITAL STRATEGY',
        customCategory: '',
        date: `INSIGHT / ${new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }).toUpperCase()}`,
        excerpt: '',
        body: '',
        coverImage: '',
        read: '4 MIN READ'
      });
    }
    setViewMode('write');
  }, [article, isOpen]);

  // Compute stats in real-time
  const allText = (formData.title + ' ' + formData.excerpt + ' ' + formData.body).trim();
  const wordCount = allText ? allText.split(/\s+/).filter(Boolean).length : 0;
  const autoReadTime = Math.max(1, Math.ceil(wordCount / 160)) + ' MIN READ';

  // Insert markdown helpers into textarea
  const insertFormatting = (prefix, suffix = '', sample = '') => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = formData.body;
    const selectedText = text.substring(start, end) || sample;

    const replacement = prefix + selectedText + suffix;
    const newBody = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({ ...prev, body: newBody }));

    // Reset selection after render
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 20);
  };

  const handleApplyTemplate = () => {
    if (formData.body.trim().length > 20) {
      if (!window.confirm('Ganti isi artikel saat ini dengan template standar blog SNG?')) return;
    }
    setFormData((prev) => ({
      ...prev,
      title: prev.title || 'Membangun Ekosistem Digital Berkelanjutan untuk Skala Bisnis',
      excerpt: prev.excerpt || 'Mengapa konsistensi strategi dan keterhubungan kanal lebih penting daripada sekadar memperbanyak platform.',
      category: 'DIGITAL STRATEGY',
      coverImage: prev.coverImage || COVER_PRESETS[0].url,
      body: DEFAULT_ARTICLE_TEMPLATE
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      alert('Judul artikel dan ringkasan wajib diisi.');
      return;
    }

    setSaving(true);
    try {
      const finalCategory = formData.category === 'CUSTOM'
        ? (formData.customCategory.trim() || 'INSIGHT')
        : formData.category;

      const payload = {
        id: formData.id,
        title: formData.title.trim(),
        category: finalCategory,
        date: formData.date || 'INSIGHT',
        excerpt: formData.excerpt.trim(),
        read: autoReadTime,
        coverImage: formData.coverImage.trim(),
        body: formData.body
      };

      await onSave(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  // Render preview elements
  const renderPreviewContent = () => {
    const rawParagraphs = formData.body.split('\n\n').filter((p) => p.trim().length > 0);

    return (
      <div className="blog-preview-reader">
        {formData.coverImage && (
          <div className="blog-preview-cover-wrapper">
            <img src={formData.coverImage} alt={formData.title} className="blog-preview-cover-img" />
            <div className="blog-preview-cover-overlay"></div>
          </div>
        )}

        <div className="blog-preview-header">
          <div className="blog-preview-badges">
            <span className="blog-badge-category">
              {formData.category === 'CUSTOM' ? formData.customCategory || 'INSIGHT' : formData.category}
            </span>
            <span className="blog-badge-meta">{formData.date}</span>
            <span className="blog-badge-read">{autoReadTime}</span>
          </div>

          <h1 className="blog-preview-title">{formData.title || 'Judul Artikel Anda'}</h1>
          <p className="blog-preview-lead">{formData.excerpt || 'Ringkasan artikel akan tampil di sini...'}</p>
          <div className="blog-preview-divider"></div>
        </div>

        <div className="blog-preview-body">
          {rawParagraphs.map((block, idx) => {
            const trimmed = block.trim();

            // Headings
            if (trimmed.startsWith('## ')) {
              return <h2 key={idx} className="blog-preview-h2">{trimmed.replace(/^##\s+/, '')}</h2>;
            }
            if (trimmed.startsWith('### ')) {
              return <h3 key={idx} className="blog-preview-h3">{trimmed.replace(/^###\s+/, '')}</h3>;
            }

            // Divider
            if (trimmed === '---') {
              return <hr key={idx} className="blog-preview-hr" />;
            }

            // Callout Box :::callout Title \n Content :::
            if (trimmed.startsWith(':::callout')) {
              const lines = trimmed.split('\n');
              const calloutTitle = lines[0].replace(':::callout', '').replace(':::', '').trim();
              const calloutContent = lines.slice(1).join('\n').replace(/:::\s*$/, '').trim();
              return (
                <div key={idx} className="blog-callout-box">
                  <div className="blog-callout-head">
                    <IconSparkles size={16} className="blog-callout-icon" />
                    <strong>{calloutTitle || 'INSIGHT STRATEGIS'}</strong>
                  </div>
                  <p>{calloutContent}</p>
                </div>
              );
            }

            // Blockquote
            if (trimmed.startsWith('> ')) {
              const quoteText = trimmed.split('\n').map((l) => l.replace(/^>\s*/, '')).join(' ');
              return (
                <blockquote key={idx} className="blog-preview-quote">
                  <IconQuote size={20} className="blog-quote-icon" />
                  <p>{quoteText}</p>
                </blockquote>
              );
            }

            // Bullet List
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
              return (
                <ul key={idx} className="blog-preview-bullet-list">
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
                <ol key={idx} className="blog-preview-number-list">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }

            // Code block
            if (trimmed.startsWith('```')) {
              const codeLines = trimmed.split('\n');
              const codeContent = codeLines.slice(1, -1).join('\n') || trimmed.replace(/```/g, '');
              return (
                <div key={idx} className="blog-preview-code">
                  <div className="blog-preview-code-header">
                    <span>Terminal / Code View</span>
                  </div>
                  <pre><code>{codeContent}</code></pre>
                </div>
              );
            }

            // Standard Paragraph
            return <p key={idx} className="blog-preview-paragraph">{trimmed}</p>;
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="cosmic-modal-overlay blog-studio-overlay open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="blog-studio-card">
        {/* TOP BAR */}
        <div className="blog-studio-topbar">
          <div className="blog-studio-brand">
            <button type="button" className="blog-back-btn" onClick={onClose}>
              ← Kembali ke Dashboard
            </button>
            <div className="blog-brand-meta">
              <span className="blog-kicker">SNG CMS / BLOG WRITING STUDIO</span>
              <h2 className="blog-studio-heading">
                {isEdit ? 'Ubah & Optimasi Artikel' : 'Tulis Artikel Blog Baru'}
              </h2>
            </div>
          </div>

          <div className="blog-studio-center-controls">
            <div className="blog-stats-pill">
              <IconArticles size={13} />
              <span>{wordCount} kata</span>
              <span className="stats-dot">·</span>
              <span>{autoReadTime}</span>
            </div>

            <div className="blog-view-toggle">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'write' ? 'active' : ''}`}
                onClick={() => setViewMode('write')}
              >
                <IconEdit size={13} />
                <span>Mode Tulis & Format</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
                onClick={() => setViewMode('preview')}
              >
                <IconEye size={13} />
                <span>Pratinjau Nyata (Live)</span>
              </button>
            </div>
          </div>

          <div className="blog-studio-actions">
            <button
              type="button"
              className="cosmic-btn-primary blog-publish-btn"
              onClick={handleSubmit}
              disabled={saving}
            >
              <IconCheck size={14} />
              <span>{saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
            </button>
          </div>
        </div>

        {/* METADATA STRIP */}
        <div className="blog-studio-meta-strip">
          <div className="meta-headline-col">
            <input
              type="text"
              className="blog-headline-input"
              placeholder="Ketik Judul Artikel yang Menarik di Sini..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="meta-secondary-row">
            {/* Category */}
            <div className="meta-field-group">
              <label>Kategori Artikel</label>
              <div className="category-select-wrapper">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="blog-select-input"
                >
                  {CATEGORY_PRESETS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formData.category === 'CUSTOM' && (
                  <input
                    type="text"
                    className="blog-input-sm"
                    placeholder="Nama kategori kustom..."
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  />
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div className="meta-field-group cover-field-group">
              <label>
                <IconImage size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Gambar Sampul (Cover URL)
              </label>
              <div className="cover-input-wrapper">
                <input
                  type="url"
                  className="blog-text-input"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                />
                {formData.coverImage && (
                  <button
                    type="button"
                    className="cover-clear-btn"
                    onClick={() => setFormData({ ...formData, coverImage: '' })}
                    title="Hapus sampul"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Cover Presets */}
            <div className="meta-field-group">
              <label>Preset Foto Sampul Cepat</label>
              <div className="cover-presets-row">
                {COVER_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`preset-thumb-btn ${formData.coverImage === p.url ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, coverImage: p.url })}
                    title={p.label}
                  >
                    <img src={p.url} alt={p.label} />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="meta-excerpt-group">
            <label>Ringkasan Singkat (Lead Excerpt — Tampil di Kartu Depan)</label>
            <textarea
              rows={2}
              className="blog-excerpt-textarea"
              placeholder="Tulis ringkasan singkat dalam 1-2 kalimat yang merangkum inti strategi artikel..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>
        </div>

        {/* WORKSPACE AREA: WRITE OR PREVIEW */}
        <div className="blog-studio-workspace">
          {viewMode === 'write' ? (
            <div className="blog-editor-pane">
              {/* TOOLBAR */}
              <div className="blog-formatting-toolbar">
                <div className="toolbar-group">
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n## ', '\n', 'Judul Bagian Utama')}
                    title="Judul Utama (H2)"
                  >
                    <b>H2</b>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n### ', '\n', 'Sub-judul')}
                    title="Sub-judul (H3)"
                  >
                    <b>H3</b>
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('**', '**', 'teks tebal')}
                    title="Tebal (Bold)"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn italic-btn"
                    onClick={() => insertFormatting('*', '*', 'teks miring')}
                    title="Miring (Italic)"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n> ', '\n\n', 'Kutipan penting tentang strategi dan data...')}
                    title="Kutipan (Blockquote)"
                  >
                    <IconQuote size={13} />
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n- ', '\n- Poin kedua\n- Poin ketiga\n', 'Poin pertama')}
                    title="Daftar Poin (Bullet List)"
                  >
                    <IconList size={13} />
                    <span>Poin</span>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n1. ', '\n2. Langkah kedua\n3. Langkah ketiga\n', 'Langkah pertama')}
                    title="Daftar Angka (Numbered List)"
                  >
                    <span>1. 2. 3.</span>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn highlight-btn"
                    onClick={() =>
                      insertFormatting(
                        '\n\n:::callout KUNCI SUKSES PERTUMBUHAN\n',
                        '\n:::\n\n',
                        'Pertumbuhan bisnis bukan sekadar menghasilkan trafik, melainkan menghubungkan titik sentuh pelanggan dari brand awareness hingga konversi loyal.'
                      )
                    }
                    title="Kotak Sorotan Khusus (Callout Box)"
                  >
                    <IconSparkles size={13} />
                    <span>Kotak Sorotan</span>
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n```\n', '\n```\n\n', '// Formula Pertumbuhan\nROI = (Keuntungan / Biaya Pemasaran) * 100%')}
                    title="Blok Kode / Data Terminal"
                  >
                    <IconCode size={13} />
                    <span>Kode</span>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('[', '](https://sngagency.id)', 'Teks Tautan')}
                    title="Sisipkan Link"
                  >
                    <IconLink size={13} />
                    <span>Link</span>
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => insertFormatting('\n\n---\n\n')}
                    title="Garis Pembatas (Divider)"
                  >
                    <span>— Pembatas</span>
                  </button>
                </div>

                <div className="toolbar-spacer"></div>

                <button
                  type="button"
                  className="toolbar-template-btn"
                  onClick={handleApplyTemplate}
                  title="Gunakan struktur artikel blog profesional yang sudah siap pakai"
                >
                  <IconFileText size={13} />
                  <span>📋 Pakai Template Artikel Standar</span>
                </button>
              </div>

              {/* TEXTAREA WRITING CANVAS */}
              <div className="writing-canvas-container">
                <textarea
                  ref={textareaRef}
                  className="writing-canvas-textarea"
                  placeholder="Mulai menulis isi artikel blog Anda di sini. Gunakan tombol toolbar di atas untuk menambahkan heading (H2, H3), kutipan, kotak sorotan khusus, atau daftar poin..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                />
              </div>

              <div className="writing-canvas-footer">
                <small>
                  💡 <b>Tips Penulis:</b> Gunakan <code>## Judul Bagian</code> untuk membuat sub-bab dan <code>:::callout Judul:::</code> untuk kotak wawasan penting. Klik tombol "Pratinjau Nyata" di atas untuk melihat tampilan persis pembaca.
                </small>
              </div>
            </div>
          ) : (
            <div className="blog-preview-pane">
              {renderPreviewContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

