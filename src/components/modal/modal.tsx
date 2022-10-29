import React, { useEffect, ReactNode, FC, KeyboardEvent } from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

interface Props {
    children: ReactNode;
    onClose: () => void;
}

const Modal:FC<Props> = ({ children, onClose }) => {
    const { isModalOpen, title } = useSelector((state: RootState) => state.modal);
    // CLOSE IF ESCAPE KEY PRESSED

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);

        if (isModalOpen) {
            document.body.addEventListener('keydown', closeOnEscapeKey as () => void);
            return () => {
                document.body.removeEventListener('keydown', closeOnEscapeKey as () => void);
            };
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return createPortal(
        <ModalOverlay onClose={onClose}>
            <div
                className={styles.container}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className={styles.rowBetween}>
                    <h1>{title}</h1>
                    <div onClick={onClose} className={styles.iconContainer}>
                        <CloseIcon type='primary' />
                    </div>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        document.getElementById('react-modals') as HTMLElement
    );
};

export default Modal;

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};
