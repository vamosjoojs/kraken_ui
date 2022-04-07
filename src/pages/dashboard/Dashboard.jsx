import React, { useEffect, useState } from "react";
import { Container, Accordion, Table, Card } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import CustomCard from "../../components/customCard";
import "./dashboard.css"


export default function Dashboard() {
    const [twitterBots, setTwitterBots] = useState([]);

    useEffect(() => {
        axiosInstance.get(Endpoints.twitter.getBots())
            .then(res => {
                setTwitterBots(res.data)
            })
    }, [])

    // const lis = twitterBots.map(item => {
    //     return (
    //         )
    // })




    return (
        <div className='dashPage'>
            <Container className='containerUpPage'>
                <CustomCard
                    title="Bot de envio de mensagens"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-twitter blue fa-2x"
                >
                </CustomCard>
                {/* <CustomCard
                    title="Bot follow/unfollow"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-twitter blue fa-2x"
                >
                </CustomCard>
                <CustomCard
                    title="Bot de envio de mensagens"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-instagram blue fa-2x"
                >
                </CustomCard>
                <CustomCard
                    title="Bot follow/unfollow"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-instagram blue fa-2x"
                >
                </CustomCard> */}
            </Container>
        </div>);
};



