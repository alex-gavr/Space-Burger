import React, { useEffect, ReactNode, FC, KeyboardEvent } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { useAppSelector } from '../../services/hook';

interface Props {
    children: ReactNode;
    onClose: () => void;
}

const Modal:FC<Props> = ({ children, onClose }): JSX.Element | null => {
    const { isModalOpen, title } = useAppSelector((state) => state.modal);

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
