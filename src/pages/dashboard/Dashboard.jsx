import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import CustomCard from "../../components/customCard";
import "./dashboard.css"
import CustomCardTwitterFollow from "../../components/customCardTwitterFollow";
import CustomCardInstagramFollow from "../../components/customCardInstagramFollow";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function Dashboard() {
    return (
        <div className='dashPage'>
            
            
        </div>);
};



