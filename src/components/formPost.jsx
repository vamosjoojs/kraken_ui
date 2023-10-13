import { Modal, Button, Form, Spinner, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./formPost.css"
import { GetDateTime } from "../utils/transformers";



export default function PostModal(props) {
    const [caption, setCaption] = useState();
    const [schedule, setSchedule] = useState(null);
    const [sendClip, setsendClip] = useState();
    const [twitter, setTwitter] = useState(false);
    const [instagram, setInstagram] = useState(false);
    const [tiktok, setTiktok] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [concluded, setConcluded] = useState(false)
    const [concludedWithError, setConcludedWithError] = useState(false)

    let isPostedInstagram = false
    let isPostedTiktok = false
    let isPostedTwitter = false

    for (var idx in props.isPosted) {
        if (props.isPosted[idx].kraken_hand == 'TWITTER') {
            isPostedTwitter = props.isPosted[idx].is_posted
        }
    }

    for (var idx in props.isPosted) {
        if (props.isPosted[idx].kraken_hand == 'INSTAGRAM') {
            isPostedInstagram = props.isPosted[idx].is_posted
        }
    }

    for (var idx in props.isPosted) {
        if (props.isPosted[idx].kraken_hand == 'TIKTOK') {
            isPostedTiktok = props.isPosted[idx].is_posted
        }
    }

    const style = {
        background: '#C13584',
        border: '0px',
        margin: '3px'
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Clip já postado nessa plataforma
        </Tooltip>
    );



    const [postNow, setPostNow] = useState(false)

    const titleChange = event => {
        setCaption(event.target.value);
    }

    const scheduleChange = event => {
        setSchedule(event.target.value);
    }


    useEffect(() => {
        if (sendClip === true) {
            if (instagram === true) {
                const payload_instagram = {
                    id: props.id,
                    url: props.url,
                    caption: caption,
                    clip_id: props.clip_id,
                    clip_name: props.clip_name,
                    kraken_head: props.kraken_head,
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
            if (twitter === true) {
                const payload_twitter = {
                    id: props.id,
                    twitter_handle: 'JoojarV',
                    caption: caption,
                    url: props.url,
                    clip_id: props.clip_id,
                    clip_name: props.clip_name,
                    kraken_head: props.kraken_head,
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
            if (tiktok === true) {
                const payload_tiktok = {
                    id: props.id,
                    url: props.url,
                    clip_id: props.clip_id,
                    clip_name: props.clip_name,
                    kraken_head: props.kraken_head,
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
                    {props.head}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control required={true} type="text" placeholder="Entre com o título" onChange={titleChange} />
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
                    <div className="social-checks">
                        {isPostedTwitter === true ? <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span className="d-inline-block">
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Twitter" onChange={() => { setTwitter(true) }} disabled />
                                </Form.Group>
                            </span>
                        </OverlayTrigger> : <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Twitter" onChange={() => { setTwitter(true) }} />
                        </Form.Group>}

                        {isPostedInstagram === true ? <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span className="d-inline-block">
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Instagram" onChange={() => { setInstagram(true) }} disabled />
                                </Form.Group>
                            </span>
                        </OverlayTrigger> : <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Instagram" onChange={() => { setInstagram(true) }} />
                        </Form.Group>}

                        {isPostedTiktok === true ? <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <span className="d-inline-block">
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Tiktok" onChange={() => { setTiktok(true) }} disabled />
                                </Form.Group>
                            </span>
                        </OverlayTrigger> : <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Tiktok (o clip ficará disponível no aplicativo no horário agendado para edição e postagem)" onChange={() => { setTiktok(true) }} />
                        </Form.Group>}
                    </div>
                    <Button variant="primary" onClick={triggerClip} disabled={isLoading == true ? true : false}>
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
