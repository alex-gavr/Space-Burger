import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = (props) => {
    return ( 
        <div className={styles.background} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

