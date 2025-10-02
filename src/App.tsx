import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import MenuSection from './components/MenuSection';
import Contact from './components/Contact';
import ReservationModal from './components/ReservationModal';
import ScrollToTop from './components/ScrollToTop'; // Добавьте этот импорт
import { menuData } from './data/menuDB';
import './App.css';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('breakfast');

  const handleReservationClick = (): void => {
    setShowModal(true);
  };

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
  };

  return (
    <div className="App">
      <Header onReservationClick={handleReservationClick} />
      <Hero />
      
      <div className="container">
        <Navigation 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {menuData.map(section => (
          <MenuSection key={section.id} section={section} />
        ))}
        <ScrollToTop /> {/* Добавьте компонент кнопки */}
      </div>
      
      <Contact />
      <ReservationModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
      />
      
    </div>
  );
};

export default App;