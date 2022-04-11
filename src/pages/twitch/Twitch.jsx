import React, { useEffect, useState } from "react";
import { Button, Container, Card, Tooltip, OverlayTrigger, Spinner, Form } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import PostModal from "../../components/formPost";
import PostModalTwitter from "../../components/formPostTwitter";
import CustomModal from "../../components/modalPlayer";
import { krakenHand } from "../../utils/transformers";
import "./twitch.css"

function SetModalPlayer(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button className={props.classname} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                url={props.url}
                head={props.name}
            />
        </>
    );
}

function CreatePostInstagram(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [isPostedInstagram, setIsPostedInstagram] = React.useState(props.is_posted)
    const [isPostedTwitter, setIsPostedTwitter] = React.useState(props.is_posted)
    const [isPostedDiscord, setIsPostedDiscord] = React.useState(props.is_posted)

    const style = {
        background: '#C13584',
        border: '0px',
        margin: '3px'
    };

    const kraken_hand = props.kraken_hand

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Clip já postado no {krakenHand(kraken_hand)}
        </Tooltip>
    );


    return (
        <>
            {isPosted === true ? <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <span className="d-inline-block">
                    <Button disabled={isPosted} style={style} onClick={() => setModalShow(true)}>
                        <i className={props.simbol}></i> {props.modalName}
                    </Button>
                </span>
            </OverlayTrigger> : <Button disabled={isPosted} style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>}
            <PostModal
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                thumbnail={props.thumbnail}
                clip_name={props.clip_name}
                clip_id={props.clip_id}
            />
        </>
    )
}


function CreatePostTwitter(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const style = {
        background: '#1DA1F2',
        border: '0px',
        margin: '3px'
    };

    return (
        <>
            <Button style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <PostModalTwitter
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                thumbnail={props.thumbnail}
                twitterHandle={props.twitterHandle}
                clip_name={props.clip_name}
                clip_id={props.clip_id}
            />
        </>
    )
}


function CreatePostDiscord(props) {
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

export default function Twitch() {
    const [twitchClips, setTwitchClips] = useState([]);
    const [cursor, setCursor] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axiosInstance.get(Endpoints.twitch.getClips(cursor))
            .then(res => {
                setTwitchClips(res.data)
                setIsLoading(false)
            })
    }, [cursor])

    const lis = twitchClips.twitch_response?.map(item => {
        return (
            <Card style={{ width: '18rem', padding: '5px', margin: '10px', backgroundColor: '#212529', color: 'white' }}>
                <Card.Img variant="top" src={item.thumbnail_url} />
                <Card.Body>
                    <Card.Title style={{ fontSize: '15px' }}>{item.title}</Card.Title>
                    <Card.Text style={{ fontSize: '10px' }}>
                        {item.creator_name}
                    </Card.Text>
                    <SetModalPlayer simbol={"fa-solid fa-play"} url={item.thumbnail_url.split("-preview", 1)[0] + ".mp4"} modalName="Assistir" name={item.title} />
                    <p></p>
                    <div className="socialMedia">
                        <div style={{ marginRight: "5px" }}>Postar em:</div>
                        <CreatePostInstagram is_posted={item.kraken_posted} kraken_hand={item.kraken_hand} simbol={"fa-brands fa-instagram"} thumbnail={item.thumbnail_url} clip_id={item.clip_id} clip_name={item.title} head={item.title}></CreatePostInstagram>
                        <CreatePostTwitter simbol={"fa-brands fa-twitter"} thumbnail={item.thumbnail_url} head={item.title} kraken_hand={item.kraken_hand} clip_id={item.clip_id} clip_name={item.title}></CreatePostTwitter>
                        <CreatePostDiscord simbol={"fa-brands fa-discord"} thumbnail={item.thumbnail_url} head={item.title}></CreatePostDiscord>
                    </div>
                </Card.Body>
            </Card>)
    })

    const style = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }

    function changePage(cursor, isLoading) {
        setIsLoading(isLoading)
        setCursor(cursor)
    }


    return (
        <div className='dashPage'>
            <Container className="headTwitch">
                <Button variant="dark" className="buttons" onClick={() => changePage(twitchClips.cursor, true)}>Próxima Página</Button>
                <Button variant="dark" className="buttons" onClick={() => changePage("", true)}>Primeira Página</Button>
            </Container>
            <Container className='containerUpPage' style={style}>
                {isLoading === true ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : lis}
            </Container>

        </div>);
};



