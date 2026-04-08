"use client";
import dynamic from 'next/dynamic';

const RoadmapDashboard = dynamic(() => import('@/components/RoadmapDashboard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <RoadmapDashboard />
    </main>
  );
}
