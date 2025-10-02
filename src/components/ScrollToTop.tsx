import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNavigation = () => {
    const navigationElement = document.querySelector('.menuMain');
    if (navigationElement) {
      navigationElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <button 
      className={`btn-up ${isVisible ? '' : 'btn-up_hide'}`}
      onClick={scrollToNavigation}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 16px',
        backgroundColor: '#d4685e',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;