import React, { useEffect, useState } from "react";
import { Modal, Button, Offcanvas } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import YoutubeClips from "../pages/youtubeClips/YoutubeClips";
import "./modalPlayer.css"
import VideoPlayer from "./videoPlayer";


export default function YoutubeClipsModal(props) {

    return (
        <Offcanvas {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Clipes</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <YoutubeClips videoId={props.videoId}></YoutubeClips>
            </Offcanvas.Body>
        </Offcanvas>

    )
}
