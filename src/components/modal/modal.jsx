import React, {useEffect} from 'react';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const Modal = (props) => {

    // CLOSE IF ESCAPE KEY PRESSED

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? props.onClick() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    },[]);


    return createPortal( 
        <ModalOverlay onClick={props.onClick}>
            <div className={styles.container} onClick={e =>{e.stopPropagation()}} >
                <div className={styles.rowBetween}>
                    <h1>{props.heading}</h1>
                    <div onClick={props.onClick} className={styles.iconContainer}>
                        <CloseIcon />
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>,
        document.getElementById('react-modals')
    );
}

export default Modal;