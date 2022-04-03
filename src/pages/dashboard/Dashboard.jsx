import React, { useEffect, useState } from "react";
import { Container, Accordion, Table, Card } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import "./dashboard.css"


export default function Dashboard() {
    const [twitterBots, setTwitterBots] = useState([]);

    useEffect(() => {
        axiosInstance.get(Endpoints.twitter.getBots())
            .then(res => {
                setTwitterBots(res.data)
            })
    }, [])

    const lis = twitterBots.map(item => {
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{item.twitter_handle}</Accordion.Header>
                    <Accordion.Body>
                        <Table hover className="table">
                            <thead>
                                <tr className='tr'>
                                    <th>Tag</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='td1'>{item.tag}</td>
                                    <td className='td1'>{item.message}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>)
    })




    return (
        <div className='dashPage'>
            <Container className='containerUpPage'>
                {lis}
            </Container>
        </div>);
};



