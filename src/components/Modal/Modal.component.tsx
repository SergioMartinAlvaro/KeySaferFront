import React from 'react';
import './Modal.scss';

const Modal = ({children, okAction, cancelAction}:any) => {
   
    return(
        <div className="confirmationModal__background">
        <div className="confirmationModal">
            <div className="confirmationModal__tag"> 
                <div className="confirmationModal__titleContainer">
                    <h2 className="confirmationModal__title">Información</h2>
                </div>
                <div className="confirmationModal__content">
                    {children}
                </div>
                <div className="confirmationModal__buttonContainer">
                <button className="confirmationModal__button okButton" onClick={okAction}>
                    Ok
                </button>
                <button className="confirmationModal__button cancelButton" onClick={cancelAction}>
                    Cancelar
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Modal;