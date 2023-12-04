import { Modal, Button, Form, Spinner, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./formPost.css"
import { GetDateTime } from "../utils/transformers";



export default function RepostModal(props) {
    const [caption, setCaption] = useState();
    const [schedule, setSchedule] = useState(null)
    const [sendClip, setsendClip] = useState()
    
    const [isLoading, setIsLoading] = useState(false)
    const [concluded, setConcluded] = useState(false)
    const [postNow, setPostNow] = useState(false)
    const [concludedWithError, setConcludedWithError] = useState(false)

    const titleChange = event => {
        setCaption(event.target.value);
    }

    const scheduleChange = event => {
        setSchedule(event.target.value);
    }

    useEffect(() => {
        if (sendClip === true) {
            if (props.kraken_hand === 'INSTAGRAM') {
                const payload_instagram = {
                    id: props.clipData.id,
                    url: props.clipData.url,
                    caption: caption || props.clipData.caption,
                    clip_id: props.clipData.clip_id,
                    clip_name: props.clipData.clip_name,
                    kraken_head: props.clipData.kraken_head,
                    schedule: schedule
                }

                axiosInstance.post(Endpoints.kraken.postClipInstagram(), payload_instagram)
                    .then(() => {
                        setConcluded(true)
                        setIsLoading(false)
                    }).catch(error => {
                        setConcludedWithError(true)
                        setIsLoading(false)
                    })
            }
            if (props.kraken_hand === 'TWITTER') {
                const payload_twitter = {
                    id: props.clipData.id,
                    twitter_handle: 'JoojarV',
                    caption: caption || props.clipData.caption,
                    url: props.clipData.url,
                    clip_id: props.clipData.clip_id,
                    clip_name: props.clipData.clip_name,
                    kraken_head: props.clipData.kraken_head,
                    schedule: schedule
                };

                axiosInstance.post(Endpoints.kraken.postClipTwitter(), payload_twitter)
                    .then(() => {
                        setConcluded(true)
                        setIsLoading(false)
                    }).catch(error => {
                        console.log(error)
                        setConcludedWithError(true)
                        setIsLoading(false)
                    })
            }
            if (props.kraken_hand === 'TIKTOK') {
                const payload_tiktok = {
                    id: props.clipData.id,
                    url: props.clipData.url,
                    clip_id: props.clipData.clip_id,
                    clip_name: props.clipData.clip_name,
                    kraken_head: props.clipData.kraken_head,
                    schedule: schedule
                };

                axiosInstance.post(Endpoints.kraken.postClipTiktok(), payload_tiktok)
                    .then(() => {
                        setConcluded(true)
                        setIsLoading(false)
                    }).catch(error => {
                        console.log(error)
                        setConcludedWithError(true)
                        setIsLoading(false)
                    })
            }
        }
    }, sendClip)


    function checkChange() {
        if (postNow === true) {
            setPostNow(false)
        }
        else {
            setPostNow(true)
            setSchedule(GetDateTime());
        }
    }

    function triggerClip() {
        setIsLoading(true)
        setsendClip(true)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.kraken_hand}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control required={true} type="text" placeholder="Entre com o título" onChange={titleChange} defaultValue={props.clipData?.caption} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCalendar">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Postar agora"
                            onChange={() => checkChange()}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCalendar">
                        <Form.Label>Agendar</Form.Label>
                        <Form.Control type="datetime-local" disabled={postNow} onChange={scheduleChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={triggerClip} disabled={isLoading === true ? true : false}>
                        {isLoading === true ? <Spinner
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
                        Erro ao agendar!
                    </Alert>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}
