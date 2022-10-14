import React, { useEffect } from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ children, onClose }) => {
    const { isModalOpen, title } = useSelector((state) => state.modal);
    // CLOSE IF ESCAPE KEY PRESSED

    useEffect(() => {
        const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);

        if (isModalOpen) {
            document.body.addEventListener("keydown", closeOnEscapeKey);
            return () => {
                document.body.removeEventListener("keydown", closeOnEscapeKey);
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
                }}
            >
                <div className={styles.rowBetween}>
                    <h1>{title}</h1>
                    <div onClick={onClose} className={styles.iconContainer}>
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
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};
