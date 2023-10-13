import React, { useEffect, useState } from "react";
import { Button, Container, Card, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import { CustomPagination } from "../../components/customPagination/customPagination";
import CustomModal from "../../components/modalPlayer";
import PostButton from "../../components/postButton";
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

export default function Twitch() {
    const [twitchClips, setTwitchClips] = useState([]);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axiosInstance.get(Endpoints.twitch.getClips(pageNumber))
            .then(res => {
                setTwitchClips(res.data)
                setIsLoading(false)
            })
    }, [pageNumber])

    const lis = twitchClips.items?.map(item => {
        return (
            <Card style={{ width: '18rem', padding: '5px', margin: '5px', backgroundColor: '#212529', color: 'white' }}>
                <Card.Img variant="top" src={item.thumbnail_url || item.url} />
                <Card.Body>
                    <Card.Title style={{ fontSize: '15px' }}>{item.title}</Card.Title>
                    <div className="youtButtons">
                        <PostButton simbol={"fa-solid fa-share"} modalName="Postar" name={item.title} isPosted={item.kraken_posted} kraken_hand={item.kraken_hand} kraken_head={'TWITCH'} url={item.url} clip_id={item.clip_id} clip_name={item.title} id={item.id}></PostButton>
                        <SetModalPlayer simbol={"fa-solid fa-play"} url={item.url.split("-preview", 1)[0] + ".mp4"} modalName="Assistir" name={item.title} />
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

    const pageChange = event => {
        setPageNumber(event.target.text);
    }

    return (
        <div className='dashPage'>
            <Container className='containerUpPage' style={style}>
                {isLoading === true ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : lis}
            </Container>
            <Container className='containerUpPage' style={style}>
                <CustomPagination currentPage={twitchClips.current_page} totalItems={twitchClips.total_items} totalPages={twitchClips.total_pages} onChange={pageChange}></CustomPagination>
            </Container>

        </div>);
};



