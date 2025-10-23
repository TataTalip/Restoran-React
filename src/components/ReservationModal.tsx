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

  // Маска для телефона - теперь вычисляемое значение
  const telefoneMask = applyPhoneMask(formData.telefone);

  // Маска для телефона
  function applyPhoneMask(value: string): string {
    const numbers = value.replace(/\D/g, '');
    
    // Если номер начинается не с 7 или 8, добавляем 7
    let cleanNumbers = numbers;
    if (cleanNumbers.length > 0 && cleanNumbers[0] === '8') {
      cleanNumbers = '7' + cleanNumbers.substring(1);
    }
    if (cleanNumbers.length > 0 && cleanNumbers[0] !== '7') {
      cleanNumbers = '7' + cleanNumbers;
    }
    
    let formattedValue = '+7 ';
    
    if (cleanNumbers.length > 1) {
      formattedValue += '(' + cleanNumbers.substring(1, 4);
    }
    if (cleanNumbers.length >= 4) {
      formattedValue += ') ' + cleanNumbers.substring(4, 7);
    }
    if (cleanNumbers.length >= 7) {
      formattedValue += '-' + cleanNumbers.substring(7, 9);
    }
    if (cleanNumbers.length >= 9) {
      formattedValue += '-' + cleanNumbers.substring(9, 11);
    }
    
    return formattedValue;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      // Убираем все нецифровые символы
      const numbersOnly = value.replace(/\D/g, '');
      
      // Ограничиваем длину (11 цифр включая 7)
      const limitedNumbers = numbersOnly.substring(0, 11);
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedNumbers
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
    return pattern.test(name.trim());
  };

  // Валидация телефона - теперь проще
  const isValidPhone = (phone: string): boolean => {
    return phone.replace(/\D/g, '').length === 11;
  };

  // Валидация даты
  const isValidDate = (date: string): boolean => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  // Валидация количества гостей
  const isValidGuests = (guests: string): boolean => {
    const count = parseInt(guests);
    return !isNaN(count) && count >= 1 && count <= 10;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name.trim() || !formData.telefone || !formData.date || !formData.countG) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!isValidName(formData.name)) {
      alert('Имя может содержать только русские и латинские буквы');
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      alert('Телефон должен содержать 11 цифр');
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
                  <small style={{fontSize: '10px', color: '#666'}}>
                    Введите 11 цифр: {formData.telefone.length}/11
                  </small>
                </div>
              </div>

              {/* Остальной код без изменений */}
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