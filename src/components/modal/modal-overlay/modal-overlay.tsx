import styles from './modal-overlay.module.css';
import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClose: () => void;
}

export const ModalOverlay: FC<Props> = ({ children, onClose }): JSX.Element => {
    return (
        <div className={styles.background} onClick={onClose}>
            {children}
        </div>
    );
};
