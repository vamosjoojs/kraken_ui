import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";



export default function PostModal(props) {
    const [caption, setCaption] = useState();
    const [sendClip, setsendClip] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [concluded, setConcluded] = useState(false)
    const [concludedWithError, setConcludedWithError] = useState(false)

    const titleChange = event => {
        setCaption(event.target.value);
    }

    useEffect(() => {
        if (sendClip === true) {
            setIsLoading(true)
            const payload = {
                caption: caption,
                thumbnail: props.thumbnail,
                clip_id: props.clip_id,
                clip_name: props.clip_name
            };
            axiosInstance.post(Endpoints.twitch.postClip(), payload)
                .then(() => {
                    setIsLoading(false)
                    setConcluded(true)
                }).catch(error => {
                    setConcludedWithError(true)
                    setIsLoading(false)
                 })
        }
    }, sendClip)

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
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control required={true} type="text" placeholder="Entre com o título" onChange={titleChange} />
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={() => setsendClip(true)} disabled={isLoading == true ? true : false}>
                        {isLoading == true ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Criar postagem'}
                        <span className="visually-hidden">Carregando...</span>
                    </Button>{' '}
                    <p></p>
                    <Alert show={concluded} variant="success">
                        Processo agendado com sucesso!
                    </Alert>
                    <Alert show={concludedWithError} variant="danger">
                        Video já está no instagram!
                    </Alert>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}
