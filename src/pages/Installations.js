import React, { useState, useEffect } from 'react';
import installationsData from '../pages/Installations.json';
import '../styles/Systems.css';
import Installationsitem from '../components/Installationsitem';
import Addpopup from '../components/Addpopup';
import { useSelector, useDispatch } from 'react-redux';
import { setInstallations } from '../redux/actions'; 
import jsPDF from 'jspdf';
import { utils, writeFile } from 'xlsx';
const Installations = () => { 
  const dispatch = useDispatch();
  const installations = useSelector((state) => state.installations.installations);
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/installations");
      const jsonData = await response.json();
      
      dispatch(setInstallations(jsonData));
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const generateExcel = () => {
    const data = installations.map(installation => ({
      'Тип операции': installation.operation_type,
      'Адрес': installation.address,
      'Дата и время': installation.date_time,
      'Человек': installation.Person.full_name,
      'Контактные данные': installation.Person.contact_information,
      'Опыт работы': `${installation.Person.years_of_experience} лет`,
      'Тип системы': installation.system_type,
    }));
  
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Отчет');
  
    writeFile(wb, 'report.xlsx');
  };
  const [newInstallation, setNewInstallation] = useState({
    operation_type: '',
    system_type:'',
    date_time: '',
    person: {
      years_of_experience: '',
      full_name: '',
      contact_information: '',
      photo: 'https://samara.pozitive.org/images/notebooki/tseni/samara.jpg'
    },
    address: ''
  });
  const handleDeleteInstallation = async (id) => {
    if (id) {
      const responseInt = await fetch(
        `http://localhost:5000/installations/${id}`,
        {
          method: "GET",
        }
      );
      const deletedInstallation = await responseInt.json();
      const personId = deletedInstallation.PersonId;
  
      const response = await fetch(
        `http://localhost:5000/installations/${id}`,
        {
          method: "DELETE",
        }
      );
      const responsePerson = await fetch(
        `http://localhost:5000/persons/${personId}`,
        {
          method: "DELETE",
        }
      );
      
      dispatch({ type: "DELETE_INSTALLATIONS", payload: id });
    }
    
    const updatedInstallations = installations.filter(installation => installation.id !== id);
    dispatch(setInstallations(updatedInstallations));
  };


const generatePDF = () => {
  const pdf = new jsPDF();

  installations.forEach((installation, index) => {
    const y = index * 60 + 10;
    console.log(installation);
    pdf.setFont('times');
    pdf.setFontSize(12); 
    pdf.text(20, y + 10, `Type of operation: ${installation.operation_type}`);
    pdf.text(20, y + 20, `Address: ${installation.address}`);
    pdf.text(20, y + 30, `Date and time: ${installation.date_time}`);
    pdf.text(20, y + 40, `Person: ${installation.Person.full_name}`);
    pdf.text(20, y + 50, `Contact information: ${installation.Person.contact_information}`);
    pdf.text(20, y + 60, `Work experience: ${installation.Person.years_of_experience} years`);
    pdf.text(20, y + 60, `Work experience: ${installation.Person.years_of_experience} years`);
  });

  pdf.save('report.pdf');
};
  
  const handleEditInstallation = async (editedInstallation) => {
    const updatedInstallations = installations.map(installation => {
      if (installation.id === editedInstallation.id) {
        return editedInstallation;
      }

      return installation;
    });
    const responsePerson = await fetch(
      `http://localhost:5000/persons/${editedInstallation.PersonId}`,
      {
        method: "PUT",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  PersonId:editedInstallation.Person }),
      }
    )
    const response = await fetch(
      `http://localhost:5000/installations/${editedInstallation.id}`,
      {
        method: "PUT",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editedInstallation }),
      }
    )
    dispatch(setInstallations(updatedInstallations));

    
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('person.')) {
      const personProperty = name.split('.')[1];
      setNewInstallation((prevState) => ({
        ...prevState,
        person: {
          ...prevState.person,
          [personProperty]: value
        }
      }));
    } else {
      setNewInstallation({
        ...newInstallation,
        [name]: value
      });
    }
  };

  const handleAddInstallation = async () => {
    const responsePerson = await fetch("http://127.0.0.1:5000/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInstallation.person),
    });
    const personId = (await responsePerson.json()).id;
    const response = await fetch("http://127.0.0.1:5000/installations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newInstallation,PersonId:personId}),
      
    });
   
    setInstallations([...installations, newInstallation]);
    setNewInstallation({
      operation_type: '',
      system_type: '',
      date_time: '',
      person: {
        years_of_experience: '',
        full_name: '',
        contact_information: '',
        photo: 'https://samara.pozitive.org/images/notebooki/tseni/samara.jpg'
      },
      address: ''
    });
  
  };

  return (
    <>
      <div className="systemPage-container">
        {installations.map((installation) => (
          <Installationsitem
            key={installation.id}
            installation={installation}
            onDelete={handleDeleteInstallation} 
            onEdit = {handleEditInstallation}
          />
        ))}
      </div>
      <button className = "add-btn" onClick={generateExcel}>Сгенерировать Excel</button>
      <button className = "add-btn" onClick={generatePDF}>Сгенерировать PDF</button>
        <Addpopup
          newInstallation={newInstallation}
          handleInputChange={handleInputChange}
          handleAddInstallation={handleAddInstallation}
        />
        
    </>
  );
};

export default Installations;
