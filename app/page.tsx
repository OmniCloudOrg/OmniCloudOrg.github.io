import React from 'react';
import {
  Shield,
  Server,
  Users,
  Hand
} from 'lucide-react';
import CallToAction from '@/components/blocks/cta';
import Workflow from '@/components/blocks/workflow';
import StatsSection from '@/components/blocks/stats';
import Features from '@/components/blocks/features';
import Hero from '@/components/blocks/hero';
import TechOverview from '@/components/blocks/tech';
import HandsFree from '@/components/blocks/handsfree';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">

      <Hero />

      <Features />
      <Workflow />
      <TechOverview />
      <HandsFree />
      <CallToAction />
    </div>
  );
}