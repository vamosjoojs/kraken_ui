import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import { CustomPagination } from "../../components/customPagination/customPagination";
import CustomModal from "../../components/modalPlayer";
import PostButton from "../../components/postButton";
import "./youtubeClips.css"
import loadingImage from "../../assets/load.gif";



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

export default function YoutubeClips() {
    const [youtubeClips, setYoutubeClips] = useState([]);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axiosInstance.get(Endpoints.youtube.getAllClips(pageNumber))
            .then(res => {
                setYoutubeClips(res.data)
                setIsLoading(false)
            })
    }, [pageNumber])

    const lis = youtubeClips.items?.map(item => {
        return (
            <Card style={{ width: '18rem', padding: '5px', margin: '5px', backgroundColor: '#212529', color: 'white' }}>
                <Card.Img variant="top" src={(item.thumbnail_url === 'loading')? loadingImage: item.thumbnail_url} />
                <Card.Body>
                    <Card.Title style={{ fontSize: '15px' }}>{item.title}</Card.Title>
                    <div className="youtButtons">
                        <PostButton simbol={"fa-solid fa-share"} modalName="Postar" name={item.title} isPosted={item.kraken_posted} kraken_hand={item.kraken_hand} kraken_head={'YOUTUBE'} url={item.url} clip_id={item.clip_id} clip_name={item.title} id={item.id}></PostButton>
                        <SetModalPlayer simbol={"fa-solid fa-play"} url={item.url} modalName="Assistir" name={item.title} />
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
                <CustomPagination currentPage={youtubeClips.current_page} totalItems={youtubeClips.total_items} totalPages={youtubeClips.total_pages} onChange={pageChange}></CustomPagination>
            </Container>
        </div>);
};



