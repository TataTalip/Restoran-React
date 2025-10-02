import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      <div id="contactUs">
        <h1>Контакты</h1>
      </div>

      <div className="contact">
        <div className="telGraf">
          <p><strong>Телефон:</strong> +7(900)333-44-11</p>
          <p><strong>График работы:</strong> Пн-Вс 7:30 - 11:30</p>
          <p><strong>Адрес:</strong> ул. Тельмана, 33</p>
        </div>
        <div className="adress">
          <img 
            src="https://cdn.glitch.global/d3566cfd-bd84-4909-8f8b-c888cca25575/place.jpeg.png?v=1722331224876" 
            alt="Местоположение" 
            className="imgPlace" 
          />
        </div>
      </div>
    </>
  );
};

export default Contact;