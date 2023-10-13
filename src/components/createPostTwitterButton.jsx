import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PostModalTwitter from "./formPostTwitter";


export default function CreatePostTwitter(props) {
    const [modalShow, setModalShow] = React.useState(false);
    let isPostedTwitter = false

    for (var idx in props.isPosted) {
        if (props.isPosted[idx].kraken_hand == 'TWITTER') {
            isPostedTwitter = props.isPosted[idx].is_posted
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Clip já postado no Twitter
        </Tooltip>
    );

    const style = {
        background: '#1DA1F2',
        border: '0px',
        margin: '3px'
    };

    return (
        <>
            {isPostedTwitter === true ? <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <span className="d-inline-block">
                    <Button disabled={isPostedTwitter} style={style} onClick={() => setModalShow(true)}>
                        <i className={props.simbol}></i> {props.modalName}
                    </Button>
                </span>
            </OverlayTrigger> : <Button disabled={isPostedTwitter} style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>}
            <PostModalTwitter
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                url={props.url}
                id={props?.id}
                twitterHandle={props.twitterHandle}
                clip_name={props.clip_name}
                clip_id={props.clip_id}
                kraken_head={props.kraken_head}
            />
        </>
    )
}