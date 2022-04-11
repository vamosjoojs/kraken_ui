import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";



export default function PostModalTwitter(props) {
    const [caption, setCaption] = useState();
    const [sendClip, setsendClip] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [concluded, setConcluded] = useState(false)
    const [twitterHandle, setTwitterHandle] = useState('')
    const [twitterBot, setTwitterBot] = useState([])
    const [concludedWithError, setConcludedWithError] = useState(false)

    const titleChange = event => {
        setCaption(event.target.value);
    }

    const handleChange = event => {
        setTwitterHandle(event.target.value);
    }

    useEffect(() => {
        if (sendClip === true) {
            setIsLoading(true)
            const payload = {
                twitter_handle: twitterHandle,
                caption: caption,
                thumbnail: props.thumbnail,
                clip_id: props.clip_id,
                clip_name: props.clip_name
            };

            console.log(payload)
            axiosInstance.post(Endpoints.twitch.postClipTwitter(), payload)
                .then(() => {
                    setIsLoading(false)
                    setConcluded(true)
                }).catch(error => {
                    console.log(error)
                    setConcludedWithError(true)
                    setIsLoading(false)
                })
        }
    }, sendClip)

    useEffect(() => {
        axiosInstance.get(Endpoints.twitter.getBots())
            .then(res => {
                setTwitterBot(res.data)
            }
            )
    }, [])

    const lis = twitterBot.map(item => {
        return (
            <option value={item.twitter_handle}>{item.twitter_handle}</option>
        )
    })

    lis.unshift(<option value="">Escolha uma conta</option>)

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
                        <Form.Label>Twittar</Form.Label>
                        <Form.Control required={true} type="text" placeholder="Entre com o twitte" onChange={titleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={handleChange} as="select" aria-label="Default select example">
                            {lis}
                        </Form.Control>
                    </Form.Group>
                    <p></p>
                    <Button variant="primary" onClick={() => setsendClip(true)} disabled={isLoading == true ? true : false}>
                        {isLoading == true ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Postar'}
                        <span className="visually-hidden">Carregando...</span>
                    </Button>{' '}
                    <p></p>
                    <Alert show={concluded} variant="success">
                        Vídeo postado com sucesso!
                    </Alert>
                    <Alert show={concludedWithError} variant="danger">
                        Erro ao postar o vídeo!
                    </Alert>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}
