import React from 'react';
import Custompopup from '../components/Custompopup';
import '../styles/Installationsitem.css'; 

const Addpopup = ({
  newInstallation,
  handleInputChange,
  handleAddInstallation,

}) => {
  return (
    <div className="Addpopup-container">
      <Custompopup
        item={<button className='add-btn'>Добавить</button>}
        popupContent={
          <div className="popup-content">
            <input
              type="text"
              name="operation_type"
              value={newInstallation.operation_type}
              onChange={handleInputChange}
              placeholder="Тип операции"
            />
            <input
              type="text"
              name="system_type"
              value={newInstallation.system_type}
              onChange={handleInputChange}
              placeholder="Тип системы"
            />
            <input
              type="text"
              name="date_time"
              value={newInstallation.date_time}
              onChange={handleInputChange}
              placeholder="Дата и время"
            />
            <input
              type="text"
              name="person.years_of_experience"
              value={newInstallation.person.years_of_experience}
              onChange={handleInputChange}
              placeholder="Опыт работы"
            />
            <input
              type="text"
              name="person.full_name"
              value={newInstallation.person.full_name}
              onChange={handleInputChange}
              placeholder="Полное имя"
            />
            <input
              type="text"
              name="person.contact_information"
              value={newInstallation.person.contact_information}
              onChange={handleInputChange}
              placeholder="Контактная информация"
            />
            <input
              type="text"
              name="address"
              value={newInstallation.address}
              onChange={handleInputChange}
              placeholder="Адрес"
            />
            <input
              type="text"
              name="person.photo"
              value={newInstallation.person.photo}
              onChange={handleInputChange}
              placeholder="Ссылка на изображение"
            />
            <button className='add-btn2' onClick={handleAddInstallation}>Добавить установку</button>

          </div>
        }
      />
    </div>
  );
};

export default Addpopup;

