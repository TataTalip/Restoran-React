// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "power2.out"
          });
          observer.unobserve(element);
        };

      },
      
      { threshold: 0.1 }
    );
    

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return ref;
};