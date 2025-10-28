 
 import { useHeroAnimation } from '../scripts/hero';
 

 

const Hero: React.FC = () => {
  const {  textRef, titleRef } = useHeroAnimation();


  return (
    <div className="main">
      <div>
        <p ref ={textRef} className="textMain">Погрузитесь в мир восточной гармонии</p>
      <p ref ={titleRef}  className="dancing-script-test">Asiana kitchen</p>
       <p ref ={titleRef}  className="desc-script-test">Где каждое блюдо - это искусство, а каждый прием пищи - церемония</p>
      </div>
      <div className="main_dop">
        <img className="main_img" src='/свет-тень.png' alt="Свет и тень" />
        {/* <img className="main_img" src='../public/mainImg2-Photoroom.png'></img> */}
      </div>
      
       
    </div>
  );
};

export default Hero;