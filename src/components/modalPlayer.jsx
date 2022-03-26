import { Modal, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'
import "./modalPlayer.css"

export default function CustomModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.head}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <ReactPlayer url={props.url} controls={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}
