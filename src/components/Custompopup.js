import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const CustomPopup = ({item, popupContent}) => {

    return ( 
        <Popup trigger={item} modal>
      {close => (
        <div  onClick={close}>
           <div onClick={e => e.stopPropagation()}>
                {popupContent}
            </div>
        </div>
      )}
    </Popup>
     );
}
 
export default CustomPopup;