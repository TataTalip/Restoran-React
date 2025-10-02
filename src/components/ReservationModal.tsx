import React, { useState, useEffect } from 'react';
import type { ReservationModalProps, ReservationFormData } from '../types';

const ReservationModal: React.FC<ReservationModalProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    telefone: '',
    date: '',
    time: '12:00 - 13:45',
    countG: '',
    message: ''
  });

  const [telefoneMask, setTelefoneMask] = useState('');

  // Маска для телефона
  const applyPhoneMask = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    let formattedValue = '+7 ';
    
    if (numbers.length > 0) {
      formattedValue += '(' + numbers.substring(1, 4);
    }
    if (numbers.length >= 4) {
      formattedValue += ') ' + numbers.substring(4, 7);
    }
    if (numbers.length >= 7) {
      formattedValue += '-' + numbers.substring(7, 9);
    }
    if (numbers.length >= 9) {
      formattedValue += '-' + numbers.substring(9, 11);
    }
    
    return formattedValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      // Применяем маску для телефона
      const maskedValue = applyPhoneMask(value);
      setTelefoneMask(maskedValue);
      
      // Сохраняем только цифры в formData
      const numbersOnly = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Валидация имени
  const isValidName = (name: string): boolean => {
    const pattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    return pattern.test(name);
  };

  // Валидация телефона
  const isValidPhone = (phone: string): boolean => {
    return phone.replace(/\D/g, '').length === 11;
  };

  // Валидация даты
  const isValidDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  // Валидация количества гостей
  const isValidGuests = (guests: string): boolean => {
    const count = parseInt(guests);
    return count >= 1 && count <= 10;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name || !formData.telefone || !formData.date || !formData.countG) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!isValidName(formData.name)) {
      alert('Имя может содержать только русские и латинские буквы');
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      alert('Телефон введен некорректно');
      return;
    }

    if (!isValidDate(formData.date)) {
      alert('Нельзя выбрать прошедшую дату');
      return;
    }

    if (!isValidGuests(formData.countG)) {
      alert('Количество гостей должно быть от 1 до 10 человек');
      return;
    }

    // Если все валидно - отправляем
    console.log('Form submitted:', formData);
    
    // Показываем успешное сообщение
    alert(`Уважаемый(ая) ${formData.name},
Вы забронировали стол на ${formData.date} ${formData.time}, количество гостей ${formData.countG}.
С Вами свяжется оператор для уточнения информации.`);

    onHide();
  };

  const handleClear = (): void => {
    setFormData({
      name: '',
      telefone: '',
      date: '',
      time: '12:00 - 13:45',
      countG: '',
      message: ''
    });
    setTelefoneMask('');
  };

  // Очищаем форму при закрытии модального окна
  useEffect(() => {
    if (!show) {
      handleClear();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Бронирование стола</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="form">
              <div className="name_tel">
                <div className="form-group">
                  <label htmlFor="name">Имя:* </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    pattern="[A-Za-zА-Яа-яЁё\s-]+"
                    title="Имя может содержать только буквы и пробелы"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Телефон:* </label>
                  <input 
                    type="tel" 
                    name="telefone" 
                    id="telefone" 
                    placeholder="+7 (000) 111-22-33"
                    value={telefoneMask}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Дата:* </label>
                <input 
                  type="date" 
                  name="date" 
                  id="date" 
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Время:* </label>
                <select 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="12:00 - 13:45">12:00 - 13:45</option>
                  <option value="14:00 - 15:45">14:00 - 15:45</option>
                  <option value="16:00 - 17:45">16:00 - 17:45</option>
                  <option value="18:00 - 19:45">18:00 - 19:45</option>
                  <option value="20:00 - 21:45">20:00 - 21:45</option>
                  <option value="22:00 - 23:45">22:00 - 23:45</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="countG">Количество гостей:* (максимум 10)</label>
                <input 
                  type="number" 
                  name="countG" 
                  id="countG" 
                  min="1" 
                  max="10"
                  value={formData.countG}
                  onChange={handleChange}
                  placeholder="Введите количество гостей"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Сообщение: </label>
                <textarea 
                  cols={40} 
                  rows={5} 
                  name="message" 
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Комментарий"
                />
              </div>
              
              <label style={{fontSize: '12px'}}>* Звездочкой отмечены обязательные поля</label>
              
              <div className="form-group">
                <div className="btnForm">
                  <button type="submit" className="reservation_btn">ЗАБРОНИРОВАТЬ</button>
                  <button type="button" className="clear_btn" onClick={handleClear}>ОЧИСТИТЬ</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;