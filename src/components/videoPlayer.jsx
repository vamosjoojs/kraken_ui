import React, { useState } from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./videoPlayer.css"

import YouTube from 'react-youtube';
import { useEffect } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Endpoints } from '../api/endpoints';
import { axiosInstance } from '../api';

export default function VideoPlayer(props) {
    const [duration, setDuration] = useState(null)
    const [player, setPlayer] = useState()
    const [createClip, setCreateClip] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isConcluded, setIsConcluded] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [caption, setCaption] = useState();
    const [toOld, setToOld] = useState(0)
    const [fromOld, setFromOld] = useState(0)

    const [curTime, setCurTime] = useState(0)


    const onUpdate = (values, handle) => {
        var readValue = values[handle] | 0
        if (handle === 1) {
            if (toOld !== readValue) {
                setToOld(readValue)
            }
        } else {
            if (fromOld !== readValue) {
                setFromOld(readValue)
                player.seekTo(readValue, true)
                player.pauseVideo()
                player.playVideo()
            }
        }
    }

    const onPlayerReady = (event) => {
        setPlayer(event.target)
    }

    useEffect(() => {
        if (player !== undefined) {
            setDuration(player.getDuration())
            setToOld(player.getDuration())
            curTimeClock()
        }
    }, [player])

    useEffect(() => {
        if (player !== undefined) {
            setDuration(player.getDuration())
        }
    })

    useEffect(() => {
        var curTime = player?.getCurrentTime()
        if (player !== undefined) {
            if (curTime < fromOld) {
                player.seekTo(fromOld, true)
            }

            if (curTime > toOld) {
                player.seekTo(toOld, true)
                player.pauseVideo()
            }

            if (curTime < toOld) {
                player.playVideo()
            }
        }
    })

    function curTimeClock() {
        setCurTime(player.getCurrentTime())
        setTimeout(() => {
            curTimeClock()
        }, 100)
    }

    function correctTime() {
        const value = toOld - fromOld
        if (isLoading) {
            return true
        }
        if (value >= 31) {
            return true
        }
        else {
            return false
        }
    }


    const opts = {
        height: '720',
        width: '1280',

        playerVars: {
            start: 0,
            autoplay: 0,
            controls: 0
        },
    }

    function toHHMMSS(val) {
        var sec_num = parseInt(val, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        if (hours == "00") {
            var time = minutes + ':' + seconds;
        }
        else {
            var time = hours + ':' + minutes + ':' + seconds;
        }

        return time;
    }


    useEffect(() => {
        if (createClip === true) {
            setIsLoading(true)
            const payload = {
                'youtube_id': props.videoId,
                'caption': caption,
                'video_url': props.url,
                'start': fromOld,
                'end': toOld
            }

            axiosInstance.post(Endpoints.youtube.cutVideo(), payload)
                .then(res => {
                    setIsLoading(false)
                    setIsConcluded(true)
                })
        }

    }, [createClip])

    const titleChange = event => {
        setCaption(event.target.value);
    }

    return (
        <div>
            <YouTube videoId={props.videoId} opts={opts} onReady={onPlayerReady} />
            <p></p>
            {duration !== null ?
                <Nouislider
                    range={{ min: 0, max: duration }}
                    animate={true}
                    start={[0, duration]}
                    connect={true}
                    onUpdate={onUpdate}
                    behaviour='tap-drag'
                    step={1}
                    margin={3}
                    disabled={isLoading} /> :
                <></>}
            <p></p>

            <div className='media-buttons'>
                <Button onClick={() => { player.seekTo(fromOld, true) }} variant='success'> <i className='fa-solid fa-refresh'></i></Button>
                <Button disabled={correctTime()} onClick={() => setModalShow(true)}><i className='fa-solid fa-scissors'></i> Criar clipe</Button>
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome do clipe</Form.Label>
                                <Form.Control required={true} type="text" onChange={titleChange} />
                            </Form.Group>
                            <Button onClick={() => { setCreateClip(true) }}>
                                {isLoading == true ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Clipar"}
                                <span className="visually-hidden">Carregando...</span>
                                {' '}<i className='fa-solid fa-scissors'></i></Button>{' '}
                            <p></p>
                            <Alert show={isConcluded} variant="success">
                                O clipe está sendo processado e ficará disponível na área de clipes!
                            </Alert>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
                <Button variant='dark' disabled={true}>Inicio: {toHHMMSS(fromOld)}</Button>
                <Button variant='dark' disabled={true}>Fim: {toHHMMSS(toOld)}</Button>
                <Button variant='dark' disabled={true}>Tamanho do clipe: {toHHMMSS(toOld - fromOld)}</Button>
            </div>
            <p></p>
        </div>
    )
}