import React from 'react';
import Hero from '@/components/blocks/hero';
import StorageArchitecture from '@/components/blocks/storage-architecture';
import PerformanceMetrics from '@/components/blocks/performance-metrics';
import StorageFeatures from '@/components/blocks/storage-features';
import CallToAction from '@/components/blocks/cta';

export default function LandingPage() {
  return (
    <div style={{ marginTop: '-66px' }}>
      <Hero />
      <StorageArchitecture />
      <PerformanceMetrics />
      <StorageFeatures />
      <CallToAction />
    </div>
  );
}