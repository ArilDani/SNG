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
  transition: top 0.4s ease;
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
  background: rgba(12, 10, 20, 0.85);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(155, 112, 255, 0.15);
  overflow: hidden;
  box-sizing: border-box;
  will-change: width, height, padding, transform, box-shadow, border-color;
  transition: width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              padding 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.5s ease,
              border-color 0.5s ease,
              box-shadow 0.5s ease,
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-nav-pill.nav-scrolled {
  background: rgba(14, 11, 24, 0.92);
  border-color: rgba(165, 125, 255, 0.32);
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
  transition: gap 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              width 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.brand-logo-img {
  width: 34px;
  height: 34px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(165, 125, 255, 0.5));
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.45s ease;
  display: block;
  flex-shrink: 0;
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
  overflow: hidden;
  transition: max-width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease 0.15s,
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.12s;
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
  gap: 20px;
  white-space: nowrap;
  max-width: 600px;
  opacity: 1;
  transform: scale(1);
  overflow: hidden;
  transition: max-width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease 0.18s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
              gap 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
  overflow: hidden;
  transition: max-width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease 0.18s,
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
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
  width: 58px;
  height: 58px;
  padding: 0;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  background: rgba(18, 14, 30, 0.94);
  border: 1.5px solid rgba(185, 145, 255, 0.7);
  box-shadow: 0 12px 35px rgba(124, 77, 226, 0.65), 0 0 25px rgba(170, 130, 255, 0.5);
  transform: translateY(-1px) scale(1.02);
  cursor: pointer;
}

.floating-nav-pill.collapsed-logo-only:hover {
  transform: translateY(-2px) scale(1.12);
  box-shadow: 0 16px 45px rgba(135, 90, 240, 0.85), 0 0 32px rgba(195, 160, 255, 0.75);
  border-color: rgba(220, 190, 255, 0.95);
}

.floating-nav-pill.collapsed-logo-only::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  border: 1.5px solid rgba(195, 155, 255, 0.8);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  opacity: 0.4;
  animation: logoGlowPulse 2.4s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes logoGlowPulse {
  0% {
    opacity: 0.25;
    transform: scale(0.97);
  }
  100% {
    opacity: 0.85;
    transform: scale(1.04);
  }
}

.floating-nav-pill.collapsed-logo-only .brand {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.floating-nav-pill.collapsed-logo-only .brand-logo-img {
  width: 32px;
  height: 32px;
  transform: scale(1.12);
  filter: drop-shadow(0 0 12px rgba(195, 160, 255, 0.95));
}

.floating-nav-pill.collapsed-logo-only:hover .brand-logo-img {
  transform: scale(1.22) rotate(6deg);
  filter: drop-shadow(0 0 20px rgba(220, 190, 255, 1));
}

/* Hide brand-text, nav-links, and nav-actions smoothly when collapsed without layout snapping */
.floating-nav-pill.collapsed-logo-only .brand-text,
.floating-nav-pill.collapsed-logo-only .nav-links,
.floating-nav-pill.collapsed-logo-only .nav-actions {
  max-width: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
  overflow: hidden;
  transform: scale(0.92);
  transition: max-width 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.2s ease-out 0s,
              transform 0.3s ease-out 0s;
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

/* ==========================================================================
   THE NEXUS ECOSYSTEM - SNG AGENCY LOGO CORE
   ========================================================================== */
.network-core-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  height: 100%;
}

.network-core-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: drop-shadow(0 0 12px rgba(220, 195, 255, 0.95));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
}

.network-core:hover .network-core-logo,
.network-core.core-pulsing .network-core-logo {
  transform: scale(1.16) rotate(5deg);
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 1));
}

/* ==========================================================================
   HERO READABILITY & HIGH-CONTRAST SECONDARY CTA
   ========================================================================== */
.hero-question {
  color: #f1edfc !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.85 !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.95), 0 0 24px rgba(10, 8, 20, 0.9) !important;
  max-width: 540px !important;
  margin: 24px auto 0 !important;
  letter-spacing: -0.01em !important;
  background: rgba(12, 10, 22, 0.58) !important;
  padding: 10px 22px !important;
  border-radius: 28px !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6) !important;
  display: inline-block !important;
}

.btn-hero-secondary {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 13px 26px !important;
  border-radius: 50px !important;
  background: rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1.5px solid rgba(210, 180, 255, 0.55) !important;
  color: #ffffff !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
  text-decoration: none !important;
}

.btn-hero-secondary:hover {
  background: rgba(165, 125, 255, 0.28) !important;
  border-color: rgba(230, 205, 255, 0.95) !important;
  color: #ffffff !important;
  box-shadow: 0 10px 35px rgba(145, 95, 240, 0.55), 0 0 24px rgba(185, 145, 255, 0.6) !important;
  transform: translateY(-2px) !important;
}

.btn-hero-secondary b {
  font-weight: 800;
  transition: transform 0.25s ease;
}

.btn-hero-secondary:hover b {
  transform: translate(2px, -2px);
}

/* ==========================================================================
   SECTION: BEHIND THE SNG (TEAM)
   ========================================================================== */
.team-section {
  position: relative;
  background: radial-gradient(ellipse at 50% 20%, rgba(133, 88, 216, 0.12), transparent 60%), #0c0b14;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.team-section.team-in-about {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 0;
  padding: 85px 0 100px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.team-card {
  position: relative;
  background: linear-gradient(160deg, rgba(26, 22, 38, 0.88), rgba(15, 13, 23, 0.92));
  border: 1px solid rgba(195, 170, 255, 0.16);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

.team-card:hover {
  transform: translateY(-8px);
  border-color: rgba(185, 145, 255, 0.55);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(145, 95, 240, 0.22);
}

.team-photo-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3.8;
  overflow: hidden;
  background: #151322;
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
  filter: grayscale(20%) contrast(105%);
}

.team-card:hover .team-photo {
  transform: scale(1.08);
  filter: grayscale(0%) contrast(110%);
}

.team-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(15, 13, 23, 0.9) 95%);
  pointer-events: none;
}

.team-num {
  position: absolute;
  top: 12px;
  right: 12px;
  font: 9px var(--mono, monospace);
  letter-spacing: 0.14em;
  color: #e5dcff;
  background: rgba(18, 14, 30, 0.75);
  backdrop-filter: blur(8px);
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.team-body {
  padding: 20px 22px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
}

.team-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.team-role {
  font-size: 11px;
  font-weight: 600;
  color: #c5aaff;
  letter-spacing: 0.02em;
  margin: 4px 0 0;
}

.team-bio {
  font-size: 11px;
  line-height: 1.7;
  color: #a7a3b5;
  margin: 0;
}

.team-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.team-skill-tag {
  font-size: 9px;
  color: #d8cefa;
  background: rgba(145, 95, 240, 0.16);
  border: 1px solid rgba(175, 135, 255, 0.25);
  border-radius: 20px;
  padding: 3px 8px;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.team-portfolio-box {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.team-portfolio-box small {
  font: 8px var(--mono, monospace);
  letter-spacing: 0.12em;
  color: #8c889c;
}

.team-portfolio-box span {
  font-size: 11px;
  color: #ede9f7;
  font-weight: 600;
  line-height: 1.4;
}

@media (max-width: 1100px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* ==========================================================================
   ADMIN DASHBOARD TEAM MANAGEMENT STYLES
   ========================================================================== */
.team-toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(133, 88, 216, 0.25);
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 16px;
}

.team-toggle-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.badge-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

.badge-active {
  background: #d4f7dc;
  color: #126829;
  border: 1px solid #a3e8b3;
}

.badge-inactive {
  background: #fde8e8;
  color: #9a1a1a;
  border: 1px solid #f8b8b8;
}

.admin-team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .admin-team-grid {
    grid-template-columns: 1fr;
  }
}

.admin-team-card {
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(20, 20, 30, 0.12);
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-team-card-top {
  display: flex;
  gap: 14px;
  align-items: center;
}

.admin-team-avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8558d8;
  flex-shrink: 0;
}

.admin-team-meta h4 {
  margin: 0;
  font-size: 15px;
  color: #1a1a24;
}

.admin-team-role {
  font-size: 11px;
  color: #6945a4;
  font-weight: 600;
  display: block;
  margin: 2px 0 3px;
}

.admin-team-bio {
  font-size: 11px;
  color: #4b4d58;
  line-height: 1.6;
  margin: 0;
}

.admin-team-section-box {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(20, 20, 30, 0.08);
  padding: 10px 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-team-section-box small {
  font-size: 8px;
  font-weight: 700;
  color: #6845a7;
  letter-spacing: 0.1em;
}

.admin-team-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.admin-skill-badge {
  font-size: 9px;
  background: #ede6fc;
  color: #55358c;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.admin-team-portfolio-text {
  font-size: 11px;
  font-weight: 600;
  color: #21212b;
  margin: 0;
}

.admin-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(20, 20, 30, 0.08);
}

.btn-demo-tag {
  background: rgba(133, 88, 216, 0.12);
  border: 1px solid rgba(133, 88, 216, 0.28);
  color: #55358c;
  font-size: 9px;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-demo-tag:hover {
  background: #8558d8;
  color: #ffffff;
}

/* ============================================================
   DRIBBLE-GRADE LUXURY AUTH PAGE & AUTH MODAL
   ============================================================ */

/* Full-Page Auth Experience */
.auth-page-wrapper {
  min-height: 100vh;
  background: #08060f;
  color: #f4f3fb;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.auth-ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  opacity: 0.25;
}

.auth-ambient-glow.glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #7c3aed, #4f46e5);
  top: -100px;
  left: -100px;
}

.auth-ambient-glow.glow-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #a855f7, #6366f1);
  bottom: -150px;
  right: -100px;
}

.auth-page-container {
  width: min(1100px, 100%);
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Brand Side (Left) */
.auth-brand-side {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-right: 20px;
}

.auth-brand-header {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
}

.auth-logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 0 14px rgba(162, 101, 255, 0.55));
}

.auth-brand-meta {
  display: flex;
  flex-direction: column;
}

.auth-kicker {
  font: 9px var(--mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #b789ff;
  font-weight: 700;
}

.auth-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.auth-pill-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 8px var(--mono);
  letter-spacing: 0.12em;
  color: #c49eff;
  background: rgba(138, 80, 245, 0.14);
  border: 1px solid rgba(175, 125, 255, 0.28);
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.auth-headline {
  font-size: clamp(34px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.05em;
  color: #ffffff;
  margin: 0;
}

.auth-headline .text-gradient {
  background: linear-gradient(135deg, #c49eff, #8a55f5, #5f22c9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-desc {
  font-size: 13px;
  line-height: 1.7;
  color: #a49fc0;
  margin: 12px 0 0;
  max-width: 460px;
}

.auth-features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
}

.auth-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.auth-feature-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(140, 85, 245, 0.16);
  border: 1px solid rgba(180, 135, 255, 0.3);
  display: grid;
  place-items: center;
  color: #c49eff;
  flex-shrink: 0;
}

.auth-feature-item strong {
  display: block;
  font-size: 12px;
  color: #f0edf8;
  margin-bottom: 2px;
}

.auth-feature-item p {
  margin: 0;
  font-size: 11px;
  color: #928ca9;
  line-height: 1.5;
}

.auth-brand-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font: 9px var(--mono);
  color: #7b7593;
}

.auth-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #b789ff;
  font-size: 10px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.auth-back-link:hover {
  color: #ffffff;
  transform: translateX(-2px);
}

/* Right Side: Auth Card */
.auth-form-side {
  width: 100%;
}

.auth-card-panel {
  position: relative;
  background: linear-gradient(168deg, rgba(22, 17, 36, 0.95), rgba(12, 9, 22, 0.98));
  border: 1px solid rgba(195, 155, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.75), 0 0 50px rgba(138, 80, 245, 0.12);
  padding: 34px 36px;
  overflow: hidden;
}

.auth-card-top-glow {
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #9d60ff, #cfabff, transparent);
}

.auth-tab-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
}

.auth-tab-item {
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: #9f9cb2;
  font-size: 12px;
  font-weight: 600;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.auth-tab-item:hover {
  color: #ffffff;
}

.auth-tab-item.active {
  background: linear-gradient(135deg, rgba(142, 85, 245, 0.38), rgba(105, 45, 215, 0.5));
  color: #ffffff;
  border: 1px solid rgba(195, 160, 255, 0.4);
  box-shadow: 0 4px 16px rgba(120, 60, 230, 0.28);
}

.auth-form-intro {
  margin-bottom: 20px;
}

.auth-form-intro h2 {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px;
  letter-spacing: -0.03em;
}

.auth-form-intro p {
  font-size: 11px;
  color: #9a94b5;
  margin: 0;
  line-height: 1.5;
}

.auth-alert-error {
  background: rgba(230, 50, 50, 0.16);
  border: 1px solid rgba(230, 50, 50, 0.38);
  color: #ff9b9b;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.auth-alert-error .alert-icon {
  color: #ff6b6b;
  flex-shrink: 0;
}

.auth-form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-input-field label {
  font-size: 11px;
  font-weight: 600;
  color: #d1cde4;
}

.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-text-action {
  background: none;
  border: none;
  color: #b789ff;
  font-size: 10px;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
}

.btn-text-action:hover {
  color: #ffffff;
}

.auth-input-box {
  display: flex;
  align-items: center;
  background: rgba(14, 11, 24, 0.85);
  border: 1px solid rgba(180, 140, 255, 0.22);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.auth-input-box:focus-within {
  border-color: #a86cff;
  box-shadow: 0 0 16px rgba(168, 108, 255, 0.35);
  background: rgba(18, 14, 30, 0.98);
}

.auth-input-box .input-svg-icon {
  padding: 0 12px;
  color: #8f8ba8;
  display: grid;
  place-items: center;
}

.auth-input-box input {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  width: 100% !important;
  padding: 11px 14px 11px 0 !important;
  color: #ffffff !important;
  font-size: 12px !important;
}

.auth-input-box input::placeholder {
  color: #65617a;
}

.auth-input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.auth-btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #8745f5, #5f22c9);
  border: 1px solid rgba(220, 190, 255, 0.38);
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 6px 22px rgba(120, 50, 230, 0.35);
  margin-top: 4px;
}

.auth-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(140, 70, 255, 0.45);
  filter: brightness(1.08);
}

.auth-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: #8c88a4;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.auth-link-btn {
  background: none;
  border: none;
  color: #b789ff;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.auth-link-btn:hover {
  color: #ffffff;
}

@media (max-width: 860px) {
  .auth-page-container {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .auth-brand-side {
    padding-right: 0;
    text-align: center;
    align-items: center;
  }
  .auth-desc {
    max-width: 100%;
  }
  .auth-features-list {
    display: none;
  }
  .auth-brand-foot {
    display: none;
  }
}

/* ============================================================
   DRIBBLE-GRADE LUXURY ADMIN DASHBOARD STYLES
   ============================================================ */

/* Main Container Override */
.dashboard-shell {
  display: grid !important;
  grid-template-columns: 255px 1fr !important;
  min-height: 100vh !important;
  background: #090710 !important;
  color: #f4f3fb !important;
}

/* Sidebar */
.dash-sidebar {
  background: #0d0a17 !important;
  border-right: 1px solid rgba(180, 140, 255, 0.1) !important;
  padding: 24px 16px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 3px !important;
}

.dash-sidebar .brand {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 6px 8px 20px !important;
  margin-bottom: 12px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  cursor: pointer;
}

.dash-sidebar .brand-logo-img {
  width: 32px !important;
  height: 32px !important;
  filter: drop-shadow(0 0 10px rgba(162, 101, 255, 0.5));
}

.dash-sidebar .brand span {
  font-size: 13px !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  color: #ffffff !important;
}

.dash-sidebar .brand small {
  display: block !important;
  font: 8px var(--mono) !important;
  color: #a47ef5 !important;
  letter-spacing: 0.14em !important;
}

.dash-sidebar .dash-label {
  font: 8px var(--mono) !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #79738e !important;
  margin: 18px 10px 8px !important;
  font-weight: 700 !important;
}

.dash-sidebar button {
  display: flex !important;
  align-items: center !important;
  gap: 11px !important;
  width: 100% !important;
  padding: 10px 12px !important;
  border-radius: 8px !important;
  border: 1px solid transparent !important;
  background: transparent !important;
  color: #9f9cb2 !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  text-align: left !important;
}

.dash-sidebar button:hover {
  background: rgba(140, 85, 245, 0.12) !important;
  color: #ffffff !important;
  border-color: rgba(140, 85, 245, 0.2) !important;
}

.dash-sidebar button.active {
  background: linear-gradient(135deg, rgba(142, 85, 245, 0.28), rgba(95, 40, 205, 0.38)) !important;
  color: #ffffff !important;
  border-color: rgba(180, 135, 255, 0.38) !important;
  box-shadow: 0 4px 18px rgba(120, 60, 230, 0.2) !important;
  font-weight: 600 !important;
}

.dash-count-badge {
  margin-left: auto !important;
  font-size: 10px !important;
  font-family: var(--mono) !important;
  padding: 2px 7px !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  color: #c4b8e2 !important;
  font-weight: 600 !important;
}

.dash-sidebar button.active .dash-count-badge {
  background: rgba(180, 135, 255, 0.35) !important;
  color: #ffffff !important;
}

.dash-btn-logout {
  margin-top: auto !important;
  color: #e57373 !important;
}

.dash-btn-logout:hover {
  background: rgba(230, 60, 60, 0.14) !important;
  border-color: rgba(230, 60, 60, 0.3) !important;
  color: #ff9999 !important;
}

/* Main Dashboard Area */
.dash-main {
  padding: 34px 44px 70px !important;
  min-width: 0 !important;
  background: radial-gradient(circle at 92% 8%, rgba(130, 60, 240, 0.09), transparent 45%), #090710 !important;
}

/* Top Bar */
.dash-top {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 20px !important;
  margin-bottom: 28px !important;
  flex-wrap: wrap !important;
}

.dash-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font: 8px var(--mono);
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}

.dash-breadcrumb-root {
  color: #7b7593;
}

.dash-breadcrumb-separator {
  color: #555068;
}

.dash-breadcrumb-active {
  color: #b789ff;
  font-weight: 700;
}

.dash-main-title {
  font-size: 26px !important;
  font-weight: 700 !important;
  letter-spacing: -0.04em !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.dash-main-desc {
  font-size: 11px !important;
  color: #928ca9 !important;
  margin: 6px 0 0 !important;
  line-height: 1.5 !important;
}

.dash-top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.dash-live-status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(140, 85, 245, 0.12);
  border: 1px solid rgba(180, 140, 255, 0.25);
  font: 9px var(--mono);
  color: #c49eff;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.live-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.live-pulse-dot.connected {
  background: #4ade80;
  box-shadow: 0 0 10px #4ade80;
}

.live-pulse-dot.connecting {
  background: #ffb347;
  box-shadow: 0 0 10px #ffb347;
}

.dash-user-profile-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px 5px 6px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar-initials {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8745f5, #5516b8);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(138, 80, 245, 0.4);
}

.user-avatar-initials.client-avatar {
  background: linear-gradient(135deg, #2b7a5a, #1b523c);
  box-shadow: 0 0 12px rgba(43, 122, 90, 0.4);
}

.user-profile-info {
  display: flex;
  flex-direction: column;
}

.user-profile-name {
  font-size: 11px;
  color: #ffffff;
  font-weight: 600;
}

.user-profile-role-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font: 8px var(--mono);
  color: #b789ff;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.user-profile-role-tag.client-tag {
  color: #68e29a;
}

/* Metric Cards */
.metric-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)) !important;
  gap: 16px !important;
  margin-bottom: 24px !important;
}

.metric {
  background: linear-gradient(145deg, rgba(23, 18, 38, 0.95), rgba(13, 10, 22, 0.98)) !important;
  border: 1px solid rgba(180, 140, 255, 0.18) !important;
  border-radius: 12px !important;
  padding: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
  transition: all 0.22s ease !important;
  position: relative;
  overflow: hidden;
}

.metric:hover {
  transform: translateY(-3px) !important;
  border-color: rgba(180, 140, 255, 0.38) !important;
  box-shadow: 0 16px 40px rgba(120, 60, 230, 0.22) !important;
}

.metric-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.metric small {
  font: 9px var(--mono) !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: #9f9cb2 !important;
  font-weight: 700;
}

.metric-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(140, 85, 245, 0.14);
  border: 1px solid rgba(180, 140, 255, 0.25);
  display: grid;
  place-items: center;
  color: #c49eff;
}

.metric-icon-box.pending-box {
  background: rgba(255, 179, 71, 0.14);
  border-color: rgba(255, 179, 71, 0.3);
  color: #ffb347;
}

.metric strong {
  display: block !important;
  font-size: 28px !important;
  letter-spacing: -0.06em !important;
  color: #ffffff !important;
  margin: 6px 0 4px !important;
  font-weight: 700;
}

.metric span {
  font-size: 10px !important;
  color: #8f8ba8 !important;
}

/* Atlas Status Card */
.dash-atlas-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(35, 140, 70, 0.1), rgba(20, 16, 32, 0.9));
  border: 1px solid rgba(50, 170, 90, 0.3);
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.atlas-status-headline {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 4px;
}

.atlas-uri-info {
  margin: 0;
  font-size: 10px;
  color: #9f9cb2;
}

.atlas-stats-pills {
  display: flex;
  gap: 8px;
}

.atlas-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 8px var(--mono);
  padding: 4px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e0dcf2;
}

/* Dashboard Panels */
.dash-panel {
  background: linear-gradient(165deg, rgba(20, 16, 32, 0.95), rgba(12, 9, 20, 0.98)) !important;
  border: 1px solid rgba(180, 140, 255, 0.16) !important;
  border-radius: 14px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4) !important;
  padding: 26px 28px !important;
  margin-bottom: 24px !important;
  color: #f4f3fb !important;
}

.panel-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 16px !important;
  margin-bottom: 20px !important;
  padding-bottom: 14px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  flex-wrap: wrap !important;
}

.panel-head h3 {
  font-size: 16px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.panel-head span {
  font: 8px var(--mono) !important;
  letter-spacing: 0.12em !important;
  color: #b789ff !important;
  text-transform: uppercase !important;
}

.dash-notice-box {
  background: rgba(140, 85, 245, 0.08);
  border: 1px solid rgba(180, 140, 255, 0.22);
  border-radius: 10px;
  color: #d0c8ed;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 11px;
  line-height: 1.6;
}

.dash-notice-box .notice-icon {
  color: #b789ff;
  flex-shrink: 0;
  margin-top: 2px;
}

.dash-notice-box p {
  margin: 0;
}

/* Search bar */
.dash-search-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.dash-search-wrap {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(12, 9, 20, 0.85);
  border: 1px solid rgba(180, 140, 255, 0.22);
  border-radius: 8px;
  transition: all 0.2s;
}

.dash-search-wrap:focus-within {
  border-color: #a86cff;
  box-shadow: 0 0 14px rgba(168, 108, 255, 0.28);
}

.dash-search-wrap .search-svg {
  padding-left: 12px;
  color: #79738e;
}

.dash-search-wrap input {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  width: 100% !important;
  padding: 10px 14px !important;
  color: #ffffff !important;
  font-size: 12px !important;
}

/* Tables */
.table-wrap {
  overflow-x: auto !important;
}

table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 6px !important;
  min-width: 650px !important;
}

th {
  font: 8px var(--mono) !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: #8c86a3 !important;
  padding: 10px 14px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  text-align: left !important;
}

td {
  padding: 13px 14px !important;
  background: rgba(22, 17, 36, 0.6) !important;
  color: #dfdbe8 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.04) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
  font-size: 11px !important;
}

tr td:first-child {
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
  border-left: 1px solid rgba(255, 255, 255, 0.04) !important;
}

tr td:last-child {
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
  border-right: 1px solid rgba(255, 255, 255, 0.04) !important;
}

tr:hover td {
  background: rgba(35, 27, 56, 0.85) !important;
  border-color: rgba(180, 140, 255, 0.22) !important;
}

/* User cell */
.user-cell-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-table-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
  flex-shrink: 0;
}

.user-table-avatar.admin-avatar {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.4);
}

.user-table-avatar.client-avatar {
  background: linear-gradient(135deg, #059669, #047857);
}

.self-tag {
  font-size: 8px;
  font-family: var(--mono);
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(180, 140, 255, 0.2);
  color: #c49eff;
  font-weight: 700;
}

/* Role Badges */
.user-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: 9px var(--mono);
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 700;
}

.badge-role-admin {
  background: rgba(135, 70, 240, 0.18) !important;
  color: #c49eff !important;
  border: 1px solid rgba(175, 120, 255, 0.4) !important;
  box-shadow: 0 0 12px rgba(135, 70, 240, 0.2) !important;
}

.badge-role-user {
  background: rgba(16, 185, 129, 0.14) !important;
  color: #6ee7b7 !important;
  border: 1px solid rgba(16, 185, 129, 0.35) !important;
}

/* Status Badges */
.status {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  border-radius: 30px !important;
  padding: 4px 10px !important;
  font: 9px var(--mono) !important;
  background: rgba(255, 179, 71, 0.14) !important;
  color: #ffb347 !important;
  border: 1px solid rgba(255, 179, 71, 0.3) !important;
  white-space: nowrap !important;
}

.status.done {
  background: rgba(74, 222, 128, 0.14) !important;
  color: #4ade80 !important;
  border-color: rgba(74, 222, 128, 0.35) !important;
}

.status.progress {
  background: rgba(168, 85, 247, 0.16) !important;
  color: #c084fc !important;
  border-color: rgba(168, 85, 247, 0.35) !important;
}

.status.rejected {
  background: rgba(248, 113, 113, 0.14) !important;
  color: #f87171 !important;
  border-color: rgba(248, 113, 113, 0.3) !important;
}

/* Select Controls */
.table-select,
.table-select-role {
  border: 1px solid rgba(180, 140, 255, 0.28) !important;
  background: #151124 !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  padding: 6px 10px !important;
  font-size: 11px !important;
  outline: none !important;
  cursor: pointer;
  transition: all 0.2s;
}

.table-select:focus,
.table-select-role:focus {
  border-color: #a86cff !important;
  box-shadow: 0 0 10px rgba(168, 108, 255, 0.3) !important;
}

/* Buttons */
.dash-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8745f5, #5f22c9);
  border: 1px solid rgba(220, 190, 255, 0.35);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(120, 50, 230, 0.3);
}

.dash-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(140, 70, 255, 0.4);
}

.dash-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #dfdbe8;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.dash-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.dash-btn-ghost {
  padding: 7px 12px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9f9cb2;
  font-size: 11px;
  cursor: pointer;
}

.dash-btn-ghost:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.dash-table-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(140, 85, 245, 0.12);
  border: 1px solid rgba(180, 140, 255, 0.25);
  color: #c49eff;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.dash-table-btn:hover {
  background: #8558d8;
  color: #ffffff;
}

.dash-table-del-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 9px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgba(248, 113, 113, 0.3);
  color: #f87171;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.dash-table-del-btn:hover:not(:disabled) {
  background: rgba(248, 113, 113, 0.2);
  color: #ffffff;
}

.dash-table-del-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dash-link-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #b789ff;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.dash-link-action:hover {
  color: #ffffff;
}

/* Service cards in dashboard */
.dash-service-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.dash-service-card {
  padding: 18px;
  background: rgba(22, 17, 36, 0.7);
  border: 1px solid rgba(180, 140, 255, 0.18);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
}

.dash-service-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.dash-service-icon-badge {
  font-size: 16px;
  color: #b789ff;
}

.dash-service-cat-tag {
  font: 8px var(--mono);
  color: #8c86a3;
  text-transform: uppercase;
}

.dash-service-desc {
  font-size: 11px;
  color: #bdb9d2;
  line-height: 1.6;
  margin: 8px 0 0;
}

.dash-card-btn-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Articles list in dashboard */
.dash-article-row {
  padding: 18px;
  border: 1px solid rgba(180, 140, 255, 0.16);
  border-radius: 10px;
  background: rgba(22, 17, 36, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.dash-article-meta-tag {
  font: 8px var(--mono);
  color: #b789ff;
  letter-spacing: 0.1em;
}

.dash-article-title {
  font-size: 14px;
  color: #ffffff;
  margin: 6px 0;
  letter-spacing: -0.02em;
}

.dash-article-excerpt {
  font-size: 11px;
  color: #a49fc0;
  margin: 0;
  line-height: 1.5;
}

/* Team toggle bar */
.dash-team-toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: rgba(22, 17, 36, 0.8);
  border: 1px solid rgba(180, 140, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  gap: 14px;
  flex-wrap: wrap;
}

.team-toggle-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
}

.toggle-status-text {
  margin-left: 8px;
  font: 9px var(--mono);
  color: #b789ff;
  font-weight: 700;
}

/* Messages in dashboard */
.dash-message-card {
  padding: 18px;
  border: 1px solid rgba(180, 140, 255, 0.16);
  border-radius: 10px;
  background: rgba(22, 17, 36, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.dash-msg-sender-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.dash-msg-email {
  font-size: 11px;
  color: #8c86a3;
}

.dash-msg-text {
  font-size: 11px;
  color: #cbc6df;
  line-height: 1.6;
  margin: 6px 0;
}

.dash-msg-date {
  font: 8px var(--mono);
  color: #79738e;
}

/* Client Dashboard additions */
.dash-client-order-card {
  padding: 20px;
  background: rgba(22, 17, 36, 0.75);
  border: 1px solid rgba(180, 140, 255, 0.18);
  border-radius: 12px;
}

.dash-client-order-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}

.dash-client-order-top h4 {
  font-size: 15px;
  color: #ffffff;
  margin: 0 0 4px;
}

.order-id-meta {
  font: 9px var(--mono);
  color: #8c86a3;
}

.client-order-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.client-order-details-grid small {
  font: 8px var(--mono);
  color: #8c86a3;
}

.client-order-details-grid p {
  margin: 4px 0 0;
  font-size: 11px;
  font-weight: 600;
  color: #f0edf8;
}

.client-admin-note-box {
  background: rgba(140, 85, 245, 0.1);
  border: 1px solid rgba(180, 140, 255, 0.25);
  border-radius: 8px;
  padding: 12px 14px;
  margin-top: 12px;
}

.client-admin-note-box strong {
  font-size: 10px;
  color: #b789ff;
  display: block;
  margin-bottom: 4px;
  font-family: var(--mono);
}

.client-admin-note-box p {
  margin: 0;
  font-size: 11px;
  color: #dfdbed;
  line-height: 1.6;
}

.btn-open-fullscreen {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #b789ff;
  font-size: 10px;
  font-family: var(--mono);
  cursor: pointer;
  padding: 4px 0;
  text-decoration: underline;
}

.btn-open-fullscreen:hover {
  color: #ffffff;
}

@media (max-width: 860px) {
  .dashboard-shell {
    grid-template-columns: 1fr !important;
  }
  .dash-sidebar {
    padding: 12px !important;
    flex-direction: row !important;
    overflow-x: auto !important;
  }
  .dash-sidebar .brand,
  .dash-sidebar .dash-label {
    display: none !important;
  }
  .dash-sidebar button {
    width: auto !important;
    white-space: nowrap !important;
  }
  .dash-main {
    padding: 20px 16px 50px !important;
  }
}

/* ============================================================
   COSMIC MODAL SYSTEM & GLASSMORPHISM DIALOGS
   ============================================================ */

.cosmic-modal-overlay {
  position: fixed !important;
  inset: 0 !important;
  z-index: 100000 !important;
  background: rgba(5, 3, 12, 0.88) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px !important;
  overflow-y: auto !important;
  animation: cosmicModalFadeIn 0.22s ease-out forwards;
}

@keyframes cosmicModalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cosmic-auth-card,
.cosmic-modal-card {
  position: relative !important;
  width: min(640px, 95vw) !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
  background: linear-gradient(168deg, rgba(22, 17, 36, 0.98), rgba(11, 8, 20, 0.99)) !important;
  border: 1px solid rgba(195, 155, 255, 0.32) !important;
  border-radius: 18px !important;
  box-shadow: 0 40px 110px rgba(0, 0, 0, 0.9), 0 0 50px rgba(138, 80, 245, 0.22) !important;
  color: #f5f4fb !important;
  padding: 32px 36px !important;
  box-sizing: border-box !important;
  z-index: 100001 !important;
  animation: cosmicCardPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes cosmicCardPopIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.cosmic-card-glow {
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.9), transparent);
  pointer-events: none;
}

.cosmic-modal-head {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  margin-bottom: 24px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding-bottom: 16px !important;
}

.cosmic-badge-kicker {
  display: inline-block !important;
  font-family: var(--mono) !important;
  font-size: 10px !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: #c09aff !important;
  margin-bottom: 6px !important;
}

.cosmic-auth-title {
  font-size: 22px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.cosmic-modal-close-btn {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #c9c5de !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 14px !important;
  transition: all 0.2s ease !important;
}

.cosmic-modal-close-btn:hover {
  background: rgba(239, 68, 68, 0.2) !important;
  border-color: rgba(239, 68, 68, 0.5) !important;
  color: #ff8e8e !important;
  transform: scale(1.05) !important;
}

.cosmic-auth-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.cosmic-form-row {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 14px !important;
}

@media (max-width: 600px) {
  .cosmic-form-row {
    grid-template-columns: 1fr !important;
  }
}

.cosmic-form-group {
  display: flex !important;
  flex-direction: column !important;
  gap: 7px !important;
  text-align: left !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.cosmic-form-group label {
  font-family: var(--mono) !important;
  font-size: 10.5px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: #c39bff !important;
  font-weight: 600 !important;
}

.cosmic-form-group input,
.cosmic-form-group select,
.cosmic-form-group textarea,
.table-select {
  width: 100% !important;
  box-sizing: border-box !important;
  background: rgba(13, 10, 24, 0.95) !important;
  border: 1px solid rgba(180, 140, 255, 0.28) !important;
  border-radius: 10px !important;
  padding: 11px 14px !important;
  color: #ffffff !important;
  font-size: 13px !important;
  font-family: inherit !important;
  outline: none !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
}

.cosmic-form-group input:focus,
.cosmic-form-group select:focus,
.cosmic-form-group textarea:focus,
.table-select:focus {
  border-color: #a855f7 !important;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.28) !important;
}

.cosmic-form-group textarea {
  resize: vertical !important;
  line-height: 1.6 !important;
}

.cosmic-form-actions {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 12px !important;
  margin-top: 20px !important;
  padding-top: 18px !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.cosmic-btn-primary {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  background: linear-gradient(135deg, #8a50f5 0%, #632cd6 100%) !important;
  color: #ffffff !important;
  font-size: 12.5px !important;
  font-weight: 600 !important;
  padding: 11px 22px !important;
  border-radius: 9px !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 18px rgba(138, 80, 245, 0.35) !important;
}

.cosmic-btn-primary:hover {
  box-shadow: 0 0 28px rgba(138, 80, 245, 0.6) !important;
  transform: translateY(-1px) !important;
}

.cosmic-btn-ghost {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  color: #c4c1d4 !important;
  font-size: 12.5px !important;
  font-weight: 500 !important;
  padding: 11px 18px !important;
  border-radius: 9px !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.cosmic-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  color: #ffffff !important;
}

/* ============================================================
   BLOG WRITING STUDIO (FULL RICH EDITOR & LIVE PREVIEW)
   ============================================================ */

.blog-studio-overlay {
  padding: 16px !important;
}

.blog-studio-card {
  position: relative !important;
  width: min(1080px, 98vw) !important;
  height: min(94vh, 920px) !important;
  display: flex !important;
  flex-direction: column !important;
  background: linear-gradient(168deg, rgba(19, 14, 32, 0.99), rgba(9, 7, 16, 0.99)) !important;
  border: 1px solid rgba(195, 155, 255, 0.35) !important;
  border-radius: 20px !important;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.95), 0 0 60px rgba(138, 80, 245, 0.25) !important;
  color: #f5f4fb !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  z-index: 100001 !important;
  animation: cosmicCardPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Topbar */
.blog-studio-topbar {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 16px 24px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  background: rgba(14, 10, 24, 0.75) !important;
  backdrop-filter: blur(10px) !important;
  gap: 16px !important;
  flex-shrink: 0 !important;
}

.blog-studio-brand {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
}

.blog-back-btn {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #cfcbe2 !important;
  padding: 7px 12px !important;
  border-radius: 8px !important;
  font-size: 11px !important;
  font-family: var(--mono) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}

.blog-back-btn:hover {
  background: rgba(255, 255, 255, 0.14) !important;
  color: #ffffff !important;
}

.blog-brand-meta {
  display: flex !important;
  flex-direction: column !important;
}

.blog-kicker {
  font-family: var(--mono) !important;
  font-size: 9.5px !important;
  letter-spacing: 0.12em !important;
  color: #be9eff !important;
  text-transform: uppercase !important;
}

.blog-studio-heading {
  font-size: 16px !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  margin: 2px 0 0 !important;
  color: #ffffff !important;
}

.blog-studio-center-controls {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.blog-stats-pill {
  display: flex !important;
  align-items: center !important;
  gap: 7px !important;
  padding: 6px 14px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(195, 155, 255, 0.16) !important;
  border-radius: 100px !important;
  font-family: var(--mono) !important;
  font-size: 11px !important;
  color: #bfa6ff !important;
}

.stats-dot {
  color: rgba(255, 255, 255, 0.3) !important;
}

.blog-view-toggle {
  display: flex !important;
  background: rgba(10, 7, 18, 0.8) !important;
  border: 1px solid rgba(195, 155, 255, 0.2) !important;
  border-radius: 9px !important;
  padding: 3px !important;
  gap: 4px !important;
}

.view-toggle-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 6px 13px !important;
  background: transparent !important;
  border: none !important;
  color: #9d99b2 !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.view-toggle-btn.active {
  background: linear-gradient(135deg, rgba(138, 80, 245, 0.35), rgba(99, 44, 214, 0.4)) !important;
  color: #ffffff !important;
  border: 1px solid rgba(195, 155, 255, 0.35) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
}

.view-toggle-btn:hover:not(.active) {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

.blog-publish-btn {
  padding: 8px 18px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}

/* Metadata Strip */
.blog-studio-meta-strip {
  padding: 16px 24px !important;
  background: rgba(16, 12, 28, 0.6) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  flex-shrink: 0 !important;
}

.meta-headline-col {
  width: 100% !important;
}

.blog-headline-input {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 2px solid rgba(195, 155, 255, 0.25) !important;
  color: #ffffff !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  padding: 6px 0 !important;
  outline: none !important;
  transition: border-color 0.2s !important;
}

.blog-headline-input:focus {
  border-color: #a855f7 !important;
}

.meta-secondary-row {
  display: grid !important;
  grid-template-columns: 240px 1fr 280px !important;
  gap: 14px !important;
  align-items: flex-start !important;
}

@media (max-width: 900px) {
  .meta-secondary-row {
    grid-template-columns: 1fr !important;
  }
}

.meta-field-group {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}

.meta-field-group label {
  font-family: var(--mono) !important;
  font-size: 9.5px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #bfa6ff !important;
}

.category-select-wrapper {
  display: flex !important;
  gap: 6px !important;
}

.blog-select-input,
.blog-text-input,
.blog-input-sm {
  background: rgba(13, 10, 24, 0.95) !important;
  border: 1px solid rgba(180, 140, 255, 0.25) !important;
  border-radius: 8px !important;
  padding: 8px 11px !important;
  color: #ffffff !important;
  font-size: 11.5px !important;
  outline: none !important;
  transition: border-color 0.2s !important;
}

.blog-select-input:focus,
.blog-text-input:focus,
.blog-input-sm:focus {
  border-color: #a855f7 !important;
}

.cover-input-wrapper {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
}

.cover-input-wrapper input {
  width: 100% !important;
  padding-right: 28px !important;
}

.cover-clear-btn {
  position: absolute !important;
  right: 6px !important;
  background: none !important;
  border: none !important;
  color: #a8a4be !important;
  cursor: pointer !important;
  font-size: 11px !important;
  padding: 4px !important;
}

.cover-presets-row {
  display: flex !important;
  gap: 6px !important;
  overflow-x: auto !important;
}

.preset-thumb-btn {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
  padding: 3px 7px 3px 4px !important;
  color: #cfcbe2 !important;
  font-size: 10px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}

.preset-thumb-btn img {
  width: 20px !important;
  height: 20px !important;
  border-radius: 4px !important;
  object-fit: cover !important;
}

.preset-thumb-btn.active {
  border-color: #a855f7 !important;
  background: rgba(168, 85, 247, 0.2) !important;
  color: #ffffff !important;
}

.meta-excerpt-group {
  display: flex !important;
  flex-direction: column !important;
  gap: 5px !important;
}

.meta-excerpt-group label {
  font-family: var(--mono) !important;
  font-size: 9.5px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #bfa6ff !important;
}

.blog-excerpt-textarea {
  width: 100% !important;
  box-sizing: border-box !important;
  background: rgba(13, 10, 24, 0.95) !important;
  border: 1px solid rgba(180, 140, 255, 0.25) !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  color: #e2dfed !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  outline: none !important;
  resize: none !important;
}

.blog-excerpt-textarea:focus {
  border-color: #a855f7 !important;
}

/* Workspace */
.blog-studio-workspace {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  position: relative !important;
}

.blog-editor-pane {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}

/* Formatting Toolbar */
.blog-formatting-toolbar {
  display: flex !important;
  align-items: center !important;
  padding: 8px 24px !important;
  background: rgba(13, 9, 22, 0.92) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  gap: 6px !important;
  overflow-x: auto !important;
  flex-shrink: 0 !important;
}

.toolbar-group {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
}

.toolbar-divider {
  width: 1px !important;
  height: 20px !important;
  background: rgba(255, 255, 255, 0.12) !important;
  margin: 0 4px !important;
}

.toolbar-spacer {
  flex: 1 !important;
}

.toolbar-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px !important;
  min-width: 28px !important;
  height: 28px !important;
  padding: 0 8px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 6px !important;
  color: #dfdbed !important;
  font-size: 11px !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  white-space: nowrap !important;
}

.toolbar-btn:hover {
  background: rgba(168, 85, 247, 0.22) !important;
  border-color: rgba(168, 85, 247, 0.45) !important;
  color: #ffffff !important;
}

.toolbar-btn.highlight-btn {
  background: rgba(138, 80, 245, 0.18) !important;
  border-color: rgba(138, 80, 245, 0.35) !important;
  color: #d1b8ff !important;
}

.toolbar-template-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 5px 12px !important;
  background: rgba(168, 85, 247, 0.16) !important;
  border: 1px dashed rgba(168, 85, 247, 0.4) !important;
  border-radius: 6px !important;
  color: #cfb9ff !important;
  font-size: 10.5px !important;
  font-family: var(--mono) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}

.toolbar-template-btn:hover {
  background: rgba(168, 85, 247, 0.28) !important;
  border-color: #a855f7 !important;
  color: #ffffff !important;
}

/* Textarea Canvas */
.writing-canvas-container {
  flex: 1 !important;
  padding: 16px 24px !important;
  overflow-y: auto !important;
}

.writing-canvas-textarea {
  width: 100% !important;
  height: 100% !important;
  min-height: 280px !important;
  box-sizing: border-box !important;
  background: transparent !important;
  border: none !important;
  color: #f0edf8 !important;
  font-size: 14px !important;
  line-height: 1.85 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  outline: none !important;
  resize: none !important;
}

.writing-canvas-textarea::placeholder {
  color: rgba(160, 155, 185, 0.4) !important;
}

.writing-canvas-footer {
  padding: 10px 24px !important;
  background: rgba(10, 7, 18, 0.6) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
  font-size: 11px !important;
  color: #9d99b2 !important;
  flex-shrink: 0 !important;
}

.writing-canvas-footer code {
  background: rgba(255, 255, 255, 0.08) !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  color: #c9b4ff !important;
}

/* Live Preview Mode */
.blog-preview-pane {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 32px 48px !important;
  background: #0d0a17 !important;
}

@media (max-width: 768px) {
  .blog-preview-pane {
    padding: 20px 16px !important;
  }
}

.blog-preview-reader {
  max-width: 740px !important;
  margin: 0 auto !important;
}

.blog-preview-cover-wrapper {
  position: relative !important;
  width: 100% !important;
  max-height: 340px !important;
  overflow: hidden !important;
  border-radius: 14px !important;
  border: 1px solid rgba(195, 155, 255, 0.22) !important;
  margin-bottom: 28px !important;
}

.blog-preview-cover-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

.blog-preview-cover-overlay {
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(180deg, transparent 60%, rgba(13, 10, 23, 0.75) 100%) !important;
}

.blog-preview-badges {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  margin-bottom: 14px !important;
  flex-wrap: wrap !important;
}

.blog-badge-category {
  display: inline-block !important;
  padding: 3px 10px !important;
  background: rgba(138, 80, 245, 0.18) !important;
  border: 1px solid rgba(168, 85, 247, 0.35) !important;
  border-radius: 100px !important;
  font-family: var(--mono) !important;
  font-size: 10px !important;
  letter-spacing: 0.08em !important;
  color: #cb9eff !important;
  font-weight: 600 !important;
}

.blog-badge-meta,
.blog-badge-read {
  font-family: var(--mono) !important;
  font-size: 10.5px !important;
  color: #9d99b2 !important;
}

.blog-preview-title {
  font-size: clamp(26px, 3.4vw, 36px) !important;
  line-height: 1.18 !important;
  letter-spacing: -0.04em !important;
  color: #ffffff !important;
  margin: 0 0 16px !important;
}

.blog-preview-lead {
  font-size: 15px !important;
  line-height: 1.7 !important;
  color: #c7c4d8 !important;
  border-left: 3px solid #8a50f5 !important;
  padding-left: 16px !important;
  margin: 0 0 28px !important;
}

.blog-preview-divider {
  width: 100% !important;
  height: 1px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  margin-bottom: 28px !important;
}

.blog-preview-body {
  font-size: 14.5px !important;
  line-height: 1.85 !important;
  color: #e2dfed !important;
}

.blog-preview-paragraph {
  margin-bottom: 18px !important;
}

.blog-preview-h2 {
  font-size: 22px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
  color: #ffffff !important;
  margin: 32px 0 14px !important;
  padding-bottom: 6px !important;
  border-bottom: 1px solid rgba(195, 155, 255, 0.15) !important;
}

.blog-preview-h3 {
  font-size: 17px !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em !important;
  color: #dedaf0 !important;
  margin: 24px 0 10px !important;
}

.blog-preview-hr {
  border: none !important;
  border-top: 1px solid rgba(180, 140, 255, 0.2) !important;
  margin: 32px 0 !important;
}

.blog-callout-box {
  background: linear-gradient(135deg, rgba(138, 80, 245, 0.12), rgba(99, 44, 214, 0.06)) !important;
  border: 1px solid rgba(168, 85, 247, 0.35) !important;
  border-radius: 12px !important;
  padding: 18px 20px !important;
  margin: 24px 0 !important;
  box-shadow: 0 0 25px rgba(138, 80, 245, 0.1) !important;
}

.blog-callout-head {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 8px !important;
  color: #caa0ff !important;
  font-family: var(--mono) !important;
  font-size: 11px !important;
  letter-spacing: 0.08em !important;
}

.blog-callout-icon {
  color: #a855f7 !important;
}

.blog-callout-box p {
  margin: 0 !important;
  font-size: 13.5px !important;
  line-height: 1.7 !important;
  color: #efeef6 !important;
}

.blog-preview-quote {
  position: relative !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border-left: 3px solid #b789ff !important;
  padding: 16px 20px 16px 44px !important;
  margin: 22px 0 !important;
  border-radius: 0 10px 10px 0 !important;
  font-style: italic !important;
}

.blog-quote-icon {
  position: absolute !important;
  left: 14px !important;
  top: 16px !important;
  color: #8a50f5 !important;
  opacity: 0.6 !important;
}

.blog-preview-quote p {
  margin: 0 !important;
  font-size: 14px !important;
  color: #dedaf0 !important;
}

.blog-preview-bullet-list,
.blog-preview-number-list {
  padding-left: 24px !important;
  margin: 16px 0 20px !important;
}

.blog-preview-bullet-list li,
.blog-preview-number-list li {
  margin-bottom: 8px !important;
  line-height: 1.7 !important;
  color: #dfdbed !important;
}

.blog-preview-code {
  background: #080511 !important;
  border: 1px solid rgba(195, 155, 255, 0.2) !important;
  border-radius: 10px !important;
  margin: 20px 0 !important;
  overflow: hidden !important;
}

.blog-preview-code-header {
  padding: 6px 14px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  font-family: var(--mono) !important;
  font-size: 10px !important;
  color: #9d99b2 !important;
}

.blog-preview-code pre {
  margin: 0 !important;
  padding: 14px 18px !important;
  font-family: var(--mono) !important;
  font-size: 12.5px !important;
  color: #b789ff !important;
  line-height: 1.6 !important;
  overflow-x: auto !important;
}




`;

const combined = refCSS + '\n' + scrollyAndInteractionCSS;
fs.writeFileSync('src/index.css', combined);
console.log('Successfully wrote combined CSS to src/index.css. Total size:', combined.length);
