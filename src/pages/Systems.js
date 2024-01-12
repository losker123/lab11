import React, { useState, useEffect } from 'react';
import '../styles/Systems.css'; 
import systemssData from './Systems.json'
import { useSelector, useDispatch } from 'react-redux';
import { setSystems } from '../redux/actions'; 
import SystemItem from '../components/Systemitem'
const Systems = () => {
  
  const dispatch = useDispatch();
  
  const systems = useSelector((state) => state.systems.systems);
  
  useEffect(() => {
    
    dispatch(setSystems(systemssData));
  }, [dispatch]);
  return (
    <>
    <div className="systemPage-container">
        {systems.map(system => (
            <SystemItem key={system.id} system={system}/>
        ))}
    </div>
    
</>

  );
}

export default Systems;
