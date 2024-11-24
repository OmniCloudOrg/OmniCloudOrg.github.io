import React from 'react';
import {
  Shield,
  Server,
  Users,
  Hand
} from 'lucide-react';

import CallToAction from '@/components/blocks/cta';
import Workflow from '@/components/blocks/workflow';
import Features from '@/components/blocks/features';
import Hero from '@/components/blocks/hero';
import TechOverview from '@/components/blocks/tech';
import HandsFree from '@/components/blocks/handsfree';
import Stack from '@/components/blocks/stack';
import Ghstats from '@/components/blocks/ghstats';

export default function LandingPage() {
  return (
    <div style={{ marginTop: '-66px' }}>
      <Hero />

      <Features />
      <TechOverview />
      <Ghstats />
      <Workflow />
      <HandsFree />
      <Stack />
      <CallToAction />
    </div>
  );
}