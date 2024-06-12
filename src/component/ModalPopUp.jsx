import React from 'react';
import { Modal } from 'react-bootstrap';


const ModalPopUp = ({ show, handleClose,loginFunction }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Join MyBlog</Modal.Title>
                </Modal.Header>
                <Modal.Body>{loginFunction && loginFunction()}</Modal.Body>
                {/* <Modal.Body><SignUp></SignUp></Modal.Body> */}
                <Modal.Footer>
                    <Modal.Body>
                        <p>Forgot email or trouble signing in? Get help.</p>
                        <p>Click “Sign in” to agree to MyBlog's Terms of Service and acknowledge that MyBlog's Privacy Policy applies to you.</p>
                    </Modal.Body>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalPopUp