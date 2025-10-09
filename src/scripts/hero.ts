// hooks/useHeroAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useHeroAnimation = () => {
  const imageRef = useRef<HTMLImageElement>(null);
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

    // Анимация картинки
    if (imageRef.current) {
      tl.to(imageRef.current, {
        keyframes: [
          { x: 0, y: 0, rotation: 0, ease: "sine.out" },
          { x: -40, y: -60, rotation: 45, ease: "sine.inOut" },
          { x: -80, y: -30, rotation: 90, ease: "sine.inOut" },
          { x: -120, y: -90, rotation: 135, ease: "sine.inOut" }
        ],
        duration: 4,
        repeat: -1,
        yoyo: true
      }, "-=0.8");
    }

    return () => {
      tl.kill(); // Очистка анимации при размонтировании
    };
  }, []);

  return { imageRef, textRef, titleRef };
};