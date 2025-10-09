import React from "react";
import type { MenuSection as MenuSectionType } from "../types";
import MenuItem from "./MenuItem";


interface MenuSectionProps {
  section: MenuSectionType;
}

const MenuSection: React.FC<MenuSectionProps> = ({ section }) => {

  return (
    <div  className="meal" id={section.id}>
      <div style={{ position: "relative" }}>
        <h1>{section.title}</h1>
        <div className="menu">
          <div className="points">
            {section.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
