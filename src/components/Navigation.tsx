import React from 'react';


interface NavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'breakfast', name: 'Завтрак', description: 'Для бодрого начала дня' ,image:'https://ld-wp73.template-help.com/wordpress/prod_1661/v1/wp-content/uploads/2021/02/image45.jpg', },
    { id: 'lunch', name: 'Обед', description: 'Сытное продолжение дня' ,  image:'https://ld-wp73.template-help.com/wordpress/prod_1661/v1/wp-content/uploads/2021/02/image92-1.jpg',},
    { id: 'dinner', name: 'Ужин', description: 'Легкий ужин' ,     image:'https://cdn.glitch.global/d3566cfd-bd84-4909-8f8b-c888cca25575/br2.jpg?v=1722331219776',},
    { id: 'dessert', name: 'Десерты', description: 'Порадовать себя',image:'https://ld-wp73.template-help.com/wordpress/prod_1661/v1/wp-content/uploads/2021/02/image44.jpg', },
    { id: 'drinks', name: 'Напитки', description: 'Запить чем-нибудь вкусным' ,  image:'https://ld-wp73.template-help.com/wordpress/prod_1661/v1/wp-content/uploads/2021/02/image46.jpg',}
  ];

  return (
    <div className="menuMain">
      {categories.map((category) => (
        <a 
        href={`#${category.id}`}
          key={category.id}
          className={`item ${activeCategory === category.id ? 'selected' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          
        >
      
          <div className="">
            <p>{category.name}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Navigation;