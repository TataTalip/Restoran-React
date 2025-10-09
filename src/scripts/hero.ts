// hooks/useHeroAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useHeroAnimation = () => {
 
  const textRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Анимация текста
    if (textRef.current && titleRef.current) {
      tl.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "-=0.5"
      );
    }

   

    return () => {
      tl.kill(); // Очистка анимации при размонтировании
    };
  }, []);

  return { textRef, titleRef };
};