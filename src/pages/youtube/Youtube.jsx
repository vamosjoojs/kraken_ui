import React, { useEffect, useState } from "react";
import { Button, Container, Card, Tooltip, Badge, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import CustomModalEdit from "../../components/modalEditPlayer";
import YoutubeClipsModal from "../../components/youtubeClipsModal";
import "./youtube.css"

function CreateClips(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button className={props.classname} onClick={() => setModalShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <CustomModalEdit
                show={modalShow}
                onHide={() => setModalShow(false)}
                url={props.url}
                videoId={props.videoId}
                head={props.name}
            />
        </>
    );
}

function Clips(props) {
    const [show, setShow] = React.useState(false);
    return (
        <>
            <Button className={props.classname} onClick={() => setShow(true)}>
                <i className={props.simbol}></i> {props.modalName}
            </Button>
            <YoutubeClipsModal
                show={show}
                onHide={() => setShow(false)}
                url={props.url}
                videoId={props.videoId}
                head={props.name}
            />
        </>
    );
}

export default function Youtube() {
    const [twitchClips, setTwitchClips] = useState([]);
    const [cursor, setCursor] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axiosInstance.get(Endpoints.youtube.getVideos(cursor))
            .then(res => {
                setTwitchClips(res.data)
                setIsLoading(false)
            })
    }, [cursor])

    const lis = twitchClips.youtube_response?.map(item => {
        console.log(item)
        return (
            <Card style={{ width: '18rem', padding: '5px', margin: '5px', backgroundColor: '#212529', color: 'white' }}>
                <Card.Img variant="top" src={item.thumbnail_url} />
                <Card.Body>
                    <Card.Title style={{ fontSize: '15px' }}>{item.title}</Card.Title>
                    <div className="youtButtons">
                        <CreateClips simbol={"fa-solid fa-scissors"} url={item.url} videoId={item.video_id} modalName="Criar clip" name={item.title} />
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
-                <Button variant="dark" className="buttons" onClick={() => changePage("", true)}>Primeira Página</Button>
-                <Button variant="dark" className="buttons" onClick={() => changePage(twitchClips.cursor, true)}>Próxima Página</Button>
-            </Container>
            <Container className='containerUpPage' style={style}>
                {isLoading === true ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : lis}
            </Container>

        </div>);
};



