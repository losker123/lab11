import '../styles/Systemitem.css'; 
import React, { useState } from "react";
import Custompopup from '../components/Custompopup'

const SystemItem = ({system}) => {
    return ( 
        <>
            <div className="systemtem-container">
                <h3 className='systemItem_container-title'>{system.name}</h3>
                <Custompopup 
                    item ={<button className='popup-btn'>Информация</button>}
                    popupContent={<div style={{padding:'2rem 4rem'}}>
                    <img src={system.photo} alt={system.name} className="system-image" />
                    <p ><strong>Цена установки:</strong> {system.installation_price}р</p>
                    <p ><strong>Цена обслуживания:</strong> {system.maintenance_price}р</p>
                    <p>{system.description}</p>
                </div>}
                    />
                
            </div>
        </>
     );
}
 
export default SystemItem;

