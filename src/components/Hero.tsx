import React, { useEffect, useRef } from 'react';
 import { useHeroAnimation } from '../scripts/hero';
 

 

const Hero: React.FC = () => {
  const { imageRef, textRef, titleRef } = useHeroAnimation();


  return (
    <div className="main">
      <p ref ={textRef} className="textMain">Добро пожаловать в</p>
      <p ref ={titleRef}  className="dancing-script-test">Asiana kitchen</p>

      {/* <img 
      ref={imageRef}
        src="../для обрезки/Mask group.jpg" // Укажите путь к вашей картинке
        alt="Asian decoration"
        className="floating-image"
      /> */}
    </div>
  );
};

export default Hero;