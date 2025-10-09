 
 import { useHeroAnimation } from '../scripts/hero';
 

 

const Hero: React.FC = () => {
  const {  textRef, titleRef } = useHeroAnimation();


  return (
    <div className="main">
      <p ref ={textRef} className="textMain">Добро пожаловать в</p>
      <p ref ={titleRef}  className="dancing-script-test">Asiana kitchen</p>

       
    </div>
  );
};

export default Hero;