import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';

const Backdrop = ({ onClick }) => {
    return <div className={classes.backdrop} onClick={onClick} />
}
const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays')

const Modal = ({ children, onClick }) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;