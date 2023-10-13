import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import CustomCard from "../../components/customCard";
import "./bots.css"
import CustomCardTwitterFollow from "../../components/customCardTwitterFollow";
import CustomCardInstagramFollow from "../../components/customCardInstagramFollow";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function Bots() {
    return (
        <div className='dashPage'>
            <Container className='containerUpPage'>
                <CustomCard
                    title="Bot de envio de mensagens"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-twitter blue fa-2x"
                >
                </CustomCard>
                <CustomCardTwitterFollow
                    title="Bot follow/unfollow"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-twitter blue fa-2x"
                >
                </CustomCardTwitterFollow>
                <CustomCardInstagramFollow
                    title="Bot follow/unfollow"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-instagram blue fa-2x"
                >
                </CustomCardInstagramFollow>
               {/*  <CustomCard
                    title="Bot follow/unfollow"
                    //children={item.twitter_handle}
                    icon="fa-brands fa-instagram blue fa-2x"
                >
                </CustomCard> */}
            </Container>
        </div>);
};



