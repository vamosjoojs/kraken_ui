import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./modalPlayer.css"
import VideoPlayer from "./videoPlayer";


export default function CustomModalEdit(props) {
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.head}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <VideoPlayer url={props.url} videoId={props.videoId}></VideoPlayer>
            </Modal.Body>
        </Modal>
    )
}
