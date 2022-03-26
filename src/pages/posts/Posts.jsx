import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import { dateAdjust, krakenHand, PostStatus } from "../../utils/transformers";
import "./Post.css"

export default function Posts() {
    const [queue, setQueue] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);

    useEffect(() => {
        axiosInstance.get(Endpoints.kraken.getQueue())
            .then(res => {
                setQueue(res.data)
                setUpdateTable(false)
            })
    }, [updateTable])

    const lis = queue.map(item => {
        {
            return (
                <tr>
                    <td className='td1'>{item.name}</td>
                    <td className='td1'>{dateAdjust(item.created_at)}</td>
                    <td className='td1'>{PostStatus(item.post_status)}</td>
                    <td className='td1'>{krakenHand(item.kraken_hand)}</td>
                </tr>
            )
        }
    })

    return (
        <Container className='postPage'>
            <Card className="cardPost">
                <Button onClick={() => setUpdateTable(true)}> <i className="fa-solid fa-arrows-rotate"></i></Button>

                <Table striped bordered hover className="table">
                    <thead>
                        <tr className='tr'>
                            <th>Clip Nome</th>
                            <th>Data de criação</th>
                            <th>Status da postagem</th>
                            <th>Local de postagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lis}
                    </tbody>
                </Table>
            </Card>
        </Container>);
};



