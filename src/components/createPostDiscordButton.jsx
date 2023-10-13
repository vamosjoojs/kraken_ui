import React from "react";
import { Button } from "react-bootstrap";
import PostModal from "./formPost";

export default function CreatePostDiscord(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const style = {
        background: '#7289da',
        border: '0px',
        margin: '3px'
    };

    return (
        <>
            <Button disabled style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <PostModal
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                thumbnail={props.thumbnail}
            />
        </>
    )
}
