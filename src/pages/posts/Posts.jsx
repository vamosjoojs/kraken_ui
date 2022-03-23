import React, { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import { dateAdjust } from "../../utils/transformers";


export default function Posts() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        axiosInstance.get(Endpoints.twitch.getQueue())
            .then(res => {
                setQueue(res.data)
            })
    }, [])

    const lis = queue.map(item => {
        {
            return (
                <tr>
                    <td className='td1'>{dateAdjust(item.created_at)}</td>
                    <td className='td1'>{item.post_status}</td>
                    <td className='td1'>{item.kraken_hand}</td>
                </tr>
            )
        }
    })

    return (
        <div className='dashPage'>
            <Container className='containerUpPage'>
                <Card>
                    <Table striped bordered hover className="table">
                        <thead>
                            <tr className='tr'>
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
            </Container>
        </div>);
};



