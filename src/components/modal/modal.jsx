import React, { useEffect } from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector } from "react-redux";
import { onCloseModal } from "../../services/modal-slice";
import { deleteDetails } from "../../services/ingredient-details-slice";
import { useNavigate } from "react-router-dom";


const Modal = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isModalOpen, title} = useSelector((state) => state.modal);

    const closeModal = () => {
        dispatch(onCloseModal());
        dispatch(deleteDetails());
        navigate('/');
    }

    // CLOSE IF ESCAPE KEY PRESSED

    useEffect(() => {
        const closeOnEscapeKey = (e) => (e.key === "Escape" ? closeModal() : null);

        if (isModalOpen) {
            document.body.addEventListener("keydown", closeOnEscapeKey);
            return () => {
                document.body.removeEventListener("keydown", closeOnEscapeKey);
            };
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return createPortal(
        <ModalOverlay>
            <div
                className={styles.container}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.rowBetween}>
                    <h1>{title}</h1>
                    <div onClick={() => closeModal()} className={styles.iconContainer}>
                        <CloseIcon />
                    </div>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        document.getElementById("react-modals")
    );
};

export default Modal;

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired
}