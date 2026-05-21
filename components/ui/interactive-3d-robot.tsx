'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className ?? ''}`}>
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full border-t border-violet-500/50 animate-spin" />
            <div className="absolute inset-2 rounded-full border border-white/5 animate-pulse" />
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
