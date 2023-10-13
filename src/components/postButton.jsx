import React, { useEffect, useState } from "react";
import { Button, Container, Card, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import PostModal from "./formPost";



export default function PostButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button className={props.classname} onClick={() => setModalShow(true)} disabled={props?.disabled}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <PostModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                url={props.url}
                head={props.name}
                isPosted={props.isPosted}
                kraken_hand={props.kraken_hand}
                kraken_head={props.kraken_head}
                clip_id={props.clip_id} 
                clip_name={props.clip_name}
                id={props.id}
            />
        </>
    );
}
