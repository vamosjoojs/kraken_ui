import React, { useEffect, useState } from "react";
import { Button, Container, Card, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import PostModal from "./formPost";
import RepostModal from "./formRepost";



export default function RepostButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [clipData, setClipData] = useState()

    useEffect(() => {
        if (modalShow === true) {
            axiosInstance.get(Endpoints.kraken.getClipData(props.id))
                .then(res => {
                    setClipData(res.data)
                })
        }
    }, [modalShow])

    return (
        <>
            <Button className={props.classname} onClick={() => setModalShow(true)} disabled={props?.disabled}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <RepostModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                kraken_hand={props.krakenHand}
                id={props?.id}
                clipData={clipData}
            />
        </>
    );
}
