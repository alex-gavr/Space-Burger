import styles from './modal-overlay.module.css'

export const ModalOverlay = (props) => {
    return ( 
        <div className={styles.background} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

