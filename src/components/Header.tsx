import React from 'react';
import type { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ onReservationClick }) => {
  const handleReservationClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    onReservationClick();
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const contactSection = document.getElementById('contactUs');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
        Logo
      </a>
      <nav>
        <ul>
          <li>
            <a 
              className="link" 
              onClick={handleReservationClick}
              style={{ cursor: 'pointer' }}
            >
              Забронировать
            </a>
          </li>
          <li>
            <a 
              className="link" 
              href="#contactUs"
              onClick={handleContactClick}
            >
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;