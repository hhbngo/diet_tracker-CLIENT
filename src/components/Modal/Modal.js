import React, { useEffect } from 'react';
import clasess from './Modal.module.css';

const Modal = ({show, onClose, children}) => {

    useEffect(() => {
        show 
        ? document.body.style.overflow = 'hidden'  
        : document.body.style.overflow = null;
        return () => document.body.style.overflow = null;
    }, [show])

    return <div className={`${clasess.backdrop} ${show ? clasess.show : ''}`}>
        <div className={clasess.clickBox} onClick={onClose}></div>
        {children}
    </div>
};

export default Modal;