import React, {useEffect} from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const Modal = ({isOpened, onClose, title, children}) => {

    // CLOSE IF ESCAPE KEY PRESSED

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? onClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    },[]);

    if (!isOpened) return null;

    return createPortal( 
        <ModalOverlay onClick={onClose}>
            <div className={styles.container} onClick={e =>{e.stopPropagation()}} >
                <div className={styles.rowBetween}>
                    <h1>{title}</h1>
                    <div onClick={onClose} className={styles.iconContainer}>
                        <CloseIcon />
                    </div>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        document.getElementById('react-modals')
    );
}
Modal.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Modal;