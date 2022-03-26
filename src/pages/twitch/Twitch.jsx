import React, { useEffect, useState } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import PostModal from "../../components/formPost";
import CustomModal from "../../components/modalPlayer";
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

    const style = {
        background: '#C13584',
        border: '0px',
        margin: '3px'
    };

    return (
        <>
            <Button style={style} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
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
            <PostModal
                show={modalShow}
                head={props.head}
                onHide={() => setModalShow(false)}
                thumbnail={props.thumbnail}
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
            <Button style={style} onClick={() => setModalShow(true)}>
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

    useEffect(() => {
        axiosInstance.get(Endpoints.twitch.getClips(cursor))
            .then(res => {
                setTwitchClips(res.data)
            })
    }, [cursor])

    const lis = twitchClips.twitch_response?.map(item => {
        return (
            <Card style={{ width: '18rem', padding: '5px', margin: '10px' }}>
                <Card.Img variant="top" src={item.thumbnail_url} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.creator_name}
                    </Card.Text>

                    <SetModalPlayer simbol={"fa-solid fa-play"} url={item.thumbnail_url.split("-preview", 1)[0] + ".mp4"} modalName="Assistir" name={item.title} />
                    <p></p>
                    <div className="socialMedia">
                        <CreatePostInstagram simbol={"fa-brands fa-instagram"} thumbnail={item.thumbnail_url} clip_id={item.clip_id} clip_name={item.title} head={item.title}></CreatePostInstagram>
                        <CreatePostTwitter simbol={"fa-brands fa-twitter"} thumbnail={item.thumbnail_url} head={item.title}></CreatePostTwitter>
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
    

    return (
        <div className='dashPage'>
            <Container className='containerUpPage'>
                <Card style={style}>
                    {lis}
                    <Button className="buttons" onClick={() => setCursor(twitchClips.cursor)}>Próxima Página</Button>
                    <Button className="buttons" onClick={() => setCursor("")}>Primeira Página</Button>
                </Card>
            </Container>
        </div>);
};



