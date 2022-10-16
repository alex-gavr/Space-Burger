import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ children, onClose }) => {
    return (
        <div className={styles.background} onClick={onClose}>
            {children}
        </div>
    );
};
ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};
