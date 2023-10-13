import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PostModal from "./formPost";



export default function CreatePostInstagram(props) {
    const [modalShow, setModalShow] = React.useState(false);
    let isPostedInstagram = false

    for (var idx in props.isPosted) {
        if (props.isPosted[idx].kraken_hand == 'INSTAGRAM') {
            isPostedInstagram = props.isPosted[idx].is_posted
        }
    }

    const style = {
        background: '#C13584',
        border: '0px',
        margin: '3px'
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Clip já postado no Instagram
        </Tooltip>
    );


    return (
        <>
            {isPostedInstagram === true ? <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <span className="d-inline-block">
                    <Button disabled={isPostedInstagram} style={style} onClick={() => setModalShow(true)}>
                        <i className={props.simbol}></i> {props.modalName}
                    </Button>
                </span>
            </OverlayTrigger> : <Button disabled={isPostedInstagram} style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>}
            <PostModal
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                url={props.url}
                clip_name={props.clip_name}
                clip_id={props.clip_id}
                kraken_head={props.kraken_head}
            />
        </>
    )
}

