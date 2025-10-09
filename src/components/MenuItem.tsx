import React, { useState } from 'react';
import type { MenuItem as MenuItemType } from '../types';
import { useScrollAnimation } from '../scripts/menuItem';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [showNutrition, setShowNutrition] = useState<boolean>(false);
    const itemRef = useScrollAnimation();

  return (
    <div  ref={itemRef} className="point" style={{ opacity: 0, transform: 'translateY(30px)' }}>
      <div>
        <img  className="imgMenu" src={item.image} alt={item.name} />
      </div>
      <div  className="tMenu">
        <div  className="nazvanie">
          <p>{item.name}</p>
          <div className="line">
            <div  className="logoInfo">
              <p 
                className="btnInfo" 
                onMouseEnter={() => setShowNutrition(true)}
                onMouseLeave={() => setShowNutrition(false)}
                style={{cursor: 'pointer'}}
              >
                КБЖУ
              </p>
            </div>
            {showNutrition && (
              <div className="popup">
                <div className="descrInfo">
                  <p className="descrInfoText" style={{fontSize: '12px', fontWeight: 'normal'}}>
                    {item.nutrition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="price">
          <p>{item.price}</p>
        </div>
        <div className="description">
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;