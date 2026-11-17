const fs = require('fs');

const refCSS = fs.readFileSync('ref-style.css', 'utf-8');

const scrollyAndInteractionCSS = `
/* ============================================================
   BALANCED TYPOGRAPHY: FIT ENTIRE SECTION ON ONE SCREEN
   ============================================================ */

/* Compact section vertical paddings so 1 section fits 1 viewport */
.section {
  padding: 68px 0 !important;
}

.silver-section {
  padding: 68px 0 !important;
}

.page-hero {
  padding: 55px 0 40px !important;
}

.page-content {
  padding: 45px 0 65px !important;
}

.closing {
  padding: 55px 0 !important;
}

/* Section Headings */
.section-heading {
  margin-bottom: 28px !important;
  gap: 24px !important;
}

.section-heading h2 {
  font-size: clamp(26px, 3.2vw, 38px) !important;
  line-height: 1.12 !important;
  letter-spacing: -0.055em !important;
  margin: 10px 0 0 !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.section-heading p {
  font-size: 11px !important;
  line-height: 1.7 !important;
  margin: 0 !important;
}

/* Hero Section (Home) */
.hero {
  min-height: 580px !important;
  height: 92vh !important;
  max-height: 820px !important;
}

.hero h1,
.hero-fade-up {
  font-size: clamp(34px, 4.8vw, 56px) !important;
  line-height: 1.1 !important;
  letter-spacing: -0.065em !important;
  margin: 0 auto 12px auto !important;
  padding-bottom: 8px !important;
  overflow: visible !important;
}

.hero-fade-up .hero-line {
  display: block !important;
  overflow: visible !important;
  padding-bottom: 4px !important;
  line-height: 1.12 !important;
}

.hero-fade-up .hero-line-1 {
  animation: heroLineFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-fade-up .hero-line-2 {
  animation: heroLineFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
}

.page-hero .hero-fade-up {
  animation: heroLineFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroLineFadeUp {
  0% {
    opacity: 0;
    transform: translateY(32px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.hero-question {
  font-size: 11px !important;
  line-height: 1.8 !important;
  max-width: 480px !important;
  margin: 0 auto 24px auto !important;
}

.hero-actions {
  gap: 18px !important;
}

/* Section 02 Philosophy */
.about-preview {
  gap: 8% !important;
  align-items: center !important;
}

.about-stamp {
  position: static !important;
}

.stamp-orbit {
  width: min(200px, 55%) !important;
  margin-top: 18px !important;
}

.stamp-infinity span {
  font-size: 56px !important;
}

.about-copy h2 {
  font-size: clamp(26px, 3.2vw, 38px) !important;
  line-height: 1.14 !important;
  letter-spacing: -0.055em !important;
  margin: 0 0 16px !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.about-copy p {
  font-size: 11px !important;
  line-height: 1.85 !important;
  margin-bottom: 12px !important;
  max-width: 620px !important;
}

.about-bottom {
  margin-top: 20px !important;
  padding-top: 14px !important;
}

/* Section 03 How We Work */
.approach-layout {
  gap: 8% !important;
  align-items: start !important;
}

.approach-intro {
  position: static !important;
}

.approach-intro h2 {
  font-size: clamp(26px, 3.2vw, 38px) !important;
  line-height: 1.14 !important;
  letter-spacing: -0.055em !important;
  margin: 12px 0 14px !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.approach-intro p {
  font-size: 11px !important;
  line-height: 1.8 !important;
}

.accordion-title {
  font-size: 16px !important;
}

.accordion-header {
  padding: 16px 14px !important;
}

/* Section 05 The Nexus Ecosystem */
.ecosystem-layout {
  gap: 5% !important;
}

.ecosystem-copy h2 {
  font-size: clamp(26px, 3.2vw, 38px) !important;
  line-height: 1.14 !important;
  letter-spacing: -0.055em !important;
  margin: 12px 0 14px !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.ecosystem-copy p {
  font-size: 11px !important;
  line-height: 1.8 !important;
}

.network {
  min-height: 420px !important;
  height: 420px !important;
}

.network-core {
  width: 105px !important;
  height: 105px !important;
}

.network-core strong {
  font-size: 24px !important;
}

.node {
  padding: 8px 13px !important;
  font-size: 10px !important;
}

/* Section 07 Closing CTA */
.closing-panel {
  padding: clamp(28px, 4vw, 48px) !important;
}

.closing-panel h2 {
  font-size: clamp(28px, 3.8vw, 44px) !important;
  line-height: 1.08 !important;
  margin: 14px 0 12px !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.closing-panel p {
  font-size: 11px !important;
  line-height: 1.8 !important;
}

/* All Subpages Hero Headings */
.page-hero h1 {
  font-size: clamp(30px, 4vw, 48px) !important;
  line-height: 1.12 !important;
  letter-spacing: -0.06em !important;
  margin: 14px 0 !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.page-hero p {
  font-size: 11px !important;
  line-height: 1.8 !important;
  max-width: 540px !important;
}

/* Subpage Headings & Panels */
.copy-panel h2 {
  font-size: clamp(22px, 2.6vw, 32px) !important;
  letter-spacing: -0.05em !important;
  margin: 8px 0 14px !important;
}

.copy-panel p {
  font-size: 11px !important;
  line-height: 1.85 !important;
}

.contact-info h2 {
  font-size: clamp(24px, 2.8vw, 34px) !important;
  letter-spacing: -0.05em !important;
  margin: 12px 0 14px !important;
}

.contact-info p {
  font-size: 11px !important;
  line-height: 1.8 !important;
}

.catalog-card h3 {
  font-size: 16px !important;
  margin: 16px 0 8px !important;
}

.article-detail h1 {
  font-size: clamp(28px, 3.6vw, 44px) !important;
  line-height: 1.12 !important;
}

/* Gradient and Span Vertical Headroom */
.page-hero h1 span,
.page-hero h1 .gradient-text,
.hero h1 .gradient-text {
  display: inline-block !important;
  line-height: 1.16 !important;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

.gradient-text {
  background: linear-gradient(100deg, #ffffff 10%, #d3c0ff 48%, #9369f5 94%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding-bottom: 0.12em !important;
  overflow: visible !important;
}

/* ============================================================
   PROGRESSIVE LETTER-BY-LETTER REVEAL FOR SECTIONS BELOW HERO
   ============================================================ */
.split-text-root {
  display: inline-block !important;
  overflow: visible !important;
  padding-bottom: 0.14em !important;
  line-height: 1.18 !important;
}

.split-word {
  display: inline-block !important;
  white-space: nowrap !important;
  overflow: visible !important;
  padding-bottom: 0.14em !important;
  line-height: 1.18 !important;
  vertical-align: top;
}

.split-space {
  display: inline-block !important;
}

.split-char {
  display: inline-block !important;
  overflow: visible !important;
  padding-bottom: 0.14em !important;
  line-height: 1.18 !important;
  opacity: 0;
  transform: translateY(18px) rotateX(-45deg) scale(0.94);
  filter: blur(4px);
  will-change: transform, opacity, filter;
  animation: charLetterCascade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes charLetterCascade {
  0% {
    opacity: 0;
    transform: translateY(18px) rotateX(-45deg) scale(0.94);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg) scale(1);
    filter: blur(0);
  }
}

.reveal:not(.visible) .split-char {
  animation: none !important;
  opacity: 0 !important;
  transform: translateY(18px) rotateX(-45deg) scale(0.94) !important;
  filter: blur(4px) !important;
}

.reveal.visible .split-char {
  animation: charLetterCascade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

.split-text-root.gradient-text .split-char,
.gradient-text .split-char {
  background: linear-gradient(100deg, #ffffff 10%, #d3c0ff 48%, #9369f5 94%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.purple-accent-text,
.purple-accent {
  color: #744bb8 !important;
}

/* ============================================================
   SMOOTH SECTION TRANSITIONS (TRANSISI PINDAH SECTION)
   ============================================================ */
section,
.section,
.closing,
.intro-strip,
.principles {
  position: relative;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 6%;
  right: 6%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(168, 120, 255, 0.35), transparent);
  opacity: 0;
  transform: scaleX(0.7);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 10;
}

.section.section-in-view::before {
  opacity: 1;
  transform: scaleX(1);
}

.section-in-view .eyebrow::before {
  animation: eyebrowLineExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes eyebrowLineExpand {
  0% {
    width: 0px;
    opacity: 0;
  }
  100% {
    width: 24px;
    opacity: 1;
  }
}

/* ============================================================
   UNIVERSAL INTERACTIVE HOVER EFFECTS ACROSS ALL PAGES
   ============================================================ */

/* 1. About Page: Balanced Layout & Mission Grid */
.about-two {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr !important;
  gap: 40px !important;
  align-items: start !important;
}

.vision-panel {
  display: flex;
  flex-direction: column;
}

.vision-orbit {
  width: min(170px, 48%) !important;
  margin: 18px 0 0 0 !important;
  align-self: flex-start;
}

.vision-orbit-caption {
  font-size: 8.5px !important;
  letter-spacing: 0.16em !important;
  color: #696b76 !important;
  margin-top: 14px !important;
  text-align: left !important;
}

.vision-pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.vision-tag {
  font: 8.5px var(--mono);
  letter-spacing: 0.1em;
  padding: 5px 11px;
  border-radius: 30px;
  background: rgba(116, 75, 184, 0.1);
  border: 1px solid rgba(116, 75, 184, 0.28);
  color: #4a2b85;
  text-transform: uppercase;
  transition: all 0.25s ease;
  cursor: default;
}

.vision-tag:hover {
  background: rgba(116, 75, 184, 0.22);
  border-color: #6a3ea8;
  transform: translateY(-2px);
  color: #2b1355;
  box-shadow: 0 4px 12px rgba(116, 75, 184, 0.15);
}

.mission-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 10px !important;
}

.mission-grid .mission-item,
.mission-item {
  padding: 13px 15px !important;
  border-radius: 7px !important;
  background: rgba(255, 255, 255, 0.45) !important;
  border: 1px solid rgba(20, 20, 30, 0.12) !important;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), 
              background-color 0.25s ease, 
              border-color 0.25s ease, 
              box-shadow 0.28s ease !important;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.mission-grid .mission-item:hover,
.mission-item:hover {
  transform: translateY(-4px) translateX(4px) !important;
  background: rgba(255, 255, 255, 0.75) !important;
  border-color: rgba(116, 75, 184, 0.45) !important;
  box-shadow: 0 12px 28px rgba(35, 28, 55, 0.1) !important;
}

.mission-grid .mission-item b,
.mission-item b {
  font-size: 11px !important;
  color: #1a1a26;
  margin-bottom: 5px !important;
  display: block;
}

.mission-item:hover b {
  color: #633ea8;
  transition: color 0.2s ease;
}

.mission-grid .mission-item p,
.mission-item p {
  font-size: 9.5px !important;
  line-height: 1.65 !important;
  color: #555866 !important;
  margin: 0 !important;
}

@media (max-width: 900px) {
  .about-two {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
  .mission-grid {
    grid-template-columns: 1fr !important;
  }
}

.copy-panel .stamp-orbit {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
  cursor: pointer;
}

.copy-panel .stamp-orbit:hover {
  transform: scale(1.08) rotate(8deg);
  box-shadow: 0 0 35px rgba(116, 75, 184, 0.3);
}

/* 2. Services Page: Catalog Cards, Filter Buttons, Search Field */
.catalog-card {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.28s ease, 
              border-color 0.28s ease, 
              background 0.28s ease !important;
  cursor: pointer;
}

.catalog-card:hover {
  transform: translateY(-8px) !important;
  background: linear-gradient(145deg, #ffffff, #dedfe7) !important;
  border-color: rgba(133, 88, 216, 0.45) !important;
  box-shadow: 0 20px 48px rgba(26, 26, 45, 0.16) !important;
}

.catalog-card:hover h3 {
  color: #633ea8;
  transition: color 0.2s ease;
}

.catalog-card .btn {
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.catalog-card:hover .btn {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(116, 75, 184, 0.3);
}

.filter-btn {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer;
}

.filter-btn:hover {
  background: #171722 !important;
  color: #ffffff !important;
  border-color: #171722 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.search-field {
  transition: all 0.25s ease !important;
}

.search-field:hover {
  background: rgba(255, 255, 255, 0.5) !important;
  border-color: rgba(133, 88, 216, 0.4) !important;
}

.search-field:focus {
  background: #ffffff !important;
  border-color: #8558d8 !important;
  box-shadow: 0 0 0 3px rgba(133, 88, 216, 0.16) !important;
}

/* 3. Articles Page & Article Detail */
.article-list .article-card,
.article-grid .article-card {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.28s ease, 
              box-shadow 0.28s ease !important;
  cursor: pointer;
}

.article-list .article-card:hover,
.article-grid .article-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(187, 150, 255, 0.6) !important;
  box-shadow: 0 20px 48px rgba(12, 10, 24, 0.6) !important;
}

.article-card:hover .article-art {
  filter: brightness(1.15);
  transition: filter 0.3s ease;
}

.article-card:hover h3 {
  color: #d3c0ff;
  transition: color 0.25s ease;
}

.article-read-btn {
  transition: all 0.22s ease !important;
  cursor: pointer;
}

.article-card:hover .article-read-btn {
  color: #ffffff !important;
  transform: translateX(4px);
}

/* 4. Contact Page: Cards & Form Inputs */
.contact-card {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.28s ease, 
              box-shadow 0.28s ease, 
              background-color 0.28s ease !important;
  cursor: default;
}

.contact-card:hover {
  transform: translateY(-4px) !important;
  border-color: rgba(175, 130, 255, 0.45) !important;
  box-shadow: 0 16px 38px rgba(15, 12, 28, 0.5) !important;
  background: #1c1a28 !important;
}

.form-panel {
  transition: box-shadow 0.3s ease;
}

.form-panel:hover {
  box-shadow: 0 22px 55px rgba(20, 20, 35, 0.18);
}

.field input,
.field select,
.field textarea {
  transition: all 0.22s ease !important;
}

.field input:hover,
.field select:hover,
.field textarea:hover {
  background: rgba(255, 255, 255, 0.68) !important;
  border-color: rgba(133, 88, 216, 0.38) !important;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  background: #ffffff !important;
  border-color: #8558d8 !important;
  box-shadow: 0 0 0 3px rgba(133, 88, 216, 0.16) !important;
}

/* 5. Section 01 Principles Hover */
.principle {
  transition: background-color 0.28s ease !important;
  cursor: default;
}

.principle:hover {
  background: rgba(155, 112, 255, 0.05) !important;
}

.principle .letter {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
              -webkit-text-stroke-color 0.3s ease, 
              filter 0.3s ease !important;
}

.principle:hover .letter {
  transform: scale(1.04) translateY(-3px) !important;
  -webkit-text-stroke-color: #d3c0ff !important;
  filter: drop-shadow(0 0 22px rgba(168, 120, 255, 0.45)) !important;
}

.principle:hover h3 {
  color: #e4d8ff;
  transition: color 0.2s ease;
}

/* 6. Dashboard: Metric Cards, Tables, Buttons */
.metric {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.25s ease, 
              box-shadow 0.25s ease !important;
  cursor: default;
}

.metric:hover {
  transform: translateY(-4px) !important;
  border-color: rgba(155, 112, 255, 0.4) !important;
  box-shadow: 0 12px 28px rgba(12, 10, 24, 0.45) !important;
}

.dash-sidebar button {
  transition: all 0.2s ease !important;
}

.dash-sidebar button:hover {
  background: rgba(155, 112, 255, 0.12) !important;
  color: #ffffff !important;
  transform: translateX(3px);
}

.dash-table tr {
  transition: background-color 0.2s ease;
}

.dash-table tr:hover td {
  background: rgba(155, 112, 255, 0.06);
}

.status-badge {
  transition: all 0.2s ease;
}

.status-badge:hover {
  filter: brightness(1.15);
  transform: scale(1.05);
}

/* 7. Footer Links Hover */
.footer-col button,
.footer-col a {
  transition: all 0.22s ease !important;
  cursor: pointer;
}

.footer-col button:hover,
.footer-col a:hover {
  color: #a882ff !important;
  transform: translateX(4px);
}

/* ============================================================
   PAGE ENTRANCE ANIMATIONS
   ============================================================ */
.brand {
  cursor: pointer;
}

.nav-links button.active {
  color: white;
}

.app-page {
  animation: pageSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pageSlideUp {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-hero p,
.hero-question {
  animation: bigHeadingReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
  will-change: transform, opacity, filter;
}

.hero-actions,
.page-hero .eyebrow {
  animation: bigHeadingReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both;
}

@keyframes bigHeadingReveal {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* ============================================================
   REPEATING SCROLL ANIMATIONS (UP & DOWN WITHOUT REFRESH)
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  filter: blur(4px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform, filter;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.reveal.delay-1 {
  transition-delay: 0.12s;
}
.reveal.delay-2 {
  transition-delay: 0.22s;
}
.reveal.delay-3 {
  transition-delay: 0.32s;
}

.reveal h2 {
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s ease;
  will-change: transform, opacity, filter;
}

.reveal:not(.visible) h2 {
  transform: translateY(16px);
  opacity: 0.3;
  filter: blur(3px);
}

.reveal.visible h2 {
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}

/* ============================================================
   BUTTON FIXES: TEXT-LINKS WITH ZERO WHITE BOXES
   ============================================================ */
.text-link,
.hero-text-link,
.philosophy-text-link {
  background: transparent !important;
  background-color: transparent !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid rgba(211, 192, 255, 0.45) !important;
  border-radius: 0 !important;
  padding: 0 0 5px 0 !important;
  margin: 0 !important;
  color: #d4c4f6 !important;
  font-family: var(--sans) !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  line-height: 1.4 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  cursor: pointer !important;
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
  -webkit-appearance: none !important;
  appearance: none !important;
}

.text-link:hover,
.hero-text-link:hover {
  color: #ffffff !important;
  border-bottom-color: #ffffff !important;
  transform: translateX(4px);
  text-shadow: 0 0 10px rgba(211, 192, 255, 0.6);
}

.silver-section .text-link,
.silver-section .philosophy-text-link,
.philosophy-text-link {
  color: #4a2882 !important;
  border-bottom: 1px solid rgba(74, 40, 130, 0.45) !important;
}

.silver-section .text-link:hover,
.silver-section .philosophy-text-link:hover,
.philosophy-text-link:hover {
  color: #1e0e38 !important;
  border-bottom-color: #1e0e38 !important;
  transform: translateX(4px);
  text-shadow: 0 0 8px rgba(116, 75, 184, 0.3);
}

/* ============================================================
   SECTION 02: ROTATING ORBIT STAMP (CELESTIAL 3D GYROSCOPE)
   ============================================================ */
.stamp-orbit.continuous-spin {
  position: relative;
  transition: transform 0.4s ease;
  cursor: default;
}

.stamp-orbit.continuous-spin:hover {
  transform: scale(1.05);
}

.stamp-orbit.continuous-spin::before {
  animation: celestialRingSpinA 18s linear infinite !important;
}

.stamp-orbit.continuous-spin::after {
  animation: celestialRingSpinB 24s linear infinite !important;
}

@keyframes celestialRingSpinA {
  0% {
    transform: rotate(0deg) scaleY(0.42);
  }
  100% {
    transform: rotate(360deg) scaleY(0.42);
  }
}

@keyframes celestialRingSpinB {
  0% {
    transform: rotate(360deg) scaleY(0.42);
  }
  100% {
    transform: rotate(0deg) scaleY(0.42);
  }
}

.stamp-orbit .orbit-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.stamp-orbit .orbit-ring.ring-1 {
  inset: 5%;
  border: 1.5px dashed rgba(116, 75, 184, 0.35);
  animation: orbitRingSpin1 22s linear infinite;
}

.stamp-orbit .orbit-ring.ring-2 {
  inset: 22%;
  border: 1px dotted rgba(50, 30, 80, 0.3);
  animation: orbitRingSpin2 14s linear infinite reverse;
}

@keyframes orbitRingSpin1 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbitRingSpin2 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.stamp-infinity {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: infinityFloat 5s ease-in-out infinite alternate;
}

.stamp-infinity span {
  font-weight: 700;
  letter-spacing: -0.14em;
  color: #302344;
  line-height: 1;
  display: inline-block;
  text-shadow: 0 4px 18px rgba(116, 75, 184, 0.25);
  user-select: none;
}

@keyframes infinityFloat {
  0% {
    transform: translateY(-2px) scale(0.98);
  }
  100% {
    transform: translateY(2px) scale(1.02);
  }
}

/* ============================================================
   SECTION 03: HOW WE WORK (BUTTERY SMOOTH CSS GRID ACCORDION)
   ============================================================ */
.steps-accordion {
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}

.accordion-item {
  border-bottom: 1px solid var(--line);
  background: transparent;
  transition: background-color 0.28s ease, border-color 0.28s ease;
  overflow: hidden;
}

.accordion-item:hover {
  background: rgba(255, 255, 255, 0.025);
  border-bottom-color: rgba(155, 112, 255, 0.35);
}

.accordion-item.open {
  background: rgba(155, 112, 255, 0.04);
  border-bottom-color: rgba(155, 112, 255, 0.45);
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 14px;
  background: transparent;
  border: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: padding 0.2s ease;
}

.accordion-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.accordion-num {
  font: 11px var(--mono);
  color: #b69aef;
  letter-spacing: 0.1em;
  font-weight: 700;
  min-width: 24px;
}

.accordion-item:hover .accordion-title,
.accordion-item.open .accordion-title {
  color: #d3c0ff;
}

.accordion-tag {
  display: inline-block;
  font: 8px var(--mono);
  letter-spacing: 0.14em;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(155, 112, 255, 0.12);
  border: 1px solid rgba(155, 112, 255, 0.25);
  color: #cbb4ff;
  text-transform: uppercase;
}

.accordion-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.accordion-icon {
  color: #b79aff;
  font-size: 16px;
}

.accordion-chevron {
  font-size: 14px;
  color: #8c889b;
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
  display: inline-block;
}

.accordion-chevron.rotated {
  transform: rotate(180deg);
  color: #b79aff;
}

.accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
  opacity: 0;
}

.accordion-item.open .accordion-body,
.accordion-body.open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.accordion-body-inner {
  overflow: hidden;
  min-height: 0;
}

.accordion-body-content {
  padding: 0 14px 22px 56px;
}

.accordion-desc {
  font-size: 11px;
  line-height: 1.8;
  color: #a5a1b0;
  margin: 0 0 16px 0;
  max-width: 580px;
}

.accordion-details-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;
  background: rgba(15, 14, 22, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 16px 18px;
}

.accordion-subcol small {
  display: block;
  font-size: 8px;
  letter-spacing: 0.14em;
  color: #8a8698;
  margin-bottom: 8px;
}

.accordion-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.accordion-list li {
  font-size: 10px;
  color: #ccc8d8;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.bullet-point {
  color: #a882ff;
  font-size: 9px;
  line-height: 1.7;
}

.deliverable-box {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.deliverable-box b {
  font-size: 11px;
  color: #ffffff;
  font-weight: 600;
  line-height: 1.5;
  display: block;
  background: linear-gradient(90deg, #ffffff, #d3c0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 680px) {
  .accordion-left {
    gap: 12px;
  }
  .accordion-body-content {
    padding-left: 14px;
  }
  .accordion-details-grid {
    grid-template-columns: 1fr;
  }
  .deliverable-box {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-left: 0;
    padding-top: 12px;
  }
}

/* ============================================================
   SECTION 05: THE NEXUS ECOSYSTEM (PERFECT BALANCED COORDINATES)
   ============================================================ */
.node-callout-shelf {
  height: 84px;
  min-height: 84px;
  max-height: 84px;
  margin-top: 18px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.active-node-callout {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.active-node-callout.active {
  animation: calloutFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes calloutFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.active-node-callout b {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 4px;
}

.active-node-callout .callout-icon {
  color: #bda3f6;
  font-size: 14px;
}

.active-node-callout p {
  font-size: 10px;
  line-height: 1.55;
  color: #b0adbd;
  margin: 0;
}

.network {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
}

.network-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #d7c6ff, #8054d4 37%, #23153e 76%);
  box-shadow: 0 0 80px rgba(134, 86, 222, 0.4), inset -15px -20px 30px rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  text-align: center;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.network-core.core-pulsing {
  transform: translate(-50%, -50%) scale(1.06);
  box-shadow: 0 0 100px rgba(155, 112, 255, 0.75), inset -15px -20px 30px rgba(0, 0, 0, 0.55);
}

.network-core small {
  font: 7px var(--mono);
  letter-spacing: 0.18em;
  color: #e6dcff;
  display: block;
  margin-top: 2px;
}

/* Strict node coordinates around the circle */
.node {
  position: absolute !important;
  z-index: 4;
  display: inline-flex !important;
  width: auto !important;
  max-width: fit-content !important;
  height: auto !important;
  align-items: center;
  gap: 8px;
  background: rgba(24, 20, 36, 0.94) !important;
  border: 1px solid rgba(195, 170, 255, 0.28) !important;
  border-radius: 26px !important;
  color: #e6e0f0 !important;
  font-weight: 500;
  backdrop-filter: blur(14px);
  cursor: pointer;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  transition: background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease !important;
  user-select: none;
}

.node.n1 {
  top: 10% !important;
  left: 6% !important;
  right: auto !important;
  bottom: auto !important;
  transform: none !important;
}

.node.n2 {
  top: 14% !important;
  right: 6% !important;
  left: auto !important;
  bottom: auto !important;
  transform: none !important;
}

.node.n5 {
  top: 50% !important;
  left: 2% !important;
  right: auto !important;
  bottom: auto !important;
  transform: translateY(-50%) !important;
}

.node.n6 {
  top: 50% !important;
  right: 2% !important;
  left: auto !important;
  bottom: auto !important;
  transform: translateY(-50%) !important;
}

.node.n3 {
  bottom: 12% !important;
  left: 8% !important;
  top: auto !important;
  right: auto !important;
  transform: none !important;
}

.node.n4 {
  bottom: 12% !important;
  right: 8% !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
}

.node:hover,
.node.active-node {
  background: #312154 !important;
  border-color: #be99ff !important;
  color: #ffffff !important;
  box-shadow: 0 0 22px rgba(175, 130, 255, 0.65) !important;
}

.node b {
  color: #b99bff;
  font-weight: normal;
  font-size: 14px;
}

.node:hover b,
.node.active-node b {
  color: #ffffff;
}

/* ============================================================
   CUSTOM COSMIC SCROLLBAR
   ============================================================ */
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #09090f;
}
::-webkit-scrollbar-thumb {
  background: #252238;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
::-webkit-scrollbar-thumb:hover {
  background: #6842b8;
  box-shadow: 0 0 10px rgba(104, 66, 184, 0.5);
}

/* ============================================================
   CARDS & MODALS
   ============================================================ */
.interactive-tilt {
  transform-style: preserve-3d;
  transition: transform 0.18s ease-out, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.interactive-tilt:hover {
  border-color: rgba(185, 150, 255, 0.45);
  box-shadow: 0 20px 45px rgba(25, 20, 45, 0.5);
}

.interactive-tilt .card-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.12) 0%, transparent 65%);
  transition: opacity 0.3s;
}

.interactive-tilt:hover .card-sheen {
  opacity: 1;
}

.interactive-service-card {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background 0.25s ease;
  cursor: pointer;
}

.interactive-service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 50px rgba(25, 25, 40, 0.2);
  background: linear-gradient(145deg, #f5f6fa, #dce0e9);
}

.service-order-btn {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s ease, box-shadow 0.2s ease;
}

.interactive-service-card:hover .service-order-btn {
  transform: scale(1.15) rotate(45deg);
  background: #7d4fe0;
  box-shadow: 0 4px 15px rgba(125, 79, 224, 0.4);
}

.interactive-article-card {
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.28s ease, box-shadow 0.28s ease;
  cursor: pointer;
}

.interactive-article-card:hover {
  transform: translateY(-8px);
  border-color: rgba(193, 166, 255, 0.6);
  box-shadow: 0 20px 45px rgba(12, 10, 22, 0.45);
}

.interactive-article-card:hover .article-art {
  filter: brightness(1.12);
}

.btn-closing-magnetic {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease;
}

.btn-closing-magnetic:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 255, 255, 0.35);
}

/* Quick Demo Accounts in Modal */
.demo-accounts-box {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(133, 88, 216, 0.25);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.demo-accounts-box small {
  font: 9px var(--mono);
  letter-spacing: 0.14em;
  color: #6945a4;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
  font-weight: 700;
}

.demo-buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid rgba(133, 88, 216, 0.35);
  background: rgba(255, 255, 255, 0.75);
  color: #1a1a26;
  text-align: left;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-demo:hover {
  background: #ffffff;
  border-color: #8558d8;
  box-shadow: 0 6px 20px rgba(133, 88, 216, 0.2);
  transform: translateY(-2px);
}

.btn-demo strong {
  font-size: 11px;
  color: #2b1f48;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-demo span {
  font-size: 9px;
  color: #6a6a78;
}

.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 18px 0;
  color: #7b7d88;
  font: 8px var(--mono);
  letter-spacing: 0.12em;
}

.divider-with-text::before,
.divider-with-text::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(20, 20, 30, 0.12);
}

.divider-with-text:not(:empty)::before {
  margin-right: 12px;
}

.divider-with-text:not(:empty)::after {
  margin-left: 12px;
}

@media (max-width: 740px) {
  .demo-buttons-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================================================
   FLOATING MORPHING NAVBAR WITH SNG LOGO & AUTO-COLLAPSE ON SCROLL
   ========================================================================== */

.header {
  display: none !important;
}

.header-floating-wrapper {
  position: fixed;
  top: 18px;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  padding: 0 16px;
  transition: top 0.35s ease;
}

.floating-nav-pill {
  pointer-events: auto;
  position: relative;
  width: min(1140px, calc(100% - 24px));
  height: 62px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(12, 10, 20, 0.82);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(155, 112, 255, 0.15);
  transition: width 0.85s cubic-bezier(0.25, 1, 0.33, 1),
              height 0.85s cubic-bezier(0.25, 1, 0.33, 1),
              padding 0.75s cubic-bezier(0.25, 1, 0.33, 1),
              border-radius 0.85s cubic-bezier(0.25, 1, 0.33, 1),
              gap 0.75s cubic-bezier(0.25, 1, 0.33, 1),
              background 0.55s ease,
              box-shadow 0.65s ease,
              border-color 0.55s ease,
              transform 0.75s cubic-bezier(0.25, 1, 0.33, 1);
  overflow: hidden;
  box-sizing: border-box;
  will-change: width, height, border-radius, padding, transform;
}

.floating-nav-pill.nav-scrolled {
  background: rgba(14, 11, 24, 0.92);
  border-color: rgba(165, 125, 255, 0.3);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.65), 0 0 24px rgba(140, 95, 240, 0.22);
}

/* Brand inside floating navbar */
.floating-nav-pill .brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.33, 1), gap 0.65s cubic-bezier(0.25, 1, 0.33, 1);
}

.brand-logo-img {
  width: 34px;
  height: 34px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(165, 125, 255, 0.5));
  transition: transform 0.65s cubic-bezier(0.25, 1, 0.33, 1), filter 0.55s ease;
  display: block;
}

.floating-nav-pill .brand:hover .brand-logo-img,
.brand:hover .brand-logo-img {
  transform: scale(1.1) rotate(4deg);
  filter: drop-shadow(0 0 16px rgba(190, 150, 255, 0.9));
}

.brand-text {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.1;
  color: #ffffff;
  white-space: nowrap;
  max-width: 280px;
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition: max-width 0.8s cubic-bezier(0.25, 1, 0.33, 1),
              opacity 0.45s ease 0.12s,
              transform 0.6s cubic-bezier(0.25, 1, 0.33, 1) 0.08s,
              filter 0.45s ease 0.1s;
  overflow: hidden;
}

.brand-text small {
  font: 7px var(--mono, monospace);
  letter-spacing: 0.16em;
  color: #a49fb5;
  margin-top: 2px;
}

/* Nav links inside pill */
.floating-nav-pill .nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
  white-space: nowrap;
  max-width: 600px;
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition: max-width 0.85s cubic-bezier(0.25, 1, 0.33, 1),
              opacity 0.5s ease 0.15s,
              gap 0.75s cubic-bezier(0.25, 1, 0.33, 1),
              transform 0.65s cubic-bezier(0.25, 1, 0.33, 1) 0.1s,
              filter 0.5s ease 0.12s;
  overflow: hidden;
}

.floating-nav-pill .nav-links button {
  background: none;
  border: 0;
  color: #b8b5c3;
  font-size: 11px;
  padding: 8px 14px;
  border-radius: 20px;
  transition: all 0.22s ease;
  cursor: pointer;
}

.floating-nav-pill .nav-links button:hover,
.floating-nav-pill .nav-links button.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 12px rgba(175, 130, 255, 0.25);
}

/* Right Actions inside pill */
.floating-nav-pill .nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  max-width: 380px;
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition: max-width 0.8s cubic-bezier(0.25, 1, 0.33, 1),
              opacity 0.45s ease 0.15s,
              gap 0.7s cubic-bezier(0.25, 1, 0.33, 1),
              transform 0.6s cubic-bezier(0.25, 1, 0.33, 1) 0.1s,
              filter 0.45s ease 0.12s;
  overflow: hidden;
}

.floating-nav-pill .account-btn {
  border: 0;
  background: transparent;
  color: #d3cfdd;
  font-size: 11px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 20px;
  transition: color 0.2s ease, background 0.2s ease;
}

.floating-nav-pill .account-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.floating-nav-pill .nav-order {
  border: 1px solid rgba(190, 164, 255, 0.45);
  border-radius: 50px;
  padding: 8px 18px;
  color: white;
  font-size: 11px;
  font-weight: 600;
  background: rgba(150, 106, 255, 0.16);
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.floating-nav-pill .nav-order:hover {
  background: #8054d4;
  box-shadow: 0 0 18px rgba(150, 106, 255, 0.6);
  transform: translateY(-1px);
}

.floating-nav-pill .menu-toggle {
  display: none;
}

/* ==========================================================================
   COLLAPSED STATE: Centered SNG Logo Only Pill when actively scrolling
   ========================================================================== */
.floating-nav-pill.collapsed-logo-only {
  width: 58px !important;
  height: 58px !important;
  min-width: 58px !important;
  padding: 0 !important;
  border-radius: 50% !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 0 !important;
  background: rgba(18, 14, 30, 0.94) !important;
  border: 1.5px solid rgba(185, 145, 255, 0.7) !important;
  box-shadow: 0 12px 35px rgba(124, 77, 226, 0.65), 0 0 25px rgba(170, 130, 255, 0.5) !important;
  transform: translateY(-2px) scale(1.04);
  animation: logoPillPulse 2.4s ease-in-out infinite alternate;
  cursor: pointer;
}

.floating-nav-pill.collapsed-logo-only:hover {
  transform: translateY(-2px) scale(1.1) !important;
  box-shadow: 0 16px 45px rgba(135, 90, 240, 0.85), 0 0 32px rgba(195, 160, 255, 0.75) !important;
  border-color: rgba(220, 190, 255, 0.95) !important;
}

@keyframes logoPillPulse {
  0% {
    box-shadow: 0 10px 30px rgba(124, 77, 226, 0.55), 0 0 18px rgba(170, 130, 255, 0.4);
    border-color: rgba(180, 140, 255, 0.55);
  }
  100% {
    box-shadow: 0 14px 44px rgba(124, 77, 226, 0.8), 0 0 32px rgba(200, 160, 255, 0.75);
    border-color: rgba(220, 190, 255, 0.9);
  }
}

.floating-nav-pill.collapsed-logo-only .brand {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 0 !important;
}

.floating-nav-pill.collapsed-logo-only .brand-logo-img {
  width: 32px !important;
  height: 32px !important;
  transform: scale(1.12) !important;
  filter: drop-shadow(0 0 12px rgba(195, 160, 255, 0.95)) !important;
}

.floating-nav-pill.collapsed-logo-only:hover .brand-logo-img {
  transform: scale(1.22) rotate(6deg) !important;
  filter: drop-shadow(0 0 20px rgba(220, 190, 255, 1)) !important;
}

/* Hide brand-text, nav-links, and nav-actions smoothly when collapsed */
.floating-nav-pill.collapsed-logo-only .brand-text,
.floating-nav-pill.collapsed-logo-only .nav-links,
.floating-nav-pill.collapsed-logo-only .nav-actions {
  max-width: 0 !important;
  opacity: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: 0 !important;
  transform: scale(0.9) !important;
  filter: blur(3px) !important;
  pointer-events: none !important;
  overflow: hidden !important;
  transition: max-width 0.7s cubic-bezier(0.25, 1, 0.33, 1),
              opacity 0.35s ease,
              filter 0.35s ease,
              transform 0.45s ease,
              gap 0.5s ease;
}

@media (max-width: 768px) {
  .header-floating-wrapper {
    top: 12px;
    padding: 0 12px;
  }
  .floating-nav-pill {
    height: 54px;
    padding: 0 14px;
    width: 100%;
  }
  .floating-nav-pill .brand-text {
    font-size: 12px;
  }
  .floating-nav-pill .brand-text small {
    display: none;
  }
  .floating-nav-pill .brand-logo-img {
    width: 28px;
    height: 28px;
  }
  .floating-nav-pill .nav-links {
    display: none;
    position: fixed;
    top: 76px;
    left: 12px;
    right: 12px;
    padding: 20px;
    background: rgba(14, 11, 24, 0.98);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(175, 130, 255, 0.3);
    border-radius: 24px;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
    z-index: 99999;
  }
  .floating-nav-pill .nav-links.open {
    display: flex !important;
  }
  .floating-nav-pill .nav-links button {
    text-align: left;
    padding: 12px 14px;
    font-size: 13px;
    border-radius: 12px;
  }
  .floating-nav-pill .menu-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
  .floating-nav-pill .nav-order {
    display: none;
  }
  .floating-nav-pill.collapsed-logo-only {
    width: 50px !important;
    height: 50px !important;
    min-width: 50px !important;
  }
  .floating-nav-pill.collapsed-logo-only .brand-logo-img {
    width: 28px !important;
    height: 28px !important;
  }
}

`;

const combined = refCSS + '\n' + scrollyAndInteractionCSS;
fs.writeFileSync('src/index.css', combined);
console.log('Successfully wrote combined CSS to src/index.css. Total size:', combined.length);
