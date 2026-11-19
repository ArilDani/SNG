import React from 'react';
import Hero from '../components/Hero';
import IntroStrip from '../components/IntroStrip';
import Principles from '../components/Principles';
import Philosophy from '../components/Philosophy';
import Approach from '../components/Approach';
import ServicesPreview from '../components/ServicesPreview';
import Ecosystem from '../components/Ecosystem';
import TeamSection from '../components/TeamSection';
import ArticlesPreview from '../components/ArticlesPreview';
import ClosingCTA from '../components/ClosingCTA';

export default function HomePage() {
  return (
    <div className="app-page active" data-page="home">
      <Hero />
      <IntroStrip />
      <Principles />
      <Philosophy />
      <Approach />
      <ServicesPreview />
      <Ecosystem />
      <TeamSection />
      <ArticlesPreview />
      <ClosingCTA />
    </div>
  );
}
