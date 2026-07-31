"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { normalizeRadians } from "@/lib/wheelMath";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useWheelAnimation() {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const spinTo = useCallback(
    (targetRotation: number, duration = 5000, onComplete?: () => void) => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      const startRotation = rotationRef.current;
      const change = targetRotation - startRotation;
      const startTime = performance.now();

      if (duration <= 0) {
        const finalRotation = normalizeRadians(targetRotation);

        rotationRef.current = finalRotation;
        setRotation(finalRotation);
        animationRef.current = null;
        onComplete?.();

        return;
      }

      function animate(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = easeOutCubic(progress);

        const nextRotation = startRotation + change * eased;

        rotationRef.current = nextRotation;
        setRotation(nextRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          const finalRotation = normalizeRadians(targetRotation);

          rotationRef.current = finalRotation;
          setRotation(finalRotation);

          animationRef.current = null;

          onComplete?.();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [],
  );

  return {
    rotation,
    spinTo,
  };
}
