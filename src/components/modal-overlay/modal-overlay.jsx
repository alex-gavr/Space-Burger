import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { onCloseModal } from '../../services/modal-slice';
import { deleteDetails } from "../../services/ingredient-details-slice";
import { useNavigate } from 'react-router-dom';

export const ModalOverlay = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModal = () => {
        dispatch(onCloseModal());
        dispatch(deleteDetails());
        navigate('/');
    }

    return ( 
        <div className={styles.background} onClick={() => closeModal()}>
            {props.children}
        </div>
    )
}
ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired
}

